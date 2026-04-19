import { cx } from "@/utils/cx";

type BadgeVariant = "brand" | "accent" | "neutral" | "success" | "warning" | "error";

const variants: Record<BadgeVariant, string> = {
  brand: "bg-[var(--badge-brand-bg)] text-[var(--badge-brand-text)]",
  accent: "bg-[var(--badge-accent-bg)] text-[var(--badge-accent-text)]",
  neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]",
  success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
  warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
  error: "bg-[var(--badge-error-bg)] text-[var(--badge-error-text)]",
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variants[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
