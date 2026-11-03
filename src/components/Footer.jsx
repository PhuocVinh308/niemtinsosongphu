import React from 'react';
import { Mail, Phone, MapPin, QrCode } from 'lucide-react';
import CampaignLogoMark from './CampaignLogoMark';

export default function Footer({ onGoHome, onOpenQR }) {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(5, 15, 38, 0.95)',
      padding: '28px 16px 24px',
      color: '#94a3b8',
      fontSize: '13px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        
        {/* Brand Logo & Name */}
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); onGoHome(); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <CampaignLogoMark className="w-12 h-auto" />
          <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
            <strong style={{ color: '#ffffff', fontSize: '13px', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              CHIẾN DỊCH KHÔNG MỘT MÌNH
            </strong>
            <small style={{ color: '#ffc247', fontSize: '11px', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase', marginTop: '1px' }}>
              KẾT NỐI KHÔNG TỔN THƯƠNG
            </small>
          </span>
        </a>

        {/* Short description */}
        <p style={{ margin: 0, color: '#cbd5e1', fontSize: '13px', lineHeight: 1.5, maxWidth: '520px' }}>
          Cùng cộng đồng nhận diện đúng, chia sẻ có trách nhiệm và an toàn hơn trên không gian số.
        </p>

        {/* Contact bar inline */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '18px',
          color: '#94a3b8',
          fontSize: '12px'
        }}>
          <button
            type="button"
            onClick={onOpenQR}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 194, 71, 0.12)',
              border: '1px solid rgba(255, 194, 71, 0.35)',
              color: '#ffc247',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Mã QR Trang Web</span>
          </button>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>khongmotminh@gmail.com</span>
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <a href="tel:0353580190" style={{ color: 'inherit', textDecoration: 'none' }}>0353580190</a>
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Việt Nam</span>
          </span>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', paddingTop: '14px', marginTop: '4px', fontSize: '12px', color: '#64748b' }}>
          © 2026 Chiến dịch Không một mình - Kết nối không tổn thương. Nền tảng Đố vui an toàn thông tin &amp; Cấp chứng nhận trực tuyến.
        </div>

      </div>
    </footer>
  );
}
