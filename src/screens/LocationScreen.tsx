import { useState, useEffect } from "react";
import { StepDots } from "@/components/StepDots";
import { MapPin, Close } from "@/components/Icons";

interface AddressParts {
  country: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
}

interface LocationData {
  address?: string;
  addressParts?: AddressParts;
  precise?: boolean;
}

interface LocationScreenProps {
  data: LocationData;
  onUpdate: (data: Partial<LocationData>) => void;
}

function composeAddress(p: AddressParts): string {
  const line1 = [p.street, p.apt].filter(Boolean).join(", ");
  const line2 = [p.city, p.state].filter(Boolean).join(", ");
  return [line1, line2, p.zip].filter(Boolean).join(", ");
}

function AddrField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = `addr-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="addr-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""}
      />
    </div>
  );
}

function MapIllustration({ precise }: { precise: boolean }) {
  return (
    <svg
      className="map-svg"
      viewBox="0 0 560 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="areaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(21,183,158,0.35)" />
          <stop offset="60%" stopColor="rgba(21,183,158,0.15)" />
          <stop offset="100%" stopColor="rgba(21,183,158,0)" />
        </radialGradient>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="320" fill="#0f1012" />
      <rect width="560" height="320" fill="url(#grid)" />
      {/* River */}
      <path
        d="M-20 230 Q 100 210 180 240 T 380 220 T 600 250"
        fill="none"
        stroke="#1e3a5a"
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M-20 230 Q 100 210 180 240 T 380 220 T 600 250"
        fill="none"
        stroke="#2563a5"
        strokeWidth="2"
        opacity="0.5"
      />
      {/* Highways */}
      <path
        d="M-10 100 L 180 130 L 300 90 L 500 140 L 600 120"
        fill="none"
        stroke="#3a3f48"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M-10 100 L 180 130 L 300 90 L 500 140 L 600 120"
        fill="none"
        stroke="#5b6270"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      {/* Grid streets */}
      <path d="M80 -10 L 100 330" stroke="#2a2d33" strokeWidth="4" />
      <path d="M220 -10 L 250 330" stroke="#2a2d33" strokeWidth="4" />
      <path d="M380 -10 L 410 330" stroke="#2a2d33" strokeWidth="4" />
      <path d="M490 -10 L 520 330" stroke="#2a2d33" strokeWidth="4" />
      <path d="M-10 60 L 600 70" stroke="#2a2d33" strokeWidth="3" />
      <path d="M-10 175 L 600 185" stroke="#2a2d33" strokeWidth="3" />
      <path d="M-10 280 L 600 285" stroke="#2a2d33" strokeWidth="3" />
      {/* Parks */}
      <rect x="110" y="200" width="90" height="60" rx="6" fill="#0f3020" opacity="0.7" />
      <rect x="420" y="40" width="70" height="50" rx="6" fill="#0f3020" opacity="0.7" />
      {/* Buildings */}
      <g opacity="0.35">
        <rect x="260" y="150" width="28" height="20" fill="#1f242c" />
        <rect x="300" y="150" width="32" height="20" fill="#1f242c" />
        <rect x="260" y="195" width="28" height="18" fill="#1f242c" />
        <rect x="300" y="195" width="32" height="18" fill="#1f242c" />
      </g>
      {/* Location indicator */}
      {precise ? (
        <g>
          <circle cx="290" cy="170" r="18" fill="rgba(21,183,158,0.18)" />
          <circle cx="290" cy="170" r="10" fill="#15B79E" stroke="#0a0a0c" strokeWidth="3" />
        </g>
      ) : (
        <g>
          <circle cx="290" cy="170" r="90" fill="url(#areaGlow)" />
          <circle
            cx="290"
            cy="170"
            r="90"
            fill="none"
            stroke="rgba(21,183,158,0.35)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
        </g>
      )}
      <text
        x="150"
        y="155"
        fill="#8b95a3"
        fontFamily="var(--font-display)"
        fontSize="16"
        fontWeight="500"
        letterSpacing="-0.02em"
      >
        Joplin
      </text>
    </svg>
  );
}

export function LocationScreen({ data, onUpdate }: LocationScreenProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [precise, setPrecise] = useState(data.precise ?? false);
  const [parts, setParts] = useState<AddressParts>(
    data.addressParts || {
      country: "United States — US",
      street: "",
      apt: "",
      city: "Joplin",
      state: "MO",
      zip: "",
    },
  );

  useEffect(() => {
    onUpdate({ precise });
  }, [precise]); // eslint-disable-line react-hooks/exhaustive-deps

  function saveAddress() {
    const full = composeAddress(parts);
    onUpdate({ address: full, addressParts: parts, precise });
    setModalOpen(false);
  }

  const hasAddress = Boolean(data.address && data.address.trim().length > 3);

  return (
    <div className="screen">
      <div className="steps-row">
        <div className="steps-inner">
          <h4>AI Brand Listing Builder</h4>
          <StepDots total={5} current={3} />
        </div>
      </div>
      <div className="screen-inner">
        <h1 className="heading">Where is your business located?</h1>
        <p className="sub">
          We only show your approximate location publicly until your listing is approved. Customers
          see the exact address after.
        </p>

        <div className="map-card" style={{ marginTop: 40 }}>
          <button
            className={`map-address ${hasAddress ? "filled" : ""}`}
            onClick={() => setModalOpen(true)}
            type="button"
            aria-label="Edit address"
          >
            <MapPin className="pin" />
            <span className="map-address-text">
              {hasAddress ? data.address : "Enter your business address"}
            </span>
            <span className="map-address-edit">Edit</span>
          </button>

          <MapIllustration precise={precise} />

          <div className="precise-row">
            <div className="precise-text">
              <div className="precise-title">Show precise location</div>
              <div className="precise-help">
                Let customers see your exact address on the public map.{" "}
                <a href="#">Learn more</a>
              </div>
            </div>
            <button
              className={`toggle ${precise ? "on" : ""}`}
              type="button"
              onClick={() => setPrecise(!precise)}
              role="switch"
              aria-checked={precise}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-scrim" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <Close />
            </button>
            <h2 className="modal-title">Confirm your address</h2>

            <div className="modal-fields">
              <AddrField
                label="Country / region"
                value={parts.country}
                onChange={(v) => setParts({ ...parts, country: v })}
              />
              <AddrField
                label="Street address"
                value={parts.street}
                onChange={(v) => setParts({ ...parts, street: v })}
                placeholder="402 S Main St"
              />
              <AddrField
                label="Apt, suite, unit (if applicable)"
                value={parts.apt}
                onChange={(v) => setParts({ ...parts, apt: v })}
              />
              <AddrField
                label="City / town"
                value={parts.city}
                onChange={(v) => setParts({ ...parts, city: v })}
              />
              <AddrField
                label="State / territory"
                value={parts.state}
                onChange={(v) => setParts({ ...parts, state: v })}
              />
              <AddrField
                label="ZIP code"
                value={parts.zip}
                onChange={(v) => setParts({ ...parts, zip: v })}
                placeholder="64801"
              />
            </div>

            <button
              className="modal-submit"
              type="button"
              onClick={saveAddress}
              disabled={!parts.street || !parts.city}
            >
              Save address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
