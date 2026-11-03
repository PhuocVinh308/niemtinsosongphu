import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Smartphone, Download, Copy, Check, Sparkles, Share2 } from 'lucide-react';

export default function QRCodeCard() {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const webUrl = typeof window !== 'undefined'
    ? (window.location.origin.includes('github.io') ? 'https://phuocvinh308.github.io/niemtinso/' : window.location.href)
    : 'https://phuocvinh308.github.io/niemtinso/';

  useEffect(() => {
    QRCode.toDataURL(webUrl, {
      width: 320,
      margin: 1.5,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0a192f',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('QR code generation error:', err);
    });
  }, [webUrl]);

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
    <div style={{
      maxWidth: '780px',
      margin: '40px auto 10px',
      background: 'linear-gradient(135deg, rgba(13, 27, 46, 0.9) 0%, rgba(7, 17, 30, 0.95) 100%)',
      border: '1px solid rgba(255, 194, 71, 0.3)',
      boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 25px rgba(56, 189, 248, 0.08)',
      borderRadius: '20px',
      padding: '24px 20px',
      backdropFilter: 'blur(10px)',
      color: '#ffffff'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px'
      }}>
        {/* QR Code Frame */}
        <div style={{
          background: '#ffffff',
          padding: '12px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
          position: 'relative',
          flexShrink: 0
        }}>
          {qrDataUrl ? (
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <img 
                src={qrDataUrl} 
                alt="Mã QR tham gia thi đố vui" 
                style={{ width: '100%', height: '100%', display: 'block', borderRadius: '8px' }}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#ffffff',
                padding: '3px',
                borderRadius: '50%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '11px'
                }}>
                  🤝
                </div>
              </div>
            </div>
          ) : (
            <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '12px' }}>
              Đang tải QR...
            </div>
          )}
        </div>

        {/* Info & Action Buttons */}
        <div style={{ flex: '1 1 320px', textAlign: 'left' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            padding: '3px 10px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <Smartphone className="w-3 h-3" />
            <span>Mã QR Tham Gia &amp; Chia Sẻ</span>
          </div>

          <h3 style={{
            margin: '0 0 6px 0',
            fontSize: '17px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.3
          }}>
            Quét mã để làm bài trên Điện thoại
          </h3>

          <p style={{
            margin: '0 0 14px 0',
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.45
          }}>
            Dùng camera điện thoại hoặc Zalo quét mã QR để mở trực tiếp trang thi và tải Giấy Chứng Nhận về máy bất kỳ lúc nào.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              type="button"
              onClick={handleDownloadQR}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ffc247 0%, #e09b12 100%)',
                border: 'none',
                color: '#07111e',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 194, 71, 0.3)'
              }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải ảnh QR</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                background: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: copied ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.15)',
                color: copied ? '#4ade80' : '#ffffff',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép link' : 'Sao chép link web'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
