"use client";

import React, { useRef, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { slides, SlideContent } from "../data/slideContent";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";

interface PageProps extends SlideContent {
  offset: number;
  onClick: () => void;
}

const Page = ({ offset, gradient, onClick, title, content }: PageProps) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </ParallaxLayer>

    <ParallaxLayer className="text content" offset={offset} speed={0.3}>
      <div className="content-wrapper">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </ParallaxLayer>

    <ParallaxLayer className="text number" offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
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

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#dfdfdf" }}>
      <Parallax
        ref={parallax}
        pages={slides.length}
        horizontal
        style={{ top: "0", left: "0" }}
      >
        {slides.map((slide, index) => (
          <Page
            key={index}
            offset={index}
            {...slide}
            onClick={() => scroll((index + 1) % slides.length)}
          />
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
