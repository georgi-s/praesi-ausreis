// "use client";

// import * as React from "react";
// import { animated, useSpringValue } from "@react-spring/web";
// import { useMousePosition } from "@/app/hooks/useMousePosition";
// import { useWindowResize } from "@/app/hooks/useWindowResize";
// import { useDock } from "@/app/components/Dock/DockContext";
// import { Card } from "@/app/components/Card/Card";

// const INITIAL_WIDTH = 48;

// interface DockCardProps {
//   children: React.ReactNode;
//   imageSrc?: string;
//   isActive?: boolean;
// }

// export function DockCard({
//   children,
//   imageSrc,
//   isActive = false,
// }: DockCardProps) {
//   const cardRef = React.useRef<HTMLDivElement>(null);
//   const [elCenterX, setElCenterX] = React.useState<number>(0);
//   const mousePosition = useMousePosition();
//   const dock = useDock();

//   const size = useSpringValue(INITIAL_WIDTH, {
//     config: {
//       mass: 0.1,
//       tension: 320,
//     },
//   });

//   const y = useSpringValue(-8, {
//     config: {
//       friction: 29,
//       tension: 238,
//     },
//   });

//   React.useEffect(() => {
//     if (cardRef.current) {
//       const { x } = cardRef.current.getBoundingClientRect();
//       setElCenterX(x + INITIAL_WIDTH / 2);
//     }
//   }, []);

//   useWindowResize(() => {
//     if (cardRef.current) {
//       const { x } = cardRef.current.getBoundingClientRect();
//       setElCenterX(x + INITIAL_WIDTH / 2);
//     }
//   });

//   React.useEffect(() => {
//     if (isActive) {
//       y.start(-26);
//     } else {
//       y.start(-8);
//     }
//   }, [isActive, y]);

//   React.useEffect(() => {
//     if (
//       dock.width > 0 &&
//       dock.hovered &&
//       typeof mousePosition.x === "number" &&
//       typeof elCenterX === "number"
//     ) {
//       const mouseX = mousePosition.x;
//       const transformedValue =
//         INITIAL_WIDTH +
//         36 *
//           Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 12;

//       size.start(transformedValue);
//     } else {
//       size.start(INITIAL_WIDTH);
//     }
//   }, [mousePosition.x, elCenterX, dock.width, dock.hovered, size]);

//   return (
//     <div className="flex flex-col items-center gap-1">
//       <animated.div
//         ref={cardRef}
//         className="
//           rounded-xl border border-white/10
//           bg-[#262626] p-0 m-0
//           transition-[filter,shadow] duration-200
//           hover:brightness-110 hover:saturate-100
//           saturate-90 brightness-90
//           shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20
//         "
//         style={{
//           width: size,
//           height: size,
//           y,
//         }}
//       >
//         {imageSrc ? <Card src={imageSrc} /> : children}
//       </animated.div>
//     </div>
//   );
// }
// ----------------------------------------------------------------------------
"use client";

import * as React from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { useMousePosition } from "@/app/hooks/useMousePosition";
import { useWindowResize } from "@/app/hooks/useWindowResize";
import { useDock } from "@/app/components/Dock/DockContext";
import { Card } from "@/app/components/Card/Card";

const INITIAL_WIDTH = 48; // Ursprüngliche Größe beibehalten

interface DockCardProps {
  children: React.ReactNode;
  imageSrc?: string;
  isActive?: boolean;
}

export function DockCard({
  children,
  imageSrc,
  isActive = false,
}: DockCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [elCenterX, setElCenterX] = React.useState<number>(0);
  const mousePosition = useMousePosition();
  const dock = useDock();

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320,
    },
  });

  const y = useSpringValue(-8, {
    config: {
      friction: 29,
      tension: 238,
    },
  });

  React.useEffect(() => {
    if (cardRef.current) {
      const { x } = cardRef.current.getBoundingClientRect();
      setElCenterX(x + INITIAL_WIDTH / 2);
    }
  }, []);

  useWindowResize(() => {
    if (cardRef.current) {
      const { x } = cardRef.current.getBoundingClientRect();
      setElCenterX(x + INITIAL_WIDTH / 2);
    }
  });

  React.useEffect(() => {
    if (isActive) {
      y.start(-32);
    } else {
      y.start(-8);
    }
  }, [isActive, y]);

  React.useEffect(() => {
    if (
      dock.width > 0 &&
      dock.hovered &&
      typeof mousePosition.x === "number" &&
      typeof elCenterX === "number"
    ) {
      const mouseX = mousePosition.x;
      const transformedValue =
        INITIAL_WIDTH +
        36 * // Ursprünglicher Wert beibehalten
          Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 12;

      size.start(transformedValue);
    } else {
      size.start(INITIAL_WIDTH);
    }
  }, [mousePosition.x, elCenterX, dock.width, dock.hovered, size]);

  return (
    <div className="flex flex-col items-center gap-1">
      <animated.div
        ref={cardRef}
        className="
          rounded-xl border border-white/10 
          bg-[#262626] p-0 m-0
          transition-[filter,shadow] duration-200
          hover:brightness-110 hover:saturate-100
          saturate-90 brightness-90
          shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20
          sm:text-base text-xs // Kleinere Schriftgröße nur für mobile Geräte
        "
        style={{
          width: size,
          height: size,
          y,
        }}
      >
        {imageSrc ? <Card src={imageSrc} /> : children}
      </animated.div>
    </div>
  );
}
// ----------------------------------------------------------------------------
