import { Tag } from "@/components/Tag";

const featureGroups = [
  {
    label: "Interior",
    features: [
      "Open floor plan",
      "Hardwood floors",
      "Vaulted ceilings",
      "Fireplace",
      "Updated kitchen",
      "Granite countertops",
      "Stainless appliances",
      "Walk-in closet",
      "In-unit laundry",
      "Home office",
    ],
  },
  {
    label: "Exterior & Outdoor",
    features: [
      "Large backyard",
      "Covered porch",
      "Deck / Patio",
      "Fenced yard",
      "Swimming pool",
      "Hot tub",
      "Garden",
      "Workshop",
      "Storage shed",
      "EV charging",
    ],
  },
  {
    label: "Building & Systems",
    features: [
      "2-car garage",
      "New roof",
      "New HVAC",
      "Solar panels",
      "Smart home",
      "Security system",
      "Central air",
      "Basement",
      "Attic storage",
      "HOA community",
    ],
  },
  {
    label: "Location",
    features: [
      "Cul-de-sac",
      "Corner lot",
      "Waterfront",
      "Golf course",
      "Quiet street",
      "Near schools",
      "Near shopping",
      "Near parks",
      "Highway access",
      "Historic district",
    ],
  },
];

interface Step3Props {
  selected: Set<string>;
  onToggle: (feature: string) => void;
}

export function Step3Features({ selected, onToggle }: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
          Features & amenities
        </h2>
        <p className="text-[var(--text-secondary)] text-sm">
          Select all that apply — these highlights will appear prominently in your listing.
        </p>
      </div>

      <div className="space-y-5">
        {featureGroups.map((group) => (
          <div key={group.label} className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.features.map((feature) => (
                <Tag
                  key={feature}
                  label={feature}
                  selected={selected.has(feature)}
                  onClick={() => onToggle(feature)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected.size > 0 && (
        <p className="text-xs text-[var(--text-brand)]">
          {selected.size} feature{selected.size !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
