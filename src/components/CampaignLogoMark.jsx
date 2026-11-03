import React from 'react';

export default function CampaignLogoMark({ className = "w-10 h-auto", style = {} }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="887 297 243 105" 
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="campaign-logo-clip-0">
          <path clipRule="nonzero" d="M 887 297 L 1130 297 L 1130 402 L 887 402 Z M 887 297 "/>
        </clipPath>
        <clipPath id="campaign-logo-clip-1">
          <path clipRule="nonzero" d="M 937.726562 297.066406 L 937.726562 329.808594 C 933.117188 312.175781 920.984375 297.066406 895.285156 297.066406 L 887.847656 297.066406 L 887.847656 401.101562 L 895.285156 401.101562 C 920.984375 401.101562 933.117188 385.992188 937.726562 368.359375 L 937.726562 401.101562 L 968.382812 401.101562 C 1003.257812 401.101562 1015.957031 373.28125 1015.957031 349.085938 C 1015.957031 324.886719 1003.257812 297.066406 968.382812 297.066406 Z M 1024.992188 349.085938 C 1024.992188 377.8125 1048.28125 401.101562 1077.007812 401.101562 C 1105.738281 401.101562 1129.027344 377.8125 1129.027344 349.085938 C 1129.027344 320.355469 1105.738281 297.066406 1077.007812 297.066406 C 1048.28125 297.066406 1024.992188 320.355469 1024.992188 349.085938 "/>
        </clipPath>
        <radialGradient 
          id="campaign-radial-pattern" 
          gradientUnits="userSpaceOnUse" 
          cx="0" 
          cy="0" 
          fx="0" 
          fy="0" 
          r="182.268862" 
          gradientTransform="matrix(-0.39654, 0.918017, -0.918017, -0.39654, 1046.15271, 288.477661)"
        >
          <stop offset="0" stopColor="rgb(98.82%, 83.92%, 0%)" />
          <stop offset="0.2" stopColor="rgb(96.47%, 57.25%, 7.45%)" />
          <stop offset="0.4" stopColor="rgb(88.23%, 17.64%, 23.52%)" />
          <stop offset="0.6" stopColor="rgb(62.74%, 10.19%, 55.29%)" />
          <stop offset="0.8" stopColor="rgb(41.17%, 4.31%, 81.96%)" />
          <stop offset="1" stopColor="rgb(26.66%, 0%, 100%)" />
        </radialGradient>
      </defs>
      <g clipPath="url(#campaign-logo-clip-0)">
        <g clipPath="url(#campaign-logo-clip-1)">
          <path fillRule="nonzero" fill="url(#campaign-radial-pattern)" d="M 1166.898438 313.425781 L 925.773438 209.269531 L 849.976562 384.742188 L 1091.101562 488.898438 Z M 1166.898438 313.425781 "/>
        </g>
      </g>
    </svg>
  );
}
