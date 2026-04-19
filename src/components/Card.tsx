import { cx } from "@/utils/cx";

type CardPadding = "sm" | "md" | "lg" | "xl" | "none";

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
  xl: "p-8",
};

interface CardProps {
  active?: boolean;
  hoverable?: boolean;
  padding?: CardPadding;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function Card({
  active = false,
  hoverable = false,
  padding = "md",
  className = "",
  children,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cx(
        "rounded-[var(--card-radius)] border transition-all duration-200",
        active
          ? "bg-[var(--card-active-bg)] border-[var(--card-active-border)]"
          : "bg-[var(--card-bg)] border-[var(--card-border)]",
        hoverable && "hover:bg-[var(--card-bg-hover)] hover:border-[var(--border-strong)]",
        onClick && "cursor-pointer",
        paddings[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
