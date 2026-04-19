import { cx } from "@/utils/cx";

interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ label, selected = false, onClick, className = "" }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer select-none",
        selected
          ? "bg-[var(--tag-selected-bg)] text-[var(--tag-selected-text)] border-[var(--tag-selected-border)]"
          : "bg-[var(--tag-bg)] text-[var(--tag-text)] border-[var(--tag-border)] hover:border-[var(--border-strong)]",
        className,
      )}
    >
      {label}
    </button>
  );
}
