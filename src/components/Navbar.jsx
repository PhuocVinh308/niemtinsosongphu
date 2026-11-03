import React from 'react';
import { Volume2, VolumeX, UserPlus, QrCode } from 'lucide-react';
import { sounds } from '../utils/audio';

import CampaignLogoMark from './CampaignLogoMark';

export default function Navbar({ 
  user, 
  onEditProfile, 
  onOpenQR,
  onGoHome, 
  isMuted, 
  onToggleSound 
}) {
  return (
    <header className="site-header is-visible">
      <div className="shell nav-wrap">
        
        {/* Brand Logo - Chiến dịch Không một mình - Kết nối không tổn thương */}
        <a 
          className="brand" 
          aria-label="Chiến dịch Không một mình - Kết nối không tổn thương" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
        >
          <CampaignLogoMark className="w-12 sm:w-14 h-auto" />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <strong style={{ color: '#0d1b2e', fontSize: '13px', fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              CHIẾN DỊCH KHÔNG MỘT MÌNH
            </strong>
            <small style={{ color: '#3000d8', fontSize: '11px', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase', marginTop: '1px' }}>
              KẾT NỐI KHÔNG TỔN THƯƠNG
            </small>
          </span>
        </a>

        {/* Desktop Nav - ONLY ĐỐ VUI */}
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <a 
            className="active" 
            href="#" 
            onClick={(e) => { e.preventDefault(); onGoHome(); }}
            style={{ fontWeight: 800, fontSize: '15px' }}
          >
            Đố vui
          </a>
        </nav>

        {/* Nav Actions */}
        <div className="nav-actions">
          
          {/* QR Code Button */}
          <button 
            type="button" 
            onClick={onOpenQR}
            className="lang-switch" 
            title="Quét mã QR trên điện thoại / Chia sẻ"
            style={{ 
              cursor: 'pointer', 
              gap: '6px', 
              padding: '0 12px',
              background: 'rgba(255, 194, 71, 0.15)',
              borderColor: 'rgba(255, 194, 71, 0.4)',
              color: '#ffc247'
            }}
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span style={{ fontSize: '11px', fontWeight: 800 }}>MÃ QR</span>
          </button>

          {/* Sound Toggle */}
          <button 
            type="button" 
            onClick={onToggleSound} 
            className="lang-switch" 
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            style={{ cursor: 'pointer', gap: '6px', padding: '0 12px' }}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span style={{ fontSize: '11px', fontWeight: 700 }}>{isMuted ? 'MUTE' : 'ÂM THANH'}</span>
          </button>

          {/* User Profile Button */}
          <button 
            type="button"
            className="button button-small" 
            onClick={onEditProfile}
            style={{ cursor: 'pointer' }}
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            <span>{user?.fullName ? user.fullName : 'Thí sinh'}</span>
          </button>

        </div>

      </div>
    </header>
  );
}
