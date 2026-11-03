import React, { useState, useEffect, useRef } from 'react';
import CampaignLogoMark from './CampaignLogoMark';
import WatermarkLogo from './WatermarkLogo';

export default function Certificate({ 
  userName = "Nguyễn Vinh", 
  userUnit = "Trường THPT Song Phú", 
  categoryTitle = "Hiệp sĩ nhí", 
  score = 10, 
  total = 10,
  certCode = "NTS-SP-2026-8899",
  issueDate = null
}) {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  const percentage = Math.round((score / total) * 100);

  // ResizeObserver for instant, flawless scaling on all phones and screen sizes
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.clientWidth;
      if (containerWidth > 0) {
        if (containerWidth < 840) {
          setScale(containerWidth / 840);
        } else {
          setScale(1);
        }
      }
    };

    updateScale();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateScale();
      });
      ro.observe(el);
    }

    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        width: '100%', 
        maxWidth: '840px',
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '8px 0',
        overflow: 'hidden'
      }}
    >
      {/* Scaled viewable box - perfectly matches scaled width and height */}
      <div 
        style={{
          width: `${Math.round(840 * scale)}px`,
          height: `${Math.round(594 * scale)}px`,
          position: 'relative',
          borderRadius: `${8 * scale}px`,
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '840px',
            height: '594px'
          }}
        >
          {/* 
            Certificate Canvas Container
            Exact A4 landscape (840px x 594px)
            Authentic, Prestigious Design
          */}
          <div 
            id="certificate-print-area"
            style={{
              position: 'relative',
              overflow: 'hidden',
              userSelect: 'none',
              border: '10px solid #0f172a',
              width: '840px',
              minWidth: '840px',
              height: '594px',
              boxSizing: 'border-box',
              background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #faf8f5 65%, #f2efe9 100%)',
              color: '#0f172a'
            }}
          >
            {/* Elegant Classical Inner Border (Gold & Fine Navy Lines) */}
            <div 
              style={{
                position: 'absolute',
                inset: '10px',
                border: '1.5px solid #d4af37',
                borderRadius: '4px',
                pointerEvents: 'none',
                zIndex: 5
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: '14px',
                border: '1px solid rgba(15, 23, 42, 0.12)',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 5
              }}
            />

            {/* Corner Decorative Ornaments */}
            <div style={{ position: 'absolute', top: '14px', left: '14px', width: '24px', height: '24px', borderTop: '2.5px solid #d4af37', borderLeft: '2.5px solid #d4af37', zIndex: 6, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '14px', right: '14px', width: '24px', height: '24px', borderTop: '2.5px solid #d4af37', borderRight: '2.5px solid #d4af37', zIndex: 6, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', width: '24px', height: '24px', borderBottom: '2.5px solid #d4af37', borderLeft: '2.5px solid #d4af37', zIndex: 6, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '14px', right: '14px', width: '24px', height: '24px', borderBottom: '2.5px solid #d4af37', borderRight: '2.5px solid #d4af37', zIndex: 6, pointerEvents: 'none' }} />

            {/* Authentic Soft Pastel Watermark Underneath (Chìm Logo ở dưới) */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: 'translate(0px, 32px)', zIndex: 1 }}
            >
              <WatermarkLogo width={520} />
            </div>

            {/* ================= MAIN CERTIFICATE BODY ================= */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full py-8 px-12 text-center">
              
              {/* Header Title Section - Centered with Official Campaign Emblem */}
              <div className="mb-2 flex flex-col items-center">
                
                {/* Official Campaign Emblem Pill (Centered, Never overlaps text) */}
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(203, 213, 225, 0.9)',
                    borderRadius: '9999px',
                    padding: '4px 16px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    marginBottom: '10px'
                  }}
                >
                  <CampaignLogoMark className="w-8 h-auto" />
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    CHIẾN DỊCH KHÔNG MỘT MÌNH
                  </span>
                  <span style={{ color: '#cbd5e1', fontSize: '12px' }}>•</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#3000d8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    KẾT NỐI KHÔNG TỔN THƯƠNG
                  </span>
                </div>

                <p style={{
                  fontSize: '16.5px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#1e293b',
                  textTransform: 'uppercase',
                  margin: '0 0 4px'
                }}>
                  PHONG TRÀO “5 PHÚT CÙNG EM”
                </p>
                <h1 
                  style={{
                    fontSize: '44px',
                    fontWeight: 900,
                    color: '#0f172a',
                    letterSpacing: '0.08em',
                    fontFamily: "'Playfair Display', serif",
                    textTransform: 'uppercase',
                    margin: 0,
                    textShadow: '0 1px 2px rgba(0,0,0,0.06)'
                  }}
                >
                  GIẤY CHỨNG NHẬN
                </h1>
              </div>

              {/* Recipient Details - Centered */}
              <div className="my-auto px-6 w-full max-w-[700px]">
                
                {/* Category / Subtitle */}
                <p style={{
                  fontSize: '19px',
                  fontWeight: 800,
                  color: '#1e293b',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  margin: '0 0 12px'
                }}>
                  {categoryTitle ? categoryTitle.toUpperCase() : "HIỆP SĨ NHÍ"}
                </p>

                {/* Recipient Name in Elegant Calligraphy / Script Font */}
                <div className="inline-block relative my-2">
                  <div 
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: '54px',
                      fontWeight: 700,
                      color: '#1e3a8a',
                      lineHeight: '1.2',
                      padding: '0 40px'
                    }}
                  >
                    {userName || "Nguyễn Vinh"}
                  </div>
                  {/* Subtle graceful gradient underline under name */}
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '2px', 
                      background: 'linear-gradient(90deg, transparent 0%, #93c5fd 25%, #1d4ed8 50%, #93c5fd 75%, transparent 100%)', 
                      margin: '2px auto 0' 
                    }} 
                  />
                </div>

                {/* Unit Info */}
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#334155', margin: '8px 0 14px' }}>
                  Đơn vị: <span style={{ color: '#0f172a', fontWeight: 800 }}>{userUnit || "Song Phú"}</span>
                </p>

                {/* Formal Appreciation Paragraph */}
                <p style={{
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: '#334155',
                  maxWidth: '620px',
                  margin: '0 auto',
                  fontWeight: 500
                }}>
                  Đã hoàn thành thử thách, góp phần xây dựng môi trường mạng an toàn, lành mạnh, trách nhiệm, cùng nhau lan toả Chiến dịch không một mình - kết nối không tổn thương.
                </p>

                {/* Honors & Score Badge Pill */}
                <div 
                  style={{ 
                    marginTop: '14px', 
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(5, 150, 105, 0.08)',
                    border: '1px solid rgba(5, 150, 105, 0.3)',
                    borderRadius: '9999px',
                    padding: '4px 18px',
                    fontSize: '13px', 
                    color: '#047857', 
                    fontWeight: 800,
                    letterSpacing: '0.04em'
                  }}
                >
                  ★ KẾT QUẢ: {score}/{total} ĐIỂM ({percentage}%) — XẾP LOẠI: XUẤT SẮC ★
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
