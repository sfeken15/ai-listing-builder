import { cx } from "@/utils/cx";

export function StepDots({ total = 4, current = 1, className = "" }: { total?: number; current?: number; className?: string }) {
  return (
    <div className={cx("flex items-center gap-2", className)}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={step} className={cx(
            "rounded-full transition-all duration-300",
            isActive ? "w-5 h-1.5 bg-[var(--step-bg-active)]"
              : isDone ? "w-1.5 h-1.5 bg-[var(--step-bg-done)]"
              : "w-1.5 h-1.5 bg-[var(--step-bg)]"
          )} />
        );
      })}
    </div>
  );
}
