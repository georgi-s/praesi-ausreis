import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface LayerShapeProps {
  className?: string;
  gradient: string;
  isBackground?: boolean;
  blur?: number;
  interactive?: boolean;
}

export const LayerShape: React.FC<LayerShapeProps> = ({
  className,
  gradient,
  isBackground = false,
  blur = 0,
  interactive = false,
}) => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (interactive) {
      if (session) {
        signOut();
      } else {
        signIn("github");
      }
    }
  };

  return (
    <div
      className={`${className} ${
        interactive
          ? 'cursor-pointer hover:scale-110 active:scale-110 transition-transform duration-300 touch-manipulation'
          : ''
      }`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backdropFilter: isBackground ? `blur(${blur}px)` : undefined,
      }}
      onClick={handleClick}
      onTouchStart={handleClick}
      role={interactive ? "button" : undefined}
      aria-label={interactive ? (session ? "Abmelden" : "Anmelden") : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 566.93 566.93"
        style={{ width: "100%", height: "100%", position: "absolute" }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={`gradient-${gradient}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {gradient === "reedu" && (
              <>
                <stop offset="0%" stopColor="#EB5C37" />
                <stop offset="100%" stopColor="#EB5C37" />
              </>
            )}
            {gradient === "react" && (
              <>
                <stop offset="0%" stopColor="#61DAFB" />
                <stop offset="100%" stopColor="#00B4D8" />
              </>
            )}
            {gradient === "next" && (
              <>
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#404040" />
              </>
            )}
            {gradient === "typescript" && (
              <>
                <stop offset="0%" stopColor="#3178C6" />
                <stop offset="100%" stopColor="#235A97" />
              </>
            )}
            {gradient === "tailwind" && (
              <>
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#818CF8" />
              </>
            )}
            {gradient === "node" && (
              <>
                <stop offset="0%" stopColor="#539E43" />
                <stop offset="100%" stopColor="#2F5E1E" />
              </>
            )}
          </linearGradient>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="-20" dy="0" stdDeviation="3" floodOpacity="1" />
          </filter>
          {isBackground && (
            <filter id="blur">
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          )}
        </defs>
        <polyline
          className="animate-dash"
          fill={`url(#gradient-${gradient})`}
          stroke={`url(#gradient-${gradient})`}
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
          points="236.41 283.46 142.28 377.58 236.41 471.7 424.64 283.46 236.41 95.22 142.28 189.34 236.41 283.46"
          filter={isBackground ? "url(#blur)" : "url(#dropShadow)"}
          style={{
            opacity: isBackground ? 0.5 : 1,
          }}
        />
      </svg>
    </div>
  );
};
