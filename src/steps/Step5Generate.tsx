import { useState, useEffect } from "react";
import { Badge } from "@/components/Badge";
import { cx } from "@/utils/cx";
import type { PropertyDetails } from "./Step2PropertyDetails";
import type { Step4Data } from "./Step4StyleTone";

interface Step5Props {
  propertyType: string;
  details: PropertyDetails;
  features: Set<string>;
  styleData: Step4Data;
}

const propertyTypeLabels: Record<string, string> = {
  "single-family": "Single-Family Home",
  condo: "Condo / Apartment",
  townhouse: "Townhouse",
  "multi-family": "Multi-Family",
  land: "Land / Lot",
  commercial: "Commercial",
};

const toneLabels: Record<string, string> = {
  professional: "Professional",
  warm: "Warm & Inviting",
  luxury: "Luxury",
  concise: "Concise",
};

function buildListing(
  type: string,
  details: PropertyDetails,
  features: Set<string>,
  styleData: Step4Data,
): string {
  const typeLabel = propertyTypeLabels[type] || type;
  const beds = details.bedrooms ? `${details.bedrooms}-bedroom` : "";
  const baths = details.bathrooms ? `${details.bathrooms}-bathroom` : "";
  const sqft = details.sqft ? `${details.sqft} sq ft` : "";
  const year = details.yearBuilt ? `built in ${details.yearBuilt}` : "";
  const price = details.listingPrice ? `Listed at ${details.listingPrice}` : "";
  const location =
    [details.address, details.city, details.state].filter(Boolean).join(", ") || "prime location";
  const featureList = Array.from(features).slice(0, 6);
  const tone = styleData.tone;

  if (tone === "luxury") {
    return `An exceptional ${beds} ${baths} ${typeLabel.toLowerCase()} of distinction awaits at ${location}. ${sqft ? `Spanning ${sqft}` : ""}${year ? `, ${year}` : ""}, this residence commands attention with its impeccable attention to detail and premium appointments.${featureList.length > 0 ? ` Among its coveted attributes: ${featureList.join(", ")}.` : ""} ${styleData.extraNotes ? styleData.extraNotes + " " : ""}${price}. A rare opportunity for the discerning buyer. Schedule your private showing today.`;
  }

  if (tone === "warm") {
    return `Welcome home to ${location} — a charming ${beds} ${baths} ${typeLabel.toLowerCase()}${sqft ? ` with ${sqft} of lovingly maintained living space` : ""}${year ? `, ${year}` : ""}. From the moment you arrive, you'll feel the warmth and character that make this house a home.${featureList.length > 0 ? ` You'll love: ${featureList.join(", ")}.` : ""} ${styleData.extraNotes ? styleData.extraNotes + " " : ""}${price}. Don't miss your chance to make it yours — come see it today!`;
  }

  if (tone === "concise") {
    const parts = [
      beds && baths ? `${beds}, ${baths}` : "",
      sqft,
      typeLabel,
      location,
      featureList.length > 0 ? featureList.slice(0, 3).join(" · ") : "",
      styleData.extraNotes || "",
      price,
    ].filter(Boolean);
    return parts.join(". ") + ". Won't last — schedule a showing today.";
  }

  return `Presenting a well-appointed ${beds} ${baths} ${typeLabel.toLowerCase()} located at ${location}${sqft ? `, offering ${sqft} of functional living space` : ""}${year ? ` (${year})` : ""}. This property features ${featureList.length > 0 ? featureList.join(", ") : "a range of desirable amenities"}, making it an excellent choice for buyers seeking value and quality.${styleData.extraNotes ? " " + styleData.extraNotes : ""} ${price}. Schedule a showing today.`;
}

export function Step5Generate({ propertyType, details, features, styleData }: Step5Props) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [copied, setCopied] = useState(false);

  const fullListing = buildListing(propertyType, details, features, styleData);

  useEffect(() => {
    setIsGenerating(true);
    setDisplayedText("");

    const delay = setTimeout(() => {
      setIsGenerating(false);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedText(fullListing.slice(0, i));
        if (i >= fullListing.length) clearInterval(interval);
      }, 12);
      return () => clearInterval(interval);
    }, 900);

    return () => clearTimeout(delay);
  }, [fullListing]);

  function handleCopy() {
    navigator.clipboard.writeText(fullListing).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const addressLine = [details.address, details.city, details.state, details.zip]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
            Your listing is ready
          </h2>
          {!isGenerating && displayedText.length >= fullListing.length && (
            <Badge label="AI Generated" variant="brand" />
          )}
        </div>
        <p className="text-[var(--text-secondary)] text-sm">
          Review, edit, and copy your AI-crafted listing below.
        </p>
      </div>

      {addressLine && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <div className="w-2 h-2 rounded-full bg-[var(--graffiti-500)] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-medium">
              Property
            </p>
            <p className="text-sm text-[var(--text-primary)] font-medium truncate">{addressLine}</p>
          </div>
          <div className="ml-auto flex gap-2">
            {propertyType && (
              <Badge
                label={propertyTypeLabels[propertyType] || propertyType}
                variant="neutral"
              />
            )}
            {styleData.tone && (
              <Badge label={toneLabels[styleData.tone] || styleData.tone} variant="accent" />
            )}
          </div>
        </div>
      )}

      <div className="relative">
        {isGenerating ? (
          <div className="flex flex-col gap-3 px-5 py-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] min-h-[160px] items-center justify-center">
            <div className="flex gap-1.5 items-center">
              <span
                className="w-2 h-2 rounded-full bg-[var(--graffiti-500)] animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-[var(--graffiti-500)] animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-[var(--graffiti-500)] animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">Generating your listing…</p>
          </div>
        ) : (
          <textarea
            value={displayedText}
            onChange={(e) => setDisplayedText(e.target.value)}
            rows={8}
            className="w-full px-5 py-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm leading-relaxed transition-all duration-200 outline-none focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] resize-none"
          />
        )}
      </div>

      {!isGenerating && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className={cx(
              "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer select-none",
              copied
                ? "bg-[var(--bg-brand-subtle)] text-[var(--text-brand)] border-[var(--border-brand)]"
                : "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-bg-hover)]",
            )}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8l3.5 3.5L13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="9"
                    height="9"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11 5V3.5A1.5 1.5 0 009.5 2h-7A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Copy listing
              </>
            )}
          </button>
          <p className="text-xs text-[var(--text-tertiary)]">
            {features.size} feature{features.size !== 1 ? "s" : ""} ·{" "}
            {fullListing.split(" ").length} words
          </p>
        </div>
      )}
    </div>
  );
}
