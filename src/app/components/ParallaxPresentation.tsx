"use client";

import React, { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";

interface SlideProps {
  offset: number;
  gradient: string;
  onClick: () => void;
  title: string;
  content: string;
}

const Slide = ({ offset, gradient, onClick, title, content }: SlideProps) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div
        className="absolute inset-0 bg-gray-900"
        style={{ clipPath: "polygon(20% 0, 70% 0, 50% 100%, 0% 100%)" }}
      />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          clipPath: "polygon(70% 0, 100% 0, 80% 100%, 50% 100%)",
        }}
      />
    </ParallaxLayer>

    <ParallaxLayer
      className="flex items-center justify-start pointer-events-none"
      offset={offset}
      speed={0.3}
    >
      <div className="pl-[20%] w-full">
        <h2 className="text-6xl font-bold text-white mb-4">{title}</h2>
        <p className="text-2xl text-white">{content}</p>
      </div>
    </ParallaxLayer>
  </>
);

export default function ParallaxPresentation() {
  const parallax = useRef<IParallax>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
      setCurrentSlide(to);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX > 0 || e.deltaY > 0) {
        scroll(Math.min(slides.length - 1, currentSlide + 1));
      } else {
        scroll(Math.max(0, currentSlide - 1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSlide]);

  const slides = [
    {
      title: "Willkommen",
      content: "zu unserer innovativen Präsentation",
      gradient: "linear-gradient(to right, deeppink 0%, coral 100%)",
    },
    {
      title: "Horizontaler Parallax",
      content: "Erleben Sie eine neue Art der Präsentation",
      gradient: "linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)",
    },
    {
      title: "Interaktiv",
      content: "Navigieren Sie durch die Folien mit Leichtigkeit",
      gradient: "linear-gradient(to right, tomato 0%, gold 100%)",
    },
    {
      title: "Anpassbar",
      content: "Fügen Sie Bilder, Videos und mehr hinzu",
      gradient: "linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)",
    },
    {
      title: "Danke!",
      content: "Fragen?",
      gradient: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)",
    },
  ];

  return (
    <div className="w-screen h-screen bg-gray-100">
      <Parallax ref={parallax} pages={slides.length} horizontal>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            offset={index}
            gradient={slide.gradient}
            onClick={() => scroll(Math.min(slides.length - 1, index + 1))}
            title={slide.title}
            content={slide.content}
          />
        ))}

        <ParallaxLayer
          sticky={{ start: 0, end: slides.length - 1 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "1rem",
          }}
        >
          <button
            className="bg-white bg-opacity-80 px-4 py-2 rounded shadow hover:bg-opacity-100 transition-colors"
            onClick={() => scroll(Math.max(0, currentSlide - 1))}
          >
            Zurück
          </button>
          <span
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "white",
              color:
                slides[currentSlide]?.gradient.match(
                  /^linear-gradient\(to right,\s*(\S+)/
                )?.[1] || "black",
            }}
          >
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            className="bg-white bg-opacity-80 px-4 py-2 rounded shadow hover:bg-opacity-100 transition-colors"
            onClick={() =>
              scroll(Math.min(slides.length - 1, currentSlide + 1))
            }
          >
            Weiter
          </button>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
