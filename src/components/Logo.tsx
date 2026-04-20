interface LogoProps {
  className?: string;
}

export function Logo({ className = "logo" }: LogoProps) {
  return <img src="/logo-hologram.svg" alt="Explore Joplin" className={className} />;
}

export default Logo;
