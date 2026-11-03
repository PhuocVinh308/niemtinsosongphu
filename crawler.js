const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://niemtinsogialai.vn/do-vui'
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 429) {
          return reject(new Error('RATE_LIMITED'));
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

function decryptDetail(detailB64, tokenB64) {
  try {
    const key = Buffer.from(tokenB64, 'base64');
    const buf = Buffer.from(detailB64, 'base64');
    const iv = buf.subarray(0, 12);
    const ciphertextAndTag = buf.subarray(12);
    const tag = ciphertextAndTag.subarray(ciphertextAndTag.length - 16);
    const ciphertext = ciphertextAndTag.subarray(0, ciphertextAndTag.length - 16);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return JSON.parse(dec.toString('utf8'));
  } catch (err) {
    return null;
  }
}

const CATEGORIES = [
  { id: 13, title: "Không một mình: Hiệp sĩ nhí (Học sinh tiểu học)", level: "Dễ", desc: "Bộ câu hỏi về Không một mình: Hiệp sĩ nhí (Học sinh tiểu học)", icon: "🛡️", color: "from-purple-500 to-indigo-600" },
  { id: 14, title: "Không một mình: Vệ binh số (Học sinh THCS)", level: "Dễ", desc: "Bộ câu hỏi về Không một mình: Vệ binh số (Học sinh THCS)", icon: "⚔️", color: "from-sky-500 to-blue-600" },
  { id: 15, title: "Không một mình: Chiến binh mạng (Học sinh THPT)", level: "Trung bình", desc: "Bộ câu hỏi về Không một mình: Chiến binh mạng (Học sinh THPT)", badge: "Phổ biến nhất", icon: "🚀", color: "from-emerald-500 to-teal-700" },
  { id: 16, title: "Không một mình: Thủ lĩnh kết nối (Sau THPT)", level: "Dễ", desc: "Bộ câu hỏi về Không một mình: Thủ lĩnh kết nối (Sau THPT)", icon: "🌐", color: "from-amber-500 to-orange-600" },
  { id: 17, title: "Không một mình: Lá chắn yêu thương (Phụ huynh)", level: "Trung bình", desc: "Bộ câu hỏi về Không một mình: Lá chắn yêu thương (Phụ huynh)", icon: "❤️", color: "from-rose-500 to-pink-600" },
  { id: 18, title: "Không một mình: Người dẫn đường (Giáo viên)", level: "Khó", desc: "Bộ câu hỏi về Không một mình: Người dẫn đường (Giáo viên)", icon: "🎓", color: "from-indigo-600 to-violet-800" },
  { id: 1, title: "Phát hiện thật / giả", level: "Trung bình", desc: "Bộ câu hỏi tình huống thực tế nhận diện tin nhắn, website, hình ảnh lừa đảo", icon: "🔍", color: "from-cyan-600 to-blue-700" }
];

async function main() {
  const outPath = path.join(__dirname, 'quiz_questions.json');
  let allData = {
    categories: CATEGORIES,
    questionsByGroup: {}
  };

  if (fs.existsSync(outPath)) {
    try {
      allData = JSON.parse(fs.readFileSync(outPath, 'utf-8'));
      allData.categories = CATEGORIES;
      if (!allData.questionsByGroup) allData.questionsByGroup = {};
    } catch (e) {}
  }

  for (const cat of CATEGORIES) {
    const existing = allData.questionsByGroup[cat.id] || [];
    if (existing.length >= 30) {
      console.log(`Group ${cat.id} already has ${existing.length} questions. Skipping.`);
      continue;
    }

    console.log(`Fetching group ${cat.id}: ${cat.title}...`);
    const qMap = new Map();
    for (const q of existing) {
      const key = q.id || (q.questionId ? `q-${q.questionId}` : JSON.stringify(q));
      qMap.set(key, q);
    }

    for (let round = 1; round <= 5; round++) {
      let attempts = 0;
      let success = false;
      while (attempts < 3 && !success) {
        attempts++;
        try {
          await sleep(2500);
          const url = `https://niemtinsogialai.vn/api/quiz?language=vi&groupId=${cat.id}`;
          const res = await fetchJson(url);
          if (res && res.challenges && res.token) {
            for (const ch of res.challenges) {
              const dec = decryptDetail(ch.detail, res.token);
              const key = ch.id || (ch.questionId ? `q-${ch.questionId}` : JSON.stringify(ch));
              if (!qMap.has(key)) {
                qMap.set(key, {
                  id: ch.id,
                  kind: ch.kind,
                  difficulty: ch.difficulty,
                  questionId: ch.questionId,
                  question: ch.question,
                  options: ch.options,
                  items: ch.items,
                  correctIndex: dec ? dec.correctIndex : undefined,
                  correctItemId: dec ? dec.correctItemId : undefined,
                  explanation: dec ? dec.explanation : undefined,
                  clueMediaUrl: dec ? dec.clueMediaUrl : undefined,
                  itemsDetail: dec ? dec.items : undefined
                });
              }
            }
            success = true;
          }
        } catch (err) {
          if (err.message === 'RATE_LIMITED') {
            console.log(`Rate limited on group ${cat.id}, waiting 6s...`);
            await sleep(6000);
          } else {
            console.error(`Attempt ${attempts} error:`, err.message);
            await sleep(2000);
          }
        }
      }
    }

    const qList = Array.from(qMap.values());
    console.log(`Group ${cat.id} now has ${qList.length} unique questions.`);
    allData.questionsByGroup[cat.id] = qList;

    // Save progressively
    fs.writeFileSync(outPath, JSON.stringify(allData, null, 2), 'utf-8');
  }

  console.log(`Finished crawling! Saved all quiz questions to ${outPath}`);
}

main().catch(console.error);
