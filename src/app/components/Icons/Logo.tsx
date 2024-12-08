import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className, ...props }) => (
  <svg
    id="logo"
    data-name="Logo"
    viewBox="0 0 566.93 566.93"
    className={className}
    role="img"
    aria-label="114 Logo"
    {...props}
  >
    <defs>
      <filter
        id="dropShadow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        filterUnits="objectBoundingBox"
      >
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <style>
      {`
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
        @keyframes glow {
          from {
            filter: drop-shadow(0 0 2px #eb5c37);
          }
          to {
            filter: drop-shadow(0 0 8px #eb5c37);
          }
        }
      `}
    </style>
    <path
      stroke="#eb5c37"
      filter="url(#dropShadow)"
      style={{
        animation:
          "dash 10s linear infinite, glow 1.5s ease-in-out infinite alternate forwards 2.5s",
      }}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={100}
      d="M236.41 283.46l-94.13 94.12 94.13 94.12 188.23-188.24L236.41 95.22l-94.13 94.12 94.13 94.12"
    />
  </svg>
);

export default Logo;
