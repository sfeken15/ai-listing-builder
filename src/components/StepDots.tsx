interface StepDotsProps {
  step: number;
  total?: number;
}

export function StepDots({ step, total = 5 }: StepDotsProps) {
  return (
    <div className="steps-row">
      <div className="steps-inner">
        <h4>AI Brand Listing Builder</h4>
        <div className="steps">
          {Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const cls = n === step ? "active" : n < step ? "done" : "";
            return <span key={i} className={`step ${cls}`} />;
          })}
        </div>
      </div>
    </div>
  );
}
