import { cx } from "@/utils/cx";

export function PageShell({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cx("min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] relative overflow-hidden", className)}>
      <div aria-hidden="true" className="fixed pointer-events-none z-0"
        style={{ width: 600, height: 600, borderRadius: "50%", background: "var(--graffiti-500)", filter: "blur(140px)", opacity: 0.06, top: -200, right: -100 }} />
      <div aria-hidden="true" className="fixed pointer-events-none z-0"
        style={{ width: 600, height: 600, borderRadius: "50%", background: "var(--blurple-600)", filter: "blur(140px)", opacity: 0.07, bottom: -200, left: -100 }} />
      <div className="relative z-10 flex flex-col flex-1">{children}</div>
    </div>
  );
}
