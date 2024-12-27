"use client";

import * as React from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";
import { useWindowSize } from "react-use";
import { DockContext } from "@/app/components/Dock/DockContext";

interface DockProps {
  children: React.ReactNode;
}

export const DOCK_ZOOM_LIMIT = [-100, 50];

export function Dock({ children }: DockProps) {
  const [hovered, setHovered] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const isZooming = React.useRef(false);
  const dockRef = React.useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const setIsZooming = React.useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpringValue(1, {
    config: {
      mass: 0.1,
      tension: 320,
    },
    onChange: () => {
      if (dockRef.current) {
        setWidth(dockRef.current.clientWidth);
      }
    },
  });

  React.useEffect(() => {
    if (dockRef.current) {
      setWidth(dockRef.current.clientWidth);
    }
  }, [windowSize.width]);

  const handleMouseOver = React.useCallback(() => {
    if (!isZooming.current) {
      setHovered(true);
    }
  }, []);

  const handleMouseOut = React.useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        className="
          fixed right-3 top-1/2
          flex flex-col items-center h-auto w-[58px]
          py-2.5 px-1.5 gap-3
          bg-black/90 rounded-xl 
          will-change-contents box-content
          origin-right
          backdrop-blur-xl
          border border-white/10
          sm:max-h-none sm:overflow-visible
          max-h-[90vh] overflow-y-auto
        "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          y: "-50%",
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => clamp(0.5, 2, value)),
        }}
      >
        {children}
      </animated.div>
    </DockContext.Provider>
  );
}
