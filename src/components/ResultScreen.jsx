import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Download, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon, 
  Loader2,
  Award,
  Sparkles,
  Edit3,
  UserCheck
} from 'lucide-react';
import Certificate from './Certificate';
import { downloadCertificatePDF, downloadCertificateImage } from '../utils/generatePdf';
import { sounds } from '../utils/audio';

export default function ResultScreen({ 
  result, 
  user, 
  onRetryQuiz, 
  onGoHome,
  onEditProfile
}) {
  const { score = 0, total = 10, category, userAnswers = [], duration = '00:00' } = result || {};
  const isPassed = score >= 8;
  const percentage = Math.round((score / total) * 100);

  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPNG, setIsExportingPNG] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [certCode] = useState(() => {
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    return `NTS-SP-${new Date().getFullYear()}-${randomHex}`;
  });

  // Confetti when >= 8
  useEffect(() => {
    if (isPassed) {
      sounds.playWin();
      
      const durationMs = 2.5 * 1000;
      const animationEnd = Date.now() + durationMs;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / durationMs);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isPassed]);

  const handleDownloadPDF = async () => {
    try {
      setIsExportingPDF(true);
      sounds.playSelect();
      await downloadCertificatePDF('certificate-print-area', user?.fullName || 'ThiSinh', certCode);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Không thể tạo file PDF. Vui lòng thử lại!');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleDownloadPNG = async () => {
    try {
      setIsExportingPNG(true);
      sounds.playSelect();
      await downloadCertificateImage('certificate-print-area', user?.fullName || 'ThiSinh', certCode);
    } catch (err) {
      console.error('PNG error:', err);
      alert('Không thể tạo ảnh. Vui lòng thử lại!');
    } finally {
      setIsExportingPNG(false);
    }
  };

  return (
    <div className="quiz px-3 py-6 sm:px-6 sm:py-10" style={{ minHeight: 'calc(100vh - 68px)' }}>
      
      {/* Decorative Geometric Shapes */}
      <span className="quiz-shape quiz-shape-ring" aria-hidden="true"></span>
      <span className="quiz-shape quiz-shape-block" aria-hidden="true"></span>
      <span className="quiz-shape quiz-shape-dots" aria-hidden="true"></span>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        
        {/* ================= SECTION 1: HEADER & STATUS ================= */}
        <div>
          <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-wider" style={{ color: isPassed ? '#17c990' : '#ffe1dc' }}>
            {isPassed ? '★ CHÚC MỪNG HOÀN THÀNH XUẤT SẮC' : 'KẾT QUẢ BÀI THI'} • THỜI GIAN: {duration}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight my-3 text-white">
            Bạn có <span className="red-highlight">{isPassed ? 'an toàn!' : 'dễ bị lừa?'}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
            Thí sinh: <strong className="text-white font-bold">{user?.fullName || "Thí sinh"}</strong>
            <span className="mx-2 text-slate-500">•</span>
            Đơn vị: <strong className="text-amber-400 font-bold">{user?.unit || "Song Phú"}</strong>
          </p>

          {/* Metric Badges Card (Mobile-friendly flex/grid) */}
          <div className="mt-5 inline-grid grid-cols-3 gap-2 sm:gap-6 bg-slate-900/80 border border-slate-700/80 rounded-2xl sm:rounded-full px-4 py-3 sm:px-8 sm:py-3 shadow-xl backdrop-blur-md max-w-md sm:max-w-xl mx-auto w-full">
            <div className="text-center">
              <span className="block text-[10px] sm:text-xs text-slate-400 uppercase font-bold">
                Điểm số
              </span>
              <strong className="text-xl sm:text-2xl font-black" style={{ color: isPassed ? '#17c990' : '#f53c32' }}>
                {score}/{total}
              </strong>
            </div>

            <div className="text-center border-x border-slate-700/80">
              <span className="block text-[10px] sm:text-xs text-slate-400 uppercase font-bold">
                Tỷ lệ
              </span>
              <strong className="text-xl sm:text-2xl font-black text-amber-400">
                {percentage}%
              </strong>
            </div>

            <div className="text-center">
              <span className="block text-[10px] sm:text-xs text-slate-400 uppercase font-bold">
                Trạng thái
              </span>
              <strong className="text-xs sm:text-sm font-extrabold truncate block mt-1" style={{ color: isPassed ? '#17c990' : '#ffe1dc' }}>
                {isPassed ? 'ĐẠT CHUẨN' : 'CHƯA ĐẠT'}
              </strong>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: PROMINENT ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg sm:max-w-none mx-auto w-full">
          {isPassed ? (
            <>
              {/* PDF Download Button (Primary Gold) */}
              <button
                type="button"
                disabled={isExportingPDF}
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto min-h-[50px] sm:min-h-[54px] px-6 py-3 text-sm sm:text-base font-black rounded-xl cursor-pointer flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/30 transition hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#081832',
                  border: 0
                }}
              >
                {isExportingPDF ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5 text-slate-950" />}
                <span>TẢI FILE PDF CHỨNG NHẬN (A4)</span>
              </button>

              {/* PNG Download Button (White) */}
              <button
                type="button"
                disabled={isExportingPNG}
                onClick={handleDownloadPNG}
                className="w-full sm:w-auto min-h-[50px] sm:min-h-[54px] px-5 py-3 text-sm font-bold bg-white text-slate-900 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md transition hover:bg-slate-100 active:scale-95"
                style={{ border: 0 }}
              >
                {isExportingPNG ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5 text-indigo-600" />}
                <span>TẢI ẢNH (PNG)</span>
              </button>

              {/* Edit Name Button on Certificate */}
              <button
                type="button"
                onClick={onEditProfile}
                className="w-full sm:w-auto min-h-[50px] sm:min-h-[54px] px-5 py-3 text-sm font-bold bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-200 border border-indigo-500/40 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition active:scale-95 shadow-md"
                title="Bấm để chỉnh sửa Họ tên và Đơn vị in trên giấy chứng nhận"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Đổi tên in chứng nhận</span>
              </button>

              {/* Retry Button */}
              <button
                type="button"
                onClick={() => {
                  sounds.playSelect();
                  onRetryQuiz();
                }}
                className="w-full sm:w-auto min-h-[50px] sm:min-h-[54px] px-5 py-3 text-sm font-bold bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-slate-300" />
                <span>Thi lại đề khác</span>
              </button>
            </>
          ) : (
            <>
              {/* Retry Button (When < 8) */}
              <button
                type="button"
                onClick={() => {
                  sounds.playSelect();
                  onRetryQuiz();
                }}
                className="w-full sm:w-auto min-h-[52px] px-8 py-3 text-base font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition active:scale-95"
                style={{ border: 0 }}
              >
                <RotateCcw className="w-5 h-5" />
                <span>THI LẠI NGAY (ĐỀ MỚI 10 CÂU)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playSelect();
                  onGoHome();
                }}
                className="w-full sm:w-auto min-h-[52px] px-6 py-3 text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl cursor-pointer flex items-center justify-center"
              >
                <span>Về trang chủ</span>
              </button>
            </>
          )}
        </div>

        {/* ================= SECTION 3: FULL CERTIFICATE PREVIEW (RESPONSIVE AUTO-SCALE) ================= */}
        {isPassed && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl backdrop-blur-md">
            
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase">
                BẢN XEM TRƯỚC GIẤY CHỨNG NHẬN ĐIỆN TỬ
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 mb-3">
              Chứng nhận hoàn thành thử thách từ Chiến dịch không một mình - kết nối không tổn thương
            </p>

            {/* Certificate Component with Auto-Scale (fits 100% on any screen!) */}
            <div className="w-full flex justify-center overflow-hidden">
              <Certificate 
                userName={user?.fullName || "Nguyễn Vinh"}
                userUnit={user?.unit || "Song Phú"}
                categoryTitle={category?.title || "Kỹ năng An toàn số"}
                score={score}
                total={total}
                certCode={certCode}
              />
            </div>
          </div>
        )}

        {/* ================= SECTION 4: REVIEW ANSWERS ACCORDION ================= */}
        <div className="text-left max-w-3xl mx-auto pt-2">
          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              setShowReview(!showReview);
            }}
            className="w-full p-4 sm:p-5 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base font-bold flex items-center justify-between transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Xem lại chi tiết bài làm ({userAnswers.length} câu)</span>
            </span>
            {showReview ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showReview && (
            <div className="mt-3 space-y-3 animate-fade-in">
              {userAnswers.map((ans, idx) => (
                <div 
                  key={idx}
                  className="bg-white text-slate-900 rounded-xl p-4 sm:p-5 shadow-lg border border-slate-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                      Câu {idx + 1}
                    </span>
                    <span className="text-xs font-bold" style={{ color: ans.isCorrect ? '#059669' : '#dc2626' }}>
                      {ans.isCorrect ? '✓ Trả lời Đúng (+1 điểm)' : '✕ Trả lời Sai'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                    {ans.question}
                  </p>

                  {ans.options && (
                    <div className="space-y-1.5 mb-3">
                      {ans.options.map((opt, oIdx) => {
                        const isUserChoice = ans.userAnswer === oIdx;
                        const isCorrectChoice = ans.correctAnswer === oIdx;

                        let border = "1px solid #e2e8f0";
                        let bg = "#f8fafc";
                        let color = "#1e293b";
                        if (isCorrectChoice) {
                          border = "2px solid #10b981";
                          bg = "rgba(16, 185, 129, 0.12)";
                          color = "#047857";
                        } else if (isUserChoice && !isCorrectChoice) {
                          border = "2px solid #ef4444";
                          bg = "rgba(239, 68, 68, 0.1)";
                          color = "#b91c1c";
                        }

                        return (
                          <div 
                            key={oIdx}
                            className="p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm flex justify-between items-center"
                            style={{
                              border,
                              background: bg,
                              color,
                              fontWeight: (isCorrectChoice || isUserChoice) ? 700 : 500
                            }}
                          >
                            <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                            {isCorrectChoice && <span className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase">Đáp án đúng</span>}
                            {isUserChoice && !isCorrectChoice && <span className="text-[10px] sm:text-xs font-black text-rose-600 uppercase">Lựa chọn của bạn</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {ans.explanation && (
                    <div className="bg-slate-100 rounded-lg p-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      <strong className="text-blue-700">Lưu ý an toàn: </strong>
                      {ans.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
