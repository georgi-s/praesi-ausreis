"use client";

import React, { useRef, useState, useEffect } from "react";
import { Parallax as HorizontalParallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { Parallax as VerticalParallax } from "@react-spring/parallax";
import { slides } from "../data/slideContent";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";
import CollaborativeCursor from "./CollaborativeCursor";
import { useSession } from "next-auth/react";
import useSWR from "swr";

interface ParallaxPresentationProps {
  onSlideChange: (index: number) => void;
}

interface CursorPosition {
  x: number;
  y: number;
  userId: string;
  userName: string;
}

const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((res) => res.json());

export default function ParallaxPresentation({
  onSlideChange,
}: ParallaxPresentationProps) {
  const horizontalParallax = useRef<IParallax>(null);
  const verticalParallaxRefs = useRef<(IParallax | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: session } = useSession();
  const { data: cursorPositions = [], mutate: mutateCursorPositions } = useSWR<
    CursorPosition[]
  >("/api/cursor-positions", fetcher, {
    refreshInterval: 100,
  });

  const updateCursorPosition = async (x: number, y: number) => {
    if (session?.user?.id) {
      await fetch("/api/cursor-positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x,
          y,
          userId: session.user.id,
          userName: session.user.name || "Anonymous",
        }),
      });
      mutateCursorPositions();
    }
  };

  const horizontalScroll = (to: number) => {
    if (horizontalParallax.current) {
      horizontalParallax.current.scrollTo(to);
      setCurrentSlide(to);
      onSlideChange(to);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
        horizontalScroll(currentSlide + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        horizontalScroll(currentSlide - 1);
      } else if (e.key === "ArrowDown") {
        const currentVerticalParallax = verticalParallaxRefs.current[currentSlide];
        if (currentVerticalParallax) {
          currentVerticalParallax.scrollTo(1);
        }
      } else if (e.key === "ArrowUp") {
        const currentVerticalParallax = verticalParallaxRefs.current[currentSlide];
        if (currentVerticalParallax) {
          currentVerticalParallax.scrollTo(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", background: "#dfdfdf" }}
      onMouseMove={handleMouseMove}
    >
      <HorizontalParallax
        ref={horizontalParallax}
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

            <ParallaxLayer 
              className="text content" 
              offset={index} 
              speed={0.3}
              style={{ height: "100vh", overflowY: "hidden" }}
            >
              <VerticalParallax
                pages={2}
                style={{ height: "100vh" }}
                ref={(ref: IParallax | null) => {
                  verticalParallaxRefs.current[index] = ref;
                }}
              >
                <ParallaxLayer
                  offset={0}
                  speed={0.5}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="content-wrapper">
                    <h2>{slide.title}</h2>
                    <p>{slide.content}</p>
                    <div className="scroll-hint mt-8 animate-bounce text-center text-sm text-gray-600">
                      <p>Nach unten scrollen für mehr Details ↓</p>
                    </div>
                  </div>
                </ParallaxLayer>

                <ParallaxLayer
                  offset={1}
                  speed={0.5}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="content-wrapper">
                    <h3>Weitere Details</h3>
                    <p>{slide.additionalContent || "Weitere Informationen folgen..."}</p>
                    <div className="scroll-hint mt-8 animate-bounce text-center text-sm text-gray-600">
                      <p>Nach oben scrollen zur Übersicht ↑</p>
                    </div>
                  </div>
                </ParallaxLayer>
              </VerticalParallax>
            </ParallaxLayer>

            <ParallaxLayer className="text number" offset={index} speed={0.3}>
              <span>0{index + 1}</span>
            </ParallaxLayer>
          </React.Fragment>
        ))}
      </HorizontalParallax>
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
                onClick={() => horizontalScroll(index)}
              >
                {index + 1}
              </button>
            </DockCard>
          ))}
        </Dock>
      </div>
      {Array.isArray(cursorPositions) &&
        cursorPositions.map((cursor: CursorPosition) => (
          <CollaborativeCursor
            key={cursor.userId}
            x={cursor.x}
            y={cursor.y}
            color={`#${cursor.userId.slice(0, 6)}`}
            name={cursor.userName}
          />
        ))}
    </div>
  );
}
