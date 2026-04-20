import { cx } from "@/utils/cx";

export function ToolFooter({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <footer className={cx("flex items-center justify-between px-8 py-5", className)}>
      {children}
    </footer>
  );
}
