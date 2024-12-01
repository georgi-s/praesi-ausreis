import React, { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { slides } from "../data/slideContent";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";

interface ParallaxPresentationProps {
  onSlideChange: (index: number) => void;
}

export default function ParallaxPresentation({
  onSlideChange,
}: ParallaxPresentationProps) {
  const parallax = useRef<IParallax>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
      setCurrentSlide(to);
      onSlideChange(to);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
        scroll(currentSlide + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        scroll(currentSlide - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#dfdfdf" }}>
      <Parallax
        ref={parallax}
        pages={slides.length}
        horizontal
        style={{ top: "0", left: "0" }}
      >
        {slides.map((slide, index) => (
          <React.Fragment key={index}>
            <ParallaxLayer offset={index} speed={0.2}>
              <div className="slopeBegin" />
            </ParallaxLayer>

            <ParallaxLayer offset={index} speed={0.6}>
              <div className={`slopeEnd ${slide.gradient}`} />
            </ParallaxLayer>

            <ParallaxLayer className="text content" offset={index} speed={0.3}>
              <div className="content-wrapper">
                <h2>{slide.title}</h2>
                <p>{slide.content}</p>
              </div>
            </ParallaxLayer>

            <ParallaxLayer className="text number" offset={index} speed={0.3}>
              <span>0{index + 1}</span>
            </ParallaxLayer>
          </React.Fragment>
        ))}
      </Parallax>
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2">
        <Dock>
          {slides.map((_, index) => (
            <DockCard key={index} isActive={currentSlide === index}>
              <button
                className={`w-full h-full flex items-center justify-center text-white font-bold font-mono text-xl tracking-tight ${
                  currentSlide === index
                    ? "bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent scale-110 transition-transform duration-200"
                    : "text-white/70"
                }`}
                onClick={() => scroll(index)}
              >
                {index + 1}
              </button>
            </DockCard>
          ))}
        </Dock>
      </div>
    </div>
  );
}
