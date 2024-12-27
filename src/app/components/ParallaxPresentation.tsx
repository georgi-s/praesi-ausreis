"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Parallax as HorizontalParallax,
  ParallaxLayer,
  IParallax,
} from "@react-spring/parallax";
import { Parallax as VerticalParallax } from "@react-spring/parallax";
import { slides } from "../data/slideContent";
import { Dock } from "./Dock/Dock";
import { DockCard } from "./DockCard/DockCard";
import CollaborativeCursor from "./CollaborativeCursor";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { LayerShape } from "./LayerShape";
import { ProcessComparisonChart } from "./ProcessComparisonChart";
import { CostComparisonChart } from "./CostComparisonChart";
import { ROIChart } from "./ROIChart";
import { GanttChart } from "./GanttChart";
import ArchitectureDiagram from "./ArchitectureDiagram";
import SavingsChart from "./SavingsChart";
import TestFlowDiagram from "./TestFlowDiagram";
import CommentSidebar from "./CommentSidebar";
import GitHubBoardExample from "./GitHubBoardExample";
import ComparisonTable from "./ComparisonTable";
import { Comment } from "@/types/comment";

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
  const [currentVerticalSlide, setCurrentVerticalSlide] = useState(0);
  const { data: session } = useSession();
  const { data: cursorPositions = [], mutate: mutateCursorPositions } = useSWR<
    CursorPosition[]
  >("/api/cursor-positions", fetcher, {
    refreshInterval: 100,
  });

  const { data: comments = [], mutate: mutateComments } = useSWR<Comment[]>(
    `/api/comments?slideIndex=${currentSlide}`,
    fetcher,
    { refreshInterval: 1000 }
  );

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

  // Horizontales Scrollen
  const horizontalScroll = (to: number) => {
    if (to >= 0 && to < slides.length && horizontalParallax.current) {
      horizontalParallax.current.scrollTo(to);
      setCurrentSlide(to);
      onSlideChange(to);
    }
  };

  // Vertikales Scrollen
  const verticalScroll = (to: number) => {
    const currentVerticalParallax = verticalParallaxRefs.current[currentSlide];
    if (currentVerticalParallax && to >= 0 && to <= 1) {
      currentVerticalParallax.scrollTo(to);
      setCurrentVerticalSlide(to);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        horizontalScroll(currentSlide + 1);
      } else if (event.key === "ArrowLeft") {
        horizontalScroll(currentSlide - 1);
      } else if (event.key === "ArrowUp") {
        verticalScroll(0);
      } else if (event.key === "ArrowDown") {
        verticalScroll(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#fff5f2] to-[#ffede7] transform -skew-y-6" />
            </ParallaxLayer>

            <ParallaxLayer offset={index} speed={0.6}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffede7] to-[#ffe4db] transform skew-y-3" />
            </ParallaxLayer>

            {/* Logo unten links */}
            <ParallaxLayer offset={index} speed={0.3}>
              <div className="absolute bottom-8 left-8 w-24 h-24">
                <LayerShape
                  className="transform scale-100"
                  gradient="reedu"
                  interactive={true}
                />
              </div>
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
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-4xl w-full">
                      <h2 className="text-4xl font-bold mb-6 text-[#2D3748] border-b-4 border-[#EB5C37] pb-2 inline-block">
                        {slide.title}
                      </h2>
                      <div className="text-lg whitespace-pre-wrap text-gray-800 mt-6">
                        {slide.content}
                      </div>
                      {slide.additionalContent && (
                        <div className="mt-6 text-base text-gray-700">
                          {slide.additionalContent}
                        </div>
                      )}
                    </div>

                    {/* Zusätzliche Karte für Diagramme */}
                    {(index === 1 ||
                      index === 2 ||
                      index === 3 ||
                      index === 4 ||
                      index === 5 ||
                      index === 6 ||
                      index === 7 ||
                      index === 8 ||
                      index === 9) && (
                      <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-4xl w-full">
                        <h3 className="text-2xl font-bold mb-4 text-[#ffffff]">
                          ﬁlisierung
                        </h3>
                        <div className="w-full h-64 bg-gray-opacity-20 rounded-lg flex items-center justify-center">
                          {index === 1 && <ProcessComparisonChart />}
                          {index === 2 && <GitHubBoardExample />}
                          {index === 3 && <ComparisonTable />}
                          {index === 4 && <GanttChart />}
                          {index === 5 && <ArchitectureDiagram />}
                          {index === 6 && <SavingsChart />}
                          {index === 7 && <TestFlowDiagram />}
                          {index === 8 && <CostComparisonChart />}
                          {index === 9 && (
                            <div className="w-full space-y-4">
                              <CostComparisonChart />
                              <ROIChart />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-4xl w-full">
                      <h3 className="text-3xl font-bold mb-6 text-[#2D3748] border-b-4 border-[#EB5C37] pb-2 inline-block">
                        Weitere Details
                      </h3>
                      <div className="text-lg whitespace-pre-wrap text-gray-800 mt-6">
                        {slide.additionalContent ||
                          "Weitere Informationen folgen..."}
                      </div>
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

      {/* Navigation Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button
          onClick={() => verticalScroll(0)}
          onTouchStart={() => verticalScroll(0)}
          disabled={currentVerticalSlide === 0}
          className={`relative p-6 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-200 touch-manipulation ${
            currentVerticalSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "active:bg-white active:scale-110 hover:bg-white hover:scale-110"
          }`}
          aria-label="Nach oben"
        >
          <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-gray-800">
            O
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10 opacity-30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => horizontalScroll(currentSlide - 1)}
          onTouchStart={() => horizontalScroll(currentSlide - 1)}
          disabled={currentSlide === 0}
          className={`relative p-6 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-200 touch-manipulation ${
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "active:bg-white active:scale-110 hover:bg-white hover:scale-110"
          }`}
          aria-label="Vorherige Folie"
        >
          <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-gray-800">
            L
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10 opacity-30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => horizontalScroll(currentSlide + 1)}
          onTouchStart={() => horizontalScroll(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          className={`relative p-6 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-200 touch-manipulation ${
            currentSlide === slides.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "active:bg-white active:scale-110 hover:bg-white hover:scale-110"
          }`}
          aria-label="Nächste Folie"
        >
          <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-gray-800">
            R
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10 opacity-30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => verticalScroll(1)}
          onTouchStart={() => verticalScroll(1)}
          disabled={currentVerticalSlide === 1}
          className={`relative p-6 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-200 touch-manipulation ${
            currentVerticalSlide === 1
              ? "opacity-50 cursor-not-allowed"
              : "active:bg-white active:scale-110 hover:bg-white hover:scale-110"
          }`}
          aria-label="Nach unten"
        >
          <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-gray-800">
            U
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10 opacity-30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {session?.user && (
        <CommentSidebar
          currentSlide={currentSlide}
          comments={comments}
          mutateComments={mutateComments}
          userAvatar={session.user.image || ""}
          userName={session.user.name || ""}
          currentUserId={session.user.id || ""}
        />
      )}

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
