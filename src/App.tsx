import { useState, useRef, useEffect } from "react";
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

const SCREEN_LABELS: Record<Screen, string> = {
  landing: "Landing",
  name: "Business Name",
  location: "Location",
  basics: "Basics",
  details: "Final Details",
  loading: "Loading",
  done: "Done",
};

interface AdminPanelProps {
  current: Screen;
  screenIdx: number;
  onJump: (i: number) => void;
  onReset: () => void;
}

function AdminPanel({ current, screenIdx, onJump, onReset }: AdminPanelProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={panelRef} style={{ position: "fixed", bottom: 80, right: 24, zIndex: 60 }}>
      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 10px)", right: 0,
          width: 220,
          background: "rgba(18,18,20,0.97)",
          border: "1px solid var(--border-default)",
          borderRadius: 14,
          padding: "14px 12px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          animation: "modal-in 160ms ease",
        }}>
          <p style={{
            margin: "0 0 10px 4px",
            font: "600 10px/1 var(--font-body)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}>
            QA — Jump to screen
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {SCREENS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => { onJump(i); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 8,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: s === current ? "rgba(21,183,158,0.12)" : "transparent",
                  color: s === current ? "var(--graffiti-300)" : "var(--text-secondary)",
                  font: `${s === current ? 600 : 500} 13px/1.2 var(--font-body)`,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 100ms, color 100ms",
                }}
                onMouseEnter={(e) => {
                  if (s !== current) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (s !== current) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span>
                  <span style={{ opacity: 0.45, marginRight: 6, fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {SCREEN_LABELS[s]}
                </span>
                {s === current && (
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--graffiti-500)", flexShrink: 0,
                  }} />
                )}
              </button>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 10, paddingTop: 10 }}>
            <button
              type="button"
              onClick={() => { onReset(); setOpen(false); }}
              style={{
                width: "100%", padding: "7px 10px", borderRadius: 8, border: "none",
                background: "transparent", color: "var(--text-tertiary)",
                font: "500 12px/1.2 var(--font-body)", cursor: "pointer", textAlign: "left",
              }}
            >
              ↺ Reset all data
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="QA Admin Panel"
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "8px 14px",
          borderRadius: 9999,
          border: open ? "1px solid var(--graffiti-500)" : "1px solid var(--border-strong)",
          background: open ? "rgba(21,183,158,0.12)" : "rgba(18,18,20,0.85)",
          color: open ? "var(--graffiti-300)" : "var(--text-tertiary)",
          font: "600 11.5px/1 var(--font-body)",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          transition: "all 150ms ease",
          letterSpacing: "0.04em",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="8" cy="8" r="2" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
        </svg>
        {open ? "Close" : `QA · ${String(screenIdx + 1).padStart(2, "0")}`}
      </button>
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
  function jumpTo(i: number) {
    setScreenIdx(i);
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

      <AdminPanel
        current={current}
        screenIdx={screenIdx}
        onJump={jumpTo}
        onReset={reset}
      />
    </div>
  );
}
