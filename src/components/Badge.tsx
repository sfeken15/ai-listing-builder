import { cx } from "@/utils/cx";

type BadgeVariant = "brand" | "accent" | "neutral" | "success" | "warning" | "error";

const variants: Record<BadgeVariant, string> = {
  brand:   "bg-[var(--badge-brand-bg)] text-[var(--badge-brand-text)]",
  accent:  "bg-[var(--badge-accent-bg)] text-[var(--badge-accent-text)]",
  neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]",
  success: "bg-[var(--color-success-subtle)] text-[var(--color-success-text)]",
  warning: "bg-[var(--color-warning-subtle)] text-[var(--color-warning-text)]",
  error:   "bg-[var(--color-error-subtle)] text-[var(--color-error-text)]",
};

export function Badge({ label, variant = "neutral", className = "" }: { label: string; variant?: BadgeVariant; className?: string }) {
  return (
    <span className={cx("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide", variants[variant], className)}>
      {label}
    </span>
  );
}
