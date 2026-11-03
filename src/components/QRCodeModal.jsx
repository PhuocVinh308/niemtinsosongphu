import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, Smartphone, Share2 } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef(null);

  const webUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('github.io') ? 'https://phuocvinh308.github.io/niemtinso/' : window.location.href)
    : 'https://phuocvinh308.github.io/niemtinso/';

  useEffect(() => {
    if (!isOpen) return;

    // Generate high quality QR Code with Margin 2, Error Correction Level 'H' (High) to allow center logo
    QRCode.toDataURL(webUrl, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0a192f',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('QR code generation failed:', err);
    });
  }, [isOpen, webUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(webUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'ma-qr-chien-dich-khong-mot-minh.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(5, 12, 28, 0.85)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #0d1b2e 0%, #07111e 100%)',
          border: '1px solid rgba(255, 194, 71, 0.35)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 194, 71, 0.15)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '440px',
          padding: '28px 24px',
          textAlign: 'center',
          position: 'relative',
          color: '#ffffff'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 194, 71, 0.15)',
            border: '1px solid rgba(255, 194, 71, 0.4)',
            color: '#ffc247',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mã QR Truy Cập Nhanh</span>
          </div>

          <h3 style={{
            margin: '0 0 6px 0',
            fontSize: '18px',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            color: '#ffffff',
            lineHeight: 1.3
          }}>
            Chiến Dịch Không Một Mình
          </h3>
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.4
          }}>
            Quét mã để làm bài thi đố vui trực tiếp trên điện thoại hoặc chia sẻ tới cộng đồng
          </p>
        </div>

        {/* QR Code Container */}
        <div style={{
          background: '#ffffff',
          padding: '16px',
          borderRadius: '18px',
          display: 'inline-block',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          marginBottom: '20px'
        }}>
          {qrDataUrl ? (
            <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto' }}>
              <img 
                src={qrDataUrl} 
                alt="QR Code Chiến dịch Không Một Mình" 
                style={{ width: '100%', height: '100%', display: 'block', borderRadius: '8px' }}
              />
              {/* Center Logo badge overlay */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#ffffff',
                padding: '4px',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '12px'
                }}>
                  🤝
                </div>
              </div>
            </div>
          ) : (
            <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              Đang tạo mã QR...
            </div>
          )}
        </div>

        {/* URL Pill */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '8px 12px',
          fontSize: '12px',
          color: '#cbd5e1',
          wordBreak: 'break-all',
          marginBottom: '18px',
          fontFamily: 'monospace'
        }}>
          {webUrl}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={handleCopyLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              background: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              border: copied ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.15)',
              color: copied ? '#4ade80' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã chép link' : 'Sao chép link'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadQR}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffc247 0%, #e09b12 100%)',
              border: 'none',
              color: '#07111e',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 194, 71, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            <Download className="w-4 h-4" />
            <span>Tải ảnh QR</span>
          </button>
        </div>

      </div>
    </div>
  );
}
