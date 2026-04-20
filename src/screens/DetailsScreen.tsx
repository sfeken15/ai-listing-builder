import { StepDots } from "@/components/StepDots";
import { TextArea } from "@/components/Textarea";

interface DetailsScreenProps {
  description: string;
  onChange: (v: string) => void;
}

export function DetailsScreen({ description, onChange }: DetailsScreenProps) {
  const max = 500;

  return (
    <div className="screen">
      <div className="steps-row">
        <div className="steps-inner">
          <h4>AI Brand Listing Builder</h4>
          <StepDots total={5} current={5} />
        </div>
      </div>
      <div className="screen-inner">
        <h1 className="heading">What makes you worth visiting?</h1>
        <p className="sub">
          In your own words. AI will expand this into your full listing description.
        </p>

        <div style={{ marginTop: 48 }}>
          <div className="textarea-wrap">
            <TextArea
              maxLength={max}
              value={description}
              onChange={(v) => onChange(v)}
              placeholder="We're a family-owned coffee shop focused on specialty drinks and a relaxed neighborhood vibe. Our beans are roasted weekly, our pastries come from the bakery next door, and we host an open-mic every Thursday…"
              rows={6}
            />
            <div className="textarea-count">
              {description.length} / {max}
            </div>
          </div>

          <p className="legal" style={{ marginTop: 28 }}>
            By submitting, you agree to the Explore Joplin <a href="#">listing terms</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
