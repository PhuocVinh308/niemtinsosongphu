import React from 'react';

/**
 * High-elegance pastel watermark of the campaign logo, matching the official certificate.
 * Soft violet on the left and soft peach on the right, with smooth feathering and no harsh cutoffs.
 */
export default function WatermarkLogo({ width = 480, className = "" }) {
  return (
    <div 
      style={{
        width: `${width}px`,
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
        filter: 'blur(0.8px)',
      }}
      className={className}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="887 297 243 105" 
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pastel-watermark-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.10" />
            <stop offset="40%" stopColor="#c084fc" stopOpacity="0.11" />
            <stop offset="75%" stopColor="#f472b6" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.13" />
          </linearGradient>
        </defs>
        
        {/* Exact official logo geometry filled with smooth pastel gradient */}
        <path 
          fillRule="nonzero" 
          fill="url(#pastel-watermark-gradient)"
          d="M 937.726562 297.066406 L 937.726562 329.808594 C 933.117188 312.175781 920.984375 297.066406 895.285156 297.066406 L 887.847656 297.066406 L 887.847656 401.101562 L 895.285156 401.101562 C 920.984375 401.101562 933.117188 385.992188 937.726562 368.359375 L 937.726562 401.101562 L 968.382812 401.101562 C 1003.257812 401.101562 1015.957031 373.28125 1015.957031 349.085938 C 1015.957031 324.886719 1003.257812 297.066406 968.382812 297.066406 Z M 1024.992188 349.085938 C 1024.992188 377.8125 1048.28125 401.101562 1077.007812 401.101562 C 1105.738281 401.101562 1129.027344 377.8125 1129.027344 349.085938 C 1129.027344 320.355469 1105.738281 297.066406 1077.007812 297.066406 C 1048.28125 297.066406 1024.992188 320.355469 1024.992188 349.085938 "
        />
      </svg>
    </div>
  );
}
