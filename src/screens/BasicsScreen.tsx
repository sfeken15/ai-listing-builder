import { StepDots } from "@/components/StepDots";
import { Tag } from "@/components/Tag";
import { Input } from "@/components/Input";

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
      <div className="steps-row">
        <div className="steps-inner">
          <h4>AI Brand Listing Builder</h4>
          <StepDots total={5} current={4} />
        </div>
      </div>
      <div className="screen-inner">
        <h1 className="heading">A few more details.</h1>
        <p className="sub">What category fits best, and do you have a website?</p>

        <div style={{ marginTop: 56 }}>
          <div className="field">
            <label className="field-label">What category fits best?</label>
            <div className="pill-group">
              {CATEGORIES.map((c) => (
                <Tag
                  key={c}
                  label={c}
                  selected={category === c}
                  onClick={() => onCategoryChange(c)}
                />
              ))}
            </div>
          </div>

          <div className="field">
            <Input
              label="Do you have a website?"
              type="url"
              value={website}
              onChange={(v) => onWebsiteChange(v)}
              placeholder="https://"
              hint="We'll use your site to fill in hours, phone, and social links automatically. No website? Leave this blank."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
