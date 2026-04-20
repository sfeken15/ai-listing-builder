import { Check } from "@/components/Icons";

const DONE_ITEMS = [
  "Description written",
  "Category and tags assigned",
  "Contact info filled",
  "Social links added",
  "Listing page created",
  "Notification sent",
  "Confirmation email sent",
];

export function DoneScreen() {
  return (
    <div className="done-wrap">
      <div className="done-card">
        <div className="done-check">
          <Check />
        </div>
        <h1
          style={{
            margin: "0 0 12px",
            font: "500 44px/1.1 var(--font-display)",
            letterSpacing: "-0.025em",
          }}
        >
          Your listing is ready.
        </h1>
        <p className="sub" style={{ margin: "0 auto", maxWidth: 460 }}>
          Check your notifications on Explore Joplin to review your listing. You can add photos and
          edit anything from your dashboard.
        </p>

        <div className="done-summary">
          {DONE_ITEMS.map((t) => (
            <div key={t} className="summary-row">
              <span className="summary-check">
                <Check />
              </span>
              <span className="summary-text">{t}</span>
            </div>
          ))}
        </div>

        <p className="done-note">You can also close this window.</p>
      </div>
    </div>
  );
}
