import { StepDots } from "@/components/StepDots";

interface NameScreenProps {
  name: string;
  onChange: (v: string) => void;
}

export function NameScreen({ name, onChange }: NameScreenProps) {
  return (
    <div className="screen">
      <StepDots step={2} />
      <div className="screen-inner" style={{ paddingTop: 24 }}>
        <h1 className="heading">What's your business called?</h1>
        <p className="sub">This becomes the primary name on your Explore Joplin listing.</p>

        <div style={{ marginTop: 56 }}>
          <input
            className="big-input"
            type="text"
            value={name}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. Joplin Coffee Co."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
