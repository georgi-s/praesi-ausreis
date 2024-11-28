import { useSpring, animated } from "@react-spring/web";

interface NavigationCardProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavigationCard({
  title,
  isActive,
  onClick,
}: NavigationCardProps) {
  const spring = useSpring({
    scale: isActive ? 1.1 : 1,
    opacity: isActive ? 1 : 0.7,
    config: {
      tension: 300,
      friction: 20,
    },
  });

  return (
    <animated.button
      onClick={onClick}
      style={{
        ...spring,
        transformOrigin: "center",
      }}
      className="relative flex justify-center items-center overflow-hidden w-12 h-12 group"
    >
      {/* Blur-Effekt im Hintergrund */}
      <div
        className={`
          absolute inset-0 z-0 opacity-40 
          ${isActive ? "bg-white" : "bg-white/20"} 
          blur-xl transform translate-y-2 scale-125
        `}
      />

      {/* Hauptinhalt */}
      <div
        className={`
          relative z-10 flex items-center justify-center w-8 h-8 rounded-full
          ${isActive ? "bg-white text-black" : "bg-white/20 text-white"}
          transition-colors duration-200
          group-hover:bg-white group-hover:text-black
          text-sm font-medium
        `}
      >
        {title}
      </div>
    </animated.button>
  );
}
