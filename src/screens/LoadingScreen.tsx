import { useState, useEffect, useRef } from "react";
import { Check } from "@/components/Icons";

const BUILD_STEPS = [
  "Researching your business",
  "Writing your description",
  "Filling in contact details",
  "Pulling your social links",
  "Creating your listing page",
  "Sending you a notification",
];

const TIMINGS = [1100, 1400, 1200, 1100, 1400, 1100];

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let i = 0;

    const tick = () => {
      if (i >= BUILD_STEPS.length) {
        timerRef.current = setTimeout(onDone, 500);
        return;
      }
      setActiveIdx(i);
      timerRef.current = setTimeout(() => {
        i += 1;
        setActiveIdx(i);
        tick();
      }, TIMINGS[i] ?? 1200);
    };

    setActiveIdx(0);
    timerRef.current = setTimeout(() => {
      i = 1;
      setActiveIdx(1);
      tick();
    }, TIMINGS[0]);

    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="loading-wrap">
      <div className="loading-card">
        <div className="loading-center">
          <div className="spinner" />
          <h1
            style={{
              margin: "0 0 10px",
              font: "500 32px/1.15 var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Building your listing…
          </h1>
          <p className="sub" style={{ margin: "0 auto" }}>
            This takes about 30 seconds. Don't close this window.
          </p>
        </div>

        <div className="step-list">
          {BUILD_STEPS.map((label, i) => {
            const state = i < activeIdx ? "done" : i === activeIdx ? "active" : "waiting";
            return (
              <div key={i} className={`step-row ${state}`}>
                <span className={`step-indicator ${state}`}>
                  {state === "done" && <Check />}
                </span>
                <span className="step-label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
