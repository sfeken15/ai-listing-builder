import { cx } from "@/utils/cx";

interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Tag({ label, selected = false, onClick, disabled = false, className = "" }: TagProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-pressed={selected}
      className={cx(
        "inline-flex items-center px-4 py-2 rounded-full",
        "text-sm font-medium transition-all duration-200 border outline-none cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        selected
          ? "bg-[var(--tag-bg-selected)] text-[var(--tag-text-selected)] border-[var(--tag-border-selected)]"
          : "bg-[var(--tag-bg)] text-[var(--tag-text)] border-[var(--tag-border)] hover:bg-[var(--tag-bg-hover)]",
        className
      )}>
      {label}
    </button>
  );
}
