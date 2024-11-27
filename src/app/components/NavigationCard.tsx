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
      className={`
        px-3 py-1.5 rounded-lg text-sm font-medium
        ${isActive ? "bg-white text-black shadow-lg" : "bg-white/20 text-white"}
        transition-colors duration-200
        hover:bg-white hover:text-black
      `}
      aria-pressed={isActive}
    >
      {title}
    </animated.button>
  );
}
