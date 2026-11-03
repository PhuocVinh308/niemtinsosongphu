import React, { useState, useEffect } from 'react';
import { User, Building, Award, CheckCircle2, Sparkles, X, ShieldAlert, ChevronDown } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  initialData, 
  onSave, 
  requiredToStart = false 
}) {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [unit, setUnit] = useState(initialData?.unit || '');
  const [role, setRole] = useState(initialData?.role || 'Học sinh tiểu học');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || '');
      setUnit(initialData.unit || '');
      setRole(initialData.role || 'Học sinh tiểu học');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Vui lòng nhập Họ và Tên của bạn!');
      sounds.playIncorrect();
      return;
    }
    if (!unit.trim()) {
      setError('Vui lòng nhập Đơn vị / Trường học / Cơ quan của bạn!');
      sounds.playIncorrect();
      return;
    }

    setError('');
    sounds.playCorrect();
    onSave({
      fullName: fullName.trim(),
      unit: unit.trim(),
      role: role.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      {/* Outer ambient glow */}
      <div className="relative w-full max-w-lg">
        
        {/* Modal Window Card */}
        <div 
          style={{
            background: 'linear-gradient(155deg, rgba(15, 23, 42, 0.97) 0%, rgba(10, 18, 36, 0.98) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.75), 0 0 35px rgba(99, 102, 241, 0.12)',
            padding: '28px 24px',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="sm:p-8"
        >
          {/* Subtle top decorative highlight */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #818cf8, #c084fc, transparent)'
            }}
          />

          {/* Close Button (if optional) */}
          {!requiredToStart && (
            <button
              onClick={onClose}
              type="button"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '8px',
                borderRadius: '12px',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Modal Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                padding: '1.5px',
                boxShadow: '0 8px 20px -4px rgba(79, 70, 229, 0.45)',
                flexShrink: 0
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#090d16',
                  borderRadius: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Award className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Thông Tin Thí Sinh
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Điền thông tin để in trực tiếp lên <span className="text-amber-400 font-bold">Giấy chứng nhận</span> khi đạt chuẩn!
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
                Họ và tên thí sinh <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="VD: Nguyễn Văn An"
                  autoFocus
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '14px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  className="placeholder-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Unit / School */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
                Đơn vị / Trường học / Cơ quan <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="VD: Trường THPT Song Phú / Xã Song Phú"
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '14px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  className="placeholder-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Role / Đối tượng */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
                Đối tượng tham gia
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '16px',
                    paddingRight: '36px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '14px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                >
                  <option value="Học sinh tiểu học" className="bg-slate-900 text-white">Học sinh tiểu học (Hiệp sĩ nhí)</option>
                  <option value="Học sinh THCS" className="bg-slate-900 text-white">Học sinh THCS (Vệ binh số)</option>
                  <option value="Học sinh THPT" className="bg-slate-900 text-white">Học sinh THPT (Chiến binh mạng)</option>
                  <option value="Sinh viên / Sau THPT" className="bg-slate-900 text-white">Sinh viên / Thanh niên (Thủ lĩnh kết nối)</option>
                  <option value="Phụ huynh học sinh" className="bg-slate-900 text-white">Phụ huynh (Lá chắn yêu thương)</option>
                  <option value="Giáo viên / Cán bộ quản lý" className="bg-slate-900 text-white">Giáo viên / Giảng viên (Người dẫn đường)</option>
                  <option value="Cộng đồng tự do" className="bg-slate-900 text-white">Người dùng mạng xã hội tự do</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Live Certificate Preview Card (Miniature Diploma Badge) */}
            <div 
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1.5px dashed rgba(212, 175, 55, 0.45)',
                borderRadius: '16px',
                padding: '12px 18px',
                marginTop: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hiển thị trên Giấy Chứng Nhận:</span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Bản mẫu
                </span>
              </div>

              {/* Name in actual script calligraphy */}
              <div 
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#93c5fd',
                  lineHeight: 1.2,
                  marginTop: '1px'
                }}
              >
                {fullName.trim() || "Họ và Tên của bạn"}
              </div>

              {/* Unit Info */}
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginTop: '1px' }}>
                Đơn vị: <span style={{ color: '#ffffff', fontWeight: 700 }}>{unit.trim() || "Đơn vị / Trường học của bạn"}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                marginTop: '16px',
                minHeight: '52px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #4338ca 100%)',
                boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.45)',
                borderRadius: '16px',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="hover:scale-[1.01] active:scale-[0.99] hover:shadow-indigo-500/50"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Xác nhận thông tin &amp; Sẵn sàng thi</span>
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
