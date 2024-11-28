"use client";

interface CardProps {
  src: string;
  alt?: string;
}

export function Card({ src, alt = "" }: CardProps) {
  return (
    <span
      className="
      relative flex justify-center items-center 
      z-0 overflow-hidden w-full h-full
    "
    >
      {/* Blur effect image */}
      <img
        className="
          absolute z-[1] opacity-40 blur-lg
          w-1/2 h-1/2 rounded-full
          translate-y-2.5 scale-125
        "
        src={src}
        alt=""
      />
      {/* Main image */}
      <img
        className="
          relative z-0
          w-1/2 h-1/2 rounded-full
        "
        src={src}
        alt={alt}
      />
    </span>
  );
}
