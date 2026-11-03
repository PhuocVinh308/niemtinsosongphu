import React from 'react';
import { Volume2, VolumeX, UserCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

import CampaignLogoMark from './CampaignLogoMark';

export default function Navbar({ 
  user, 
  onEditProfile, 
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
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

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

          {/* User Profile / Update Name Button - ALWAYS VISIBLE ON ALL SCREEN SIZES */}
          <button 
            type="button"
            onClick={onEditProfile}
            title="Bấm để cập nhật Họ tên & Đơn vị in Giấy chứng nhận"
            style={{ 
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: user?.fullName 
                ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' 
                : 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
              fontSize: '12px',
              fontWeight: 800,
              flexShrink: 0
            }}
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-300" />
            <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.fullName ? user.fullName : 'Cập nhật tên'}
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '6px',
              padding: '1px 5px',
              fontSize: '10px',
              fontWeight: 700
            }}>
              Đổi
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}
