import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ToolHeader } from "@/components/ToolHeader";
import { ToolFooter } from "@/components/ToolFooter";
import { Button } from "@/components/Button";
import { StepDots } from "@/components/StepDots";
import { Step1PropertyType } from "@/steps/Step1PropertyType";
import { Step2PropertyDetails } from "@/steps/Step2PropertyDetails";
import { Step3Features } from "@/steps/Step3Features";
import { Step4StyleTone } from "@/steps/Step4StyleTone";
import { Step5Generate } from "@/steps/Step5Generate";
import type { PropertyDetails } from "@/steps/Step2PropertyDetails";
import type { Step4Data } from "@/steps/Step4StyleTone";

const TOTAL_STEPS = 5;

const stepMeta = [
  { label: "Property type", short: "Type" },
  { label: "Property details", short: "Details" },
  { label: "Features", short: "Features" },
  { label: "Style & tone", short: "Style" },
  { label: "Generate listing", short: "Generate" },
];

export default function App() {
  const [step, setStep] = useState(1);

  const [propertyType, setPropertyType] = useState("");

  const [details, setDetails] = useState<PropertyDetails>({
    address: "",
    city: "",
    state: "",
    zip: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    listingPrice: "",
  });

  const [features, setFeatures] = useState<Set<string>>(new Set());

  const [styleData, setStyleData] = useState<Step4Data>({
    tone: "professional",
    highlights: new Set(),
    extraNotes: "",
  });

  function handleDetailChange(field: keyof PropertyDetails, value: string) {
    setDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handleFeatureToggle(feature: string) {
    setFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(feature)) {
        next.delete(feature);
      } else {
        next.add(feature);
      }
      return next;
    });
  }

  function handleHighlightToggle(h: string) {
    setStyleData((prev) => {
      const next = new Set(prev.highlights);
      if (next.has(h)) {
        next.delete(h);
      } else {
        next.add(h);
      }
      return { ...prev, highlights: next };
    });
  }

  function canAdvance() {
    if (step === 1) return Boolean(propertyType);
    if (step === 2) return Boolean(details.address && details.city && details.listingPrice);
    if (step === 3) return true;
    if (step === 4) return Boolean(styleData.tone);
    return false;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) setStep(step + 1);
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <PageShell>
      <ToolHeader toolName="AI Listing Builder" />

      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-4">
        <div className="w-full max-w-2xl flex flex-col gap-0">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <StepDots total={TOTAL_STEPS} current={step} />
              <span className="text-xs text-[var(--text-tertiary)] font-medium">
                Step {step} of {TOTAL_STEPS}
              </span>
            </div>
            <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-widest">
              {stepMeta[step - 1].short}
            </span>
          </div>

          {/* Step content */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 sm:p-8">
            {step === 1 && (
              <Step1PropertyType selected={propertyType} onSelect={setPropertyType} />
            )}
            {step === 2 && (
              <Step2PropertyDetails details={details} onChange={handleDetailChange} />
            )}
            {step === 3 && (
              <Step3Features selected={features} onToggle={handleFeatureToggle} />
            )}
            {step === 4 && (
              <Step4StyleTone
                data={styleData}
                onToneSelect={(tone) => setStyleData((p) => ({ ...p, tone }))}
                onHighlightToggle={handleHighlightToggle}
                onNotesChange={(v) => setStyleData((p) => ({ ...p, extraNotes: v }))}
              />
            )}
            {step === 5 && (
              <Step5Generate
                propertyType={propertyType}
                details={details}
                features={features}
                styleData={styleData}
              />
            )}
          </div>
        </div>
      </main>

      <ToolFooter>
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            disabled={step === 1}
          >
            ← Back
          </Button>

          <div className="flex items-center gap-3">
            {step < TOTAL_STEPS ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={!canAdvance()}
              >
                {step === 4 ? "Generate listing →" : "Continue →"}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setStep(1);
                  setPropertyType("");
                  setDetails({
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                    bedrooms: "",
                    bathrooms: "",
                    sqft: "",
                    yearBuilt: "",
                    listingPrice: "",
                  });
                  setFeatures(new Set());
                  setStyleData({ tone: "professional", highlights: new Set(), extraNotes: "" });
                }}
              >
                Start over
              </Button>
            )}
          </div>
        </div>
      </ToolFooter>
    </PageShell>
  );
}
