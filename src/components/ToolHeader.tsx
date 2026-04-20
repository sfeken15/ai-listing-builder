import { Logo } from "@/components/logos/Logo";
import { cx } from "@/utils/cx";

export function ToolHeader({ toolName, className = "" }: { toolName?: string; className?: string }) {
  return (
    <header className={cx("flex items-center justify-between px-8 py-5", className)}>
      <Logo variant="hologram" height={22} />
      {toolName && (
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)]">
          {toolName}
        </span>
      )}
    </header>
  );
}
