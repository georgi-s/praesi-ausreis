// "use client";

// import * as React from "react";
// import { SpringValue } from "@react-spring/web";

// interface DockContextType {
//   width: number;
//   hovered: boolean;
//   setIsZooming: (value: boolean) => void;
//   zoomLevel: SpringValue<number>;
// }

// export const DockContext = React.createContext<DockContextType>({
//   width: 0,
//   hovered: false,
//   setIsZooming: () => {},
//   zoomLevel: new SpringValue(1),
// });

// export function useDock() {
//   return React.useContext(DockContext);
// }
"use client";

import * as React from "react";
import { SpringValue } from "@react-spring/web";

interface DockContextType {
  width: number;
  hovered: boolean;
  setIsZooming: (value: boolean) => void;
  zoomLevel: SpringValue<number>;
}

export const DockContext = React.createContext<DockContextType>({
  width: 0,
  hovered: false,
  setIsZooming: () => {},
  zoomLevel: new SpringValue(1),
});

export function useDock() {
  return React.useContext(DockContext);
}
