"use client";

import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

const DOCK_ZOOM_LIMIT = [-50, 50]; // Angepasste Zoom-Grenzen

export function DockDivider() {
  const [isZooming, setIsZooming] = useState(false);
  const [{ zoom }, api] = useSpring(() => ({
    zoom: 0,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, offset: [_ox, oy], cancel, direction: [_dx, dy] }) => {
        // Stoppe die Drag-Geste wenn außerhalb der Grenzen
        if (oy <= DOCK_ZOOM_LIMIT[0] && dy === -1) {
          cancel();
        } else if (oy >= DOCK_ZOOM_LIMIT[1] && dy === 1) {
          cancel();
        } else {
          api.start({
            zoom: oy,
            immediate: down,
          });
        }
      },
      onDragStart: () => setIsZooming(true),
      onDragEnd: () => setIsZooming(false),
    },
    {
      drag: {
        axis: "y",
      },
    }
  );

  return (
    <div {...bind()} className="h-full flex items-center px-1 cursor-ns-resize">
      <div className="w-px h-full rounded-[2px] bg-white/10" />
    </div>
  );
}
