import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ArrowRight, ArrowLeft } from "@/components/Icons";
import { LandingScreen } from "@/screens/LandingScreen";
import { NameScreen } from "@/screens/NameScreen";
import { LocationScreen } from "@/screens/LocationScreen";
import { BasicsScreen } from "@/screens/BasicsScreen";
import { DetailsScreen } from "@/screens/DetailsScreen";
import { LoadingScreen } from "@/screens/LoadingScreen";
import { DoneScreen } from "@/screens/DoneScreen";

type Screen = "landing" | "name" | "location" | "basics" | "details" | "loading" | "done";
const SCREENS: Screen[] = ["landing", "name", "location", "basics", "details", "loading", "done"];

interface AppData {
  pitch: string;
  name: string;
  address: string;
  addressParts?: {
    country: string;
    street: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  };
  precise: boolean;
  category: string;
  website: string;
  description: string;
}

const INITIAL_DATA: AppData = {
  pitch: "",
  name: "",
  address: "",
  precise: false,
  category: "",
  website: "",
  description: "",
};

function Topbar({ onBack }: { onBack: () => void }) {
  return (
    <header className="topbar">
      <Logo />
      <div>
        <button className="back-pill" type="button" onClick={onBack}>
          Back to dashboard
        </button>
      </div>
    </header>
  );
}

interface FloatingCTAProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
  accent?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

function FloatingCTA({ onClick, disabled, label, accent, showBack, onBack }: FloatingCTAProps) {
  return (
    <div className="floating-cta">
      <span className="footer-legal">
        © 2026 Explore Joplin. Made with ♥ in Joplin for Joplin.
      </span>
      <div className="footer-actions">
        {showBack && onBack && (
          <button className="cta-back" type="button" onClick={onBack}>
            <ArrowLeft />
            Back
          </button>
        )}
        <button
          className={`cta-btn ${accent ? "accent" : ""}`}
          type="button"
          onClick={onClick}
          disabled={disabled}
        >
          {label}
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [data, setData] = useState<AppData>(INITIAL_DATA);

  const current = SCREENS[screenIdx];

  function next() {
    setScreenIdx((i) => Math.min(i + 1, SCREENS.length - 1));
  }
  function back() {
    setScreenIdx((i) => Math.max(i - 1, 0));
  }
  function reset() {
    setScreenIdx(0);
    setData(INITIAL_DATA);
  }

  function updateData(patch: Partial<AppData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  const ctaConfig = (() => {
    switch (current) {
      case "landing":
        return {
          visible: true,
          label: "Continue",
          disabled: !(data.pitch && data.pitch.trim().length > 2),
          accent: false,
          showBack: false,
        };
      case "name":
        return {
          visible: true,
          label: "Continue",
          disabled: !(data.name && data.name.trim().length > 1),
          accent: false,
          showBack: true,
        };
      case "location":
        return {
          visible: true,
          label: "Continue",
          disabled: !(data.address && data.address.trim().length > 3),
          accent: false,
          showBack: true,
        };
      case "basics":
        return {
          visible: true,
          label: "Continue",
          disabled: !data.category,
          accent: false,
          showBack: true,
        };
      case "details":
        return {
          visible: true,
          label: "Build my listing",
          disabled: !(data.description && data.description.trim().length > 20),
          accent: true,
          showBack: true,
        };
      case "loading":
        return {
          visible: true,
          label: "Building…",
          disabled: true,
          accent: false,
          showBack: false,
        };
      case "done":
        return {
          visible: true,
          label: "Go to my dashboard",
          disabled: false,
          accent: false,
          showBack: false,
        };
      default:
        return { visible: false, label: "", disabled: true, accent: false, showBack: false };
    }
  })();

  const screenKey = current;

  return (
    <div className="app">
      <div className="bg-glow" />
      <Topbar onBack={reset} />

      <div key={screenKey} className="screen-enter screen-enter-active">
        {current === "landing" && (
          <LandingScreen pitch={data.pitch} onChange={(v) => updateData({ pitch: v })} />
        )}
        {current === "name" && (
          <NameScreen name={data.name} onChange={(v) => updateData({ name: v })} />
        )}
        {current === "location" && (
          <LocationScreen
            data={{ address: data.address, addressParts: data.addressParts, precise: data.precise }}
            onUpdate={(patch) => updateData(patch as Partial<AppData>)}
          />
        )}
        {current === "basics" && (
          <BasicsScreen
            category={data.category}
            website={data.website}
            onCategoryChange={(v) => updateData({ category: v })}
            onWebsiteChange={(v) => updateData({ website: v })}
          />
        )}
        {current === "details" && (
          <DetailsScreen
            description={data.description}
            onChange={(v) => updateData({ description: v })}
          />
        )}
        {current === "loading" && <LoadingScreen onDone={next} />}
        {current === "done" && <DoneScreen />}
      </div>

      {ctaConfig.visible && (
        <FloatingCTA
          onClick={current === "done" ? reset : next}
          disabled={ctaConfig.disabled}
          label={ctaConfig.label}
          accent={ctaConfig.accent}
          showBack={ctaConfig.showBack}
          onBack={back}
        />
      )}
    </div>
  );
}
