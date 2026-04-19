import { Card } from "@/components/Card";
import { cx } from "@/utils/cx";

const tones = [
  {
    id: "professional",
    label: "Professional",
    description: "Clean, factual, and market-focused",
    example: '"Meticulously maintained 3BR home situated in a sought-after neighborhood…"',
  },
  {
    id: "warm",
    label: "Warm & Inviting",
    description: "Friendly, lifestyle-driven, conversational",
    example: '"Imagine mornings on your sun-drenched porch with coffee in hand…"',
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Elevated, evocative, premium language",
    example: '"An architectural gem offering unrivaled craftsmanship and refined living…"',
  },
  {
    id: "concise",
    label: "Concise",
    description: "Short, punchy, easy to skim",
    example: '"Move-in ready. Great bones. Huge backyard. Won\'t last long."',
  },
];

const highlights = [
  "Value & price",
  "Location",
  "Natural light",
  "Outdoor space",
  "Recent upgrades",
  "School district",
  "Entertaining",
  "Quiet & private",
  "Investment potential",
  "Unique character",
];

interface Step4Data {
  tone: string;
  highlights: Set<string>;
  extraNotes: string;
}

interface Step4Props {
  data: Step4Data;
  onToneSelect: (id: string) => void;
  onHighlightToggle: (h: string) => void;
  onNotesChange: (v: string) => void;
}

export function Step4StyleTone({
  data,
  onToneSelect,
  onHighlightToggle,
  onNotesChange,
}: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
          Style & tone
        </h2>
        <p className="text-[var(--text-secondary)] text-sm">
          Shape how the AI writes your listing — pick a voice and what to emphasize.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
          Writing style
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {tones.map((tone) => (
            <Card
              key={tone.id}
              active={data.tone === tone.id}
              hoverable
              padding="md"
              onClick={() => onToneSelect(tone.id)}
              className={cx(
                "space-y-1",
                data.tone === tone.id && "ring-1 ring-[var(--card-active-border)]",
              )}
            >
              <div className="flex items-center justify-between">
                <p
                  className={cx(
                    "text-sm font-semibold",
                    data.tone === tone.id
                      ? "text-[var(--text-brand)]"
                      : "text-[var(--text-primary)]",
                  )}
                >
                  {tone.label}
                </p>
                {data.tone === tone.id && (
                  <div className="w-2 h-2 rounded-full bg-[var(--graffiti-500)]" />
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{tone.description}</p>
              <p className="text-xs text-[var(--text-tertiary)] italic leading-relaxed">
                {tone.example}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
          Key highlights to emphasize
        </p>
        <div className="flex flex-wrap gap-2">
          {highlights.map((h) => {
            const isSelected = data.highlights.has(h);
            return (
              <button
                key={h}
                type="button"
                onClick={() => onHighlightToggle(h)}
                className={cx(
                  "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer select-none",
                  isSelected
                    ? "bg-[var(--tag-selected-bg)] text-[var(--tag-selected-text)] border-[var(--tag-selected-border)]"
                    : "bg-[var(--tag-bg)] text-[var(--tag-text)] border-[var(--tag-border)] hover:border-[var(--border-strong)]",
                )}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="extra-notes"
          className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]"
        >
          Additional notes for the AI{" "}
          <span className="normal-case font-normal text-[var(--text-tertiary)] tracking-normal">
            (optional)
          </span>
        </label>
        <textarea
          id="extra-notes"
          rows={3}
          value={data.extraNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Mention anything specific: seller motivation, recent renovations, neighborhood gems, or anything else that makes this property special…"
          className="w-full px-4 py-3 rounded-[var(--input-radius)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] text-sm transition-all duration-200 outline-none focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}

export type { Step4Data };
