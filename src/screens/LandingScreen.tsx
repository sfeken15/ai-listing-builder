import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "@/components/Icons";

const EXAMPLE_PROMPTS = [
  "We're a family-owned coffee shop in downtown Joplin.",
  "A vintage boutique focused on curated 70s and 80s denim.",
  "Licensed electricians doing residential work across Jasper County.",
  "A yoga studio with daily classes and a tea lounge out front.",
  "Wood-fired pizza by the slice, open late on weekends.",
];

function useTypewriterPlaceholder(examples: string[], active: boolean) {
  const [text, setText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!active) return;
    let i = 0;
    let j = 0;
    let dir = 1;

    const tick = () => {
      const full = examples[i];
      if (dir === 1) {
        j += 1;
        setText(full.slice(0, j));
        if (j >= full.length) {
          dir = -1;
          timerRef.current = setTimeout(tick, 1600);
          return;
        }
        timerRef.current = setTimeout(tick, 28 + Math.random() * 28);
      } else {
        j -= 1;
        setText(full.slice(0, j));
        if (j <= 0) {
          dir = 1;
          i = (i + 1) % examples.length;
          timerRef.current = setTimeout(tick, 280);
          return;
        }
        timerRef.current = setTimeout(tick, 14);
      }
    };

    timerRef.current = setTimeout(tick, 600);
    return () => clearTimeout(timerRef.current);
  }, [active, examples]);

  return text;
}

interface LandingScreenProps {
  pitch: string;
  onChange: (v: string) => void;
}

export function LandingScreen({ pitch, onChange }: LandingScreenProps) {
  const [focused, setFocused] = useState(false);
  const max = 160;
  const canSubmit = pitch.trim().length > 2;
  const animateExamples = pitch.length === 0 && !focused;
  const typed = useTypewriterPlaceholder(EXAMPLE_PROMPTS, animateExamples);

  return (
    <div className="screen screen-landing">
      <div className="screen-inner">
        <h1 className="display">
          Build your Explore Joplin<br />listing with AI.
        </h1>

        <p className="sub" style={{ marginTop: 20 }}>
          Answer a few questions. We'll write and build your listing automatically.
        </p>

        <div className={`hero-input ${canSubmit ? "active" : ""}`}>
          <div className="hero-inner">
            <input
              type="text"
              maxLength={max}
              value={pitch}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? "Tell us about your business…" : ""}
              autoFocus
              aria-label="Describe your business"
            />
            {animateExamples && (
              <div className="typed-placeholder" aria-hidden="true">
                <span className="tp-prefix">e.g. </span>
                <span className="tp-text">{typed}</span>
                <span className="tp-caret" />
              </div>
            )}
            <button className="submit" aria-label="Continue" type="button" disabled={!canSubmit}>
              <ArrowRight />
            </button>
          </div>
          <div className="char-count">{pitch.length} / {max}</div>
        </div>

        <p className="legal" style={{ marginTop: 40 }}>
          By submitting, you confirm you are the owner or have permission to create this listing.
          Submissions are subject to admin approval and must comply with our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Community Guidelines</a>.
        </p>
      </div>
    </div>
  );
}
