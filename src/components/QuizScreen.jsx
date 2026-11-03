import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle,
  ZoomIn
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function QuizScreen({ 
  category, 
  questions = [], 
  user,
  onFinishQuiz, 
  onExitQuiz 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [previewMedia, setPreviewMedia] = useState(null);

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;
  const progressPercent = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / totalQ) * 100);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnswered) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
        return;
      }

      if (!currentQ) return;

      if (currentQ.kind === 'mc') {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const k = e.key.toLowerCase();
        if (k in keyMap && currentQ.options && currentQ.options[keyMap[k]] !== undefined) {
          handleSelectMCOption(keyMap[k]);
        }
      } else if (currentQ.kind === 'item') {
        if (e.key === '1' || e.key.toLowerCase() === 't') {
          handleSelectItemAnswer(false);
        } else if (e.key === '2' || e.key.toLowerCase() === 'g') {
          handleSelectItemAnswer(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnswered, currentQ]);

  if (!currentQ) {
    return <div className="text-center py-20 text-slate-400">Đang tải câu hỏi...</div>;
  }

  // Answer handler for Multiple Choice
  const handleSelectMCOption = (optIdx) => {
    if (isAnswered) return;
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
      setScore(s => s + 1);
    } else {
      sounds.playIncorrect();
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionIndex: currentIndex,
        question: currentQ.question,
        options: currentQ.options,
        userAnswer: optIdx,
        correctAnswer: currentQ.correctIndex,
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);
  };

  // Answer handler for Item (Real / Fake)
  const handleSelectItemAnswer = (userSaidFake) => {
    if (isAnswered) return;
    setSelectedOption(userSaidFake);
    setIsAnswered(true);

    let actualIsFake = false;
    let exp = "Hãy chú ý các dấu hiệu bất thường trên hình ảnh hoặc tin nhắn lừa đảo.";
    if (currentQ.itemsDetail && currentQ.itemsDetail.length > 0) {
      actualIsFake = !!currentQ.itemsDetail[0].isFake;
      exp = currentQ.itemsDetail[0].explanation || exp;
    }

    const isCorrect = userSaidFake === actualIsFake;
    if (isCorrect) {
      sounds.playCorrect();
      setScore(s => s + 1);
    } else {
      sounds.playIncorrect();
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionIndex: currentIndex,
        question: currentQ.question || "Nhận diện nội dung Thật hay Giả mạo / Lừa đảo",
        media: currentQ.items?.[0],
        userAnswer: userSaidFake ? 'Giả mạo' : 'Thật / An toàn',
        correctAnswer: actualIsFake ? 'Giả mạo' : 'Thật / An toàn',
        isCorrect,
        explanation: exp
      }
    ]);
  };

  const handleNext = () => {
    sounds.playSelect();
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFinishQuiz({
        score: score,
        total: totalQ,
        userAnswers,
        category,
        duration: formatTimer(seconds)
      });
    }
  };

  const isCurrentCorrect = currentQ.kind === 'mc'
    ? selectedOption === currentQ.correctIndex
    : selectedOption === !!currentQ.itemsDetail?.[0]?.isFake;

  const currentExplanation = currentQ.kind === 'mc'
    ? currentQ.explanation
    : (currentQ.itemsDetail?.[0]?.explanation || "Hãy luôn kiểm tra kỹ nguồn gửi và tên miền trước khi thao tác.");

  return (
    <div className="quiz" style={{ minHeight: 'calc(100vh - 68px)', padding: '50px 0' }}>
      
      {/* Background Shapes */}
      <span className="quiz-shape quiz-shape-ring" aria-hidden="true"></span>
      <span className="quiz-shape quiz-shape-block" aria-hidden="true"></span>
      <span className="quiz-shape quiz-shape-dots" aria-hidden="true"></span>

      <div className="shell test-game">
        
        {/* Top Header Controls: Back & Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={() => {
              if (window.confirm("Bạn có chắc muốn dừng bài thi hiện tại và quay về màn hình chính?")) {
                onExitQuiz();
              }
            }}
            className="test-back-button"
            style={{ margin: 0 }}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Thoát</span>
          </button>

          <span style={{ color: '#dbe4f6', fontSize: '13px', fontWeight: 600 }}>
            {category?.title}
          </span>
        </div>

        {/* Top Status Bar: Timer, Question Counter, Score */}
        <div className="test-top">
          
          <div className="test-timer">
            <small>THỜI GIAN</small>
            <strong>{formatTimer(seconds)}</strong>
          </div>

          <div className="test-metrics">
            <div className="test-metric">
              <small>CÂU HỎI</small>
              <strong>{currentIndex + 1}<span>/{totalQ}</span></strong>
            </div>

            <div className="test-metric">
              <small>ĐIỂM SỐ</small>
              <strong style={{ color: '#17c990' }}>
                {score}<span>/{totalQ}</span>
              </strong>
            </div>

            <div className="test-metric">
              <small>THÍ SINH</small>
              <strong style={{ fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                {user?.fullName || "Thí sinh"}
              </strong>
            </div>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="test-progress">
          <i style={{ width: `${progressPercent}%` }}></i>
        </div>

        {/* Question Card: Multiple Choice */}
        {currentQ.kind === 'mc' && currentQ.options && (
          <div className="mc-question-card">
            <h2 className="mc-question">
              {currentQ.question}
            </h2>

            <div className="mc-options">
              {currentQ.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let stateClass = "";
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    stateClass = "correct";
                  } else if (selectedOption === idx) {
                    stateClass = "incorrect";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectMCOption(idx)}
                    className={`mc-option ${stateClass}`}
                  >
                    <span className="mc-option-letter">{letter}</span>
                    <span className="mc-option-text">{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <Check className="w-5 h-5 text-emerald-600 mc-option-icon" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <X className="w-5 h-5 text-rose-600 mc-option-icon" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Media Inspection (Real / Fake) Card */}
        {currentQ.kind === 'item' && currentQ.items && currentQ.items[0] && (
          <div className="test-media" style={{ marginTop: '26px' }}>
            <article>
              {currentQ.items[0].media_type === 'video' ? (
                <video 
                  src={currentQ.items[0].media_url} 
                  controls 
                  playsInline 
                  style={{ maxHeight: '420px', width: '100%', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ position: 'relative', textAlign: 'center' }}>
                  <img 
                    src={currentQ.items[0].media_url} 
                    alt="Tình huống đố vui"
                    style={{ maxHeight: '420px', margin: '0 auto', display: 'block', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => setPreviewMedia(currentQ.items[0].media_url)}
                  />
                  <button
                    onClick={() => setPreviewMedia(currentQ.items[0].media_url)}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      border: '0',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Phóng to</span>
                  </button>
                </div>
              )}

              <div className="test-answer-row">
                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectItemAnswer(false)}
                  className="test-answer button"
                  style={{
                    background: '#17c990',
                    color: '#fff',
                    flex: 1,
                    minHeight: '52px',
                    fontSize: '15px',
                    fontWeight: 800,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Thật / An toàn (Phím 1)</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectItemAnswer(true)}
                  className="test-answer fake button"
                  style={{
                    background: '#e6392f',
                    color: '#fff',
                    flex: 1,
                    minHeight: '52px',
                    fontSize: '15px',
                    fontWeight: 800,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  <span>Giả mạo / Lừa đảo (Phím 2)</span>
                </button>
              </div>
            </article>
          </div>
        )}

      </div>

      {/* Modal / Feedback Backdrop (Matching original niemtinsogialai.vn test-modal) */}
      {isAnswered && (
        <div className="test-modal-backdrop">
          <div className="test-modal" style={{ display: 'flex', flexDirection: 'column', maxWidth: '640px', width: '92%', borderRadius: '18px' }}>
            <div className="test-modal-body" style={{ width: '100%', boxSizing: 'border-box', padding: '36px 32px 30px' }}>
              
              <p 
                className="test-modal-step" 
                style={{ 
                  color: isCurrentCorrect ? '#17c990' : '#e6392f',
                  fontSize: '13px',
                  fontWeight: 800,
                  marginBottom: '10px'
                }}
              >
                {isCurrentCorrect ? '✓ CHÍNH XÁC (+1 ĐIỂM)' : '✕ CHƯA CHÍNH XÁC'}
              </p>

              <h2 style={{ fontSize: '28px', color: 'var(--ink)', fontWeight: 800 }}>
                {isCurrentCorrect ? 'Bạn đã trả lời đúng!' : 'Cảnh báo an toàn!'}
              </h2>

              <div className="test-modal-copy" style={{ marginTop: '20px', width: '100%' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Giải thích từ chuyên gia an toàn số:
                </span>
                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.65, marginTop: '8px' }}>
                  {currentExplanation}
                </p>
              </div>

              <div style={{ marginTop: '28px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="button"
                  style={{
                    background: 'var(--gold)',
                    color: 'var(--navy)',
                    minWidth: '160px',
                    minHeight: '48px',
                    fontWeight: 800,
                    fontSize: '15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 194, 71, 0.4)'
                  }}
                  onClick={handleNext}
                >
                  {currentIndex + 1 < totalQ ? 'Câu tiếp theo →' : 'Xem kết quả thi →'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {previewMedia && (
        <div 
          onClick={() => setPreviewMedia(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(3, 13, 38, 0.9)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <img 
            src={previewMedia} 
            alt="Phóng to" 
            style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', borderRadius: '12px' }} 
          />
        </div>
      )}

    </div>
  );
}
