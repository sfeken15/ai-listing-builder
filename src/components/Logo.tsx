interface LogoProps {
  variant?: "hologram" | "white" | "black";
  height?: number;
  className?: string;
}

export function Logo({ variant = "hologram", height = 24, className }: LogoProps) {
  const width = height * 6.77;

  if (variant === "white") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 420 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Explore Joplin"
        role="img"
        className={className}
      >
        <text
          x="0"
          y="50"
          fontFamily="General Sans, system-ui, sans-serif"
          fontWeight="600"
          fontSize="52"
          fill="#ffffff"
          letterSpacing="-1"
        >
          Explore Joplin
        </text>
      </svg>
    );
  }

  if (variant === "black") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 420 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Explore Joplin"
        role="img"
        className={className}
      >
        <text
          x="0"
          y="50"
          fontFamily="General Sans, system-ui, sans-serif"
          fontWeight="600"
          fontSize="52"
          fill="#000000"
          letterSpacing="-1"
        >
          Explore Joplin
        </text>
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 420 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Explore Joplin"
      role="img"
      className={className}
    >
      <defs>
        <linearGradient id="hologram" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="25%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="75%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="50"
        fontFamily="General Sans, system-ui, sans-serif"
        fontWeight="600"
        fontSize="52"
        fill="url(#hologram)"
        letterSpacing="-1"
      >
        Explore Joplin
      </text>
    </svg>
  );
}

export default Logo;
