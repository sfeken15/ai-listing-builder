import { StepDots } from "@/components/StepDots";

const CATEGORIES = [
  "Food & Drink",
  "Retail & Boutique",
  "Health & Wellness",
  "Beauty & Personal Care",
  "Home & Trade Services",
  "Creative & Studio",
  "Professional Services",
  "Events & Entertainment",
  "Fitness & Movement",
  "Other",
];

interface BasicsScreenProps {
  category: string;
  website: string;
  onCategoryChange: (v: string) => void;
  onWebsiteChange: (v: string) => void;
}

export function BasicsScreen({
  category,
  website,
  onCategoryChange,
  onWebsiteChange,
}: BasicsScreenProps) {
  return (
    <div className="screen">
      <StepDots step={4} />
      <div className="screen-inner">
        <h1 className="heading">A few more details.</h1>
        <p className="sub">What category fits best, and do you have a website?</p>

        <div style={{ marginTop: 56 }}>
          <div className="field">
            <label className="field-label">What category fits best?</label>
            <div className="pill-group">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`pill ${category === c ? "selected" : ""}`}
                  onClick={() => onCategoryChange(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="website">
              Do you have a website?
            </label>
            <input
              id="website"
              className="text-input"
              type="url"
              value={website}
              onChange={(e) => onWebsiteChange(e.target.value)}
              placeholder="https://"
            />
            <span className="field-help">
              We'll use your site to fill in hours, phone, and social links automatically. No
              website? Leave this blank.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
