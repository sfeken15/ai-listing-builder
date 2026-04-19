import { Card } from "@/components/Card";
import { cx } from "@/utils/cx";

const propertyTypes = [
  {
    id: "single-family",
    label: "Single-Family Home",
    icon: "🏠",
    description: "Detached residential dwelling",
  },
  {
    id: "condo",
    label: "Condo / Apartment",
    icon: "🏢",
    description: "Unit in a multi-unit building",
  },
  {
    id: "townhouse",
    label: "Townhouse",
    icon: "🏘️",
    description: "Multi-floor attached home",
  },
  {
    id: "multi-family",
    label: "Multi-Family",
    icon: "🏗️",
    description: "Duplex, triplex, or fourplex",
  },
  {
    id: "land",
    label: "Land / Lot",
    icon: "🌿",
    description: "Vacant land or buildable lot",
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: "🏪",
    description: "Office, retail, or industrial",
  },
];

interface Step1Props {
  selected: string;
  onSelect: (id: string) => void;
}

export function Step1PropertyType({ selected, onSelect }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
          What type of property?
        </h2>
        <p className="text-[var(--text-secondary)] text-sm">
          Select the property type to tailor your AI-generated listing.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {propertyTypes.map((type) => (
          <Card
            key={type.id}
            active={selected === type.id}
            hoverable
            padding="md"
            onClick={() => onSelect(type.id)}
            className={cx(
              "flex flex-col gap-2",
              selected === type.id && "ring-1 ring-[var(--card-active-border)]",
            )}
          >
            <span className="text-2xl leading-none">{type.icon}</span>
            <div>
              <p
                className={cx(
                  "text-sm font-semibold leading-tight",
                  selected === type.id
                    ? "text-[var(--text-brand)]"
                    : "text-[var(--text-primary)]",
                )}
              >
                {type.label}
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{type.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
