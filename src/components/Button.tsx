import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "accent"
  | "destructive"
  | "destructive-outline"
  | "destructive-ghost"
  | "destructive-link";

type ButtonSize = "sm" | "md" | "lg" | "xl";

const variants: Record<ButtonVariant, string> = {
  primary:            "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-bg-hover)]",
  secondary:          "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-bg-hover)]",
  ghost:              "bg-[var(--btn-ghost-bg)] text-[var(--btn-ghost-text)] border border-[var(--btn-ghost-border)] hover:bg-[var(--btn-ghost-bg-hover)]",
  accent:             "bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)] hover:bg-[var(--btn-accent-bg-hover)]",
  destructive:        "bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)] hover:bg-[var(--btn-destructive-bg-hover)]",
  "destructive-outline": "bg-[var(--btn-destructive-outline-bg)] text-[var(--btn-destructive-outline-text)] border border-[var(--btn-destructive-outline-border)] hover:bg-[var(--btn-destructive-outline-bg-hover)]",
  "destructive-ghost":   "bg-[var(--btn-destructive-ghost-bg)] text-[var(--btn-destructive-ghost-text)] hover:bg-[var(--btn-destructive-ghost-bg-hover)]",
  "destructive-link":    "bg-transparent text-[var(--btn-destructive-link-text)] hover:text-[var(--btn-destructive-link-text-hover)] underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm:  "px-4 py-2 text-sm",
  md:  "px-6 py-3 text-sm",
  lg:  "px-7 py-3.5 text-base",
  xl:  "px-8 py-4 text-base",
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      isDisabled={disabled}
      className={cx(
        "inline-flex items-center justify-center gap-2",
        "rounded-xl font-semibold transition-all duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2",
        "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
