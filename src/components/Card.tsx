import { cx } from "@/utils/cx";

interface CardProps {
  active?: boolean;
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const paddings = { sm: "p-4", md: "p-5", lg: "p-6", xl: "p-7" };

export function Card({ active = false, hoverable = true, padding = "md", className = "", children, onClick }: CardProps) {
  return (
    <div onClick={onClick}
      className={cx(
        "rounded-2xl border transition-all duration-200",
        paddings[padding],
        active
          ? "bg-[var(--card-bg-hover)] border-[var(--card-border-active)]"
          : "bg-[var(--card-bg)] border-[var(--card-border)]",
        hoverable && !active && "hover:bg-[var(--card-bg-hover)] hover:border-[var(--border-strong)]",
        onClick && "cursor-pointer",
        className
      )}>
      {children}
    </div>
  );
}
