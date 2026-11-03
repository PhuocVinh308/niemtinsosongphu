import React, { useState } from 'react';
import { ArrowRight, Flame, ArrowLeft, Award, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function CategorySelector({ 
  categories = [], 
  questionsByGroup = {}, 
  user, 
  onSaveProfile,
  onStartQuiz 
}) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [unit, setUnit] = useState(user?.unit || '');
  const [error, setError] = useState('');

  const handleCardClick = (cat) => {
    sounds.playSelect();
    // If user already has fullName and unit, directly start!
    if (user?.fullName?.trim() && user?.unit?.trim()) {
      onStartQuiz(cat);
      return;
    }
    // Otherwise open the name box
    setSelectedCat(cat);
    setError('');
  };

  const handleStartForm = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Vui lòng nhập Họ và Tên của bạn để in lên Giấy Chứng Nhận!');
      sounds.playIncorrect();
      return;
    }
    if (!unit.trim()) {
      setError('Vui lòng nhập Đơn vị / Trường học / Cơ quan của bạn!');
      sounds.playIncorrect();
      return;
    }

    sounds.playCorrect();
    onSaveProfile({
      fullName: fullName.trim(),
      unit: unit.trim()
    });
    onStartQuiz(selectedCat);
  };

  return (
    <div className="quiz quiz-start" style={{ minHeight: 'calc(100vh - 68px)', padding: '40px 0 60px' }}>
      
      {/* Decorative Geometric Shapes matching original niemtinsogialai.vn */}
      <span className="quiz-shape quiz-shape-ring" aria-hidden="true"></span>
      <span className="quiz-shape quiz-shape-block" aria-hidden="true"></span>
      <span className="quiz-shape quiz-shape-dots" aria-hidden="true"></span>

      <div className="shell test-start">
        
        {!selectedCat ? (
          <>
            <h1>
              Bạn có <span className="red-highlight">dễ bị lừa?</span>
            </h1>

            <div className="quiz-categories-section">
              <div className="quiz-categories-heading">
                Hãy chọn một thử thách để thử sức mình
              </div>

              {/* 7 Category Cards matching user screenshot */}
              <div className="quiz-categories-grid">
                {categories.map((cat) => {
                  let bgGradient = "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)";
                  let diffClass = "diff-easy";

                  if (cat.id === 13) {
                    bgGradient = "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)";
                    diffClass = "diff-easy";
                  } else if (cat.id === 14) {
                    bgGradient = "linear-gradient(135deg, #bae6fd 0%, #38bdf8 100%)";
                    diffClass = "diff-easy";
                  } else if (cat.id === 15) {
                    bgGradient = "linear-gradient(135deg, #c7d2fe 0%, #818cf8 100%)";
                    diffClass = "diff-medium";
                  } else if (cat.id === 16) {
                    bgGradient = "linear-gradient(135deg, #fef08a 0%, #f59e0b 100%)";
                    diffClass = "diff-easy";
                  } else if (cat.id === 17) {
                    bgGradient = "linear-gradient(135deg, #fecdd3 0%, #fb7185 100%)";
                    diffClass = "diff-medium";
                  } else if (cat.id === 18) {
                    bgGradient = "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)";
                    diffClass = "diff-hard";
                  } else if (cat.id === 1) {
                    bgGradient = "linear-gradient(135deg, #ffde59 0%, #ff9966 50%, #ff5e62 100%)";
                    diffClass = "diff-medium";
                  }

                  const isPopular = cat.id === 15;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      style={{ background: bgGradient }}
                      className={`quiz-category-card cat-group-${cat.id}`}
                      onClick={() => handleCardClick(cat)}
                    >
                      {/* Popular Badge */}
                      {isPopular && (
                        <span className="quiz-category-badge">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                          <span>Phổ biến nhất</span>
                        </span>
                      )}

                      <span className="quiz-category-title">
                        {cat.title}
                      </span>

                      <div className={`quiz-category-difficulty ${diffClass}`}>
                        <span className="quiz-diff-dot" aria-hidden="true"></span>
                        <span>Độ khó: {cat.level}</span>
                      </div>

                      <p className="quiz-category-desc">
                        {cat.desc}
                      </p>

                      <span className="quiz-category-arrow" aria-hidden="true">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Certificate Notice */}
              <div style={{ textAlign: 'center', marginTop: '36px', color: '#cdd9ee', fontSize: '14px' }}>
                ★ Trả lời đúng từ <strong style={{ color: '#ffc247' }}>8/10 câu</strong> trở lên để được cấp 
                <strong style={{ color: '#17c990' }}> Giấy Chứng Nhận An Toàn Số Song Phú (File PDF)</strong> chính thức.
              </div>
            </div>
          </>
        ) : (
          /* Step 2: Input Name & Unit */
          <>
            <span className="test-eyebrow">{selectedCat.title}</span>
            <h1>
              Bạn có <span className="red-highlight">dễ bị lừa?</span>
            </h1>

            <p className="test-description">
              {selectedCat.desc}
              <br/>
              <span style={{ fontSize: '13.5px', color: '#ffc247', fontWeight: 600 }}>
                (Vui lòng điền Họ tên và Đơn vị để in trực tiếp lên Giấy Chứng Nhận Song Phú khi đạt từ 8/10 điểm)
              </span>
            </p>

            <div className="test-name-box">
              <div className="test-name-heading">Nhập thông tin thí sinh</div>

              <form onSubmit={handleStartForm} style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Full name input */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#dbe4f6', marginBottom: '6px' }}>
                    Họ và tên thí sinh <span style={{ color: '#ff5e62' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn An"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      minHeight: '52px',
                      color: 'var(--ink)',
                      background: '#fff',
                      border: '0',
                      borderRadius: '8px',
                      outline: '0',
                      padding: '0 16px',
                      fontSize: '15px',
                      boxShadow: '0 8px 24px #05143b2e'
                    }}
                  />
                </div>

                {/* Unit input */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#dbe4f6', marginBottom: '6px' }}>
                    Đơn vị / Trường học / Cơ quan <span style={{ color: '#ff5e62' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Trường THPT Song Phú / Xã Song Phú"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      minHeight: '52px',
                      color: 'var(--ink)',
                      background: '#fff',
                      border: '0',
                      borderRadius: '8px',
                      outline: '0',
                      padding: '0 16px',
                      fontSize: '15px',
                      boxShadow: '0 8px 24px #05143b2e'
                    }}
                  />
                </div>

                {error && (
                  <p className="test-error" style={{ color: '#ffe1dc', fontWeight: 700, margin: '8px 0 0' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="button test-start-button"
                  style={{
                    width: '100%',
                    minHeight: '56px',
                    marginTop: '8px',
                    fontSize: '16px',
                    fontWeight: 800,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Bắt đầu chơi ngay (10 câu)
                </button>
              </form>

              <button
                type="button"
                className="test-back-button"
                onClick={() => {
                  sounds.playSelect();
                  setSelectedCat(null);
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Quay lại chọn thử thách khác</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
