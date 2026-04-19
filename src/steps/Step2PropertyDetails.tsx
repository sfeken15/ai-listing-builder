interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  listingPrice: string;
}

interface Step2Props {
  details: PropertyDetails;
  onChange: (field: keyof PropertyDetails, value: string) => void;
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--text-primary)]"
      >
        {label}
        {required && <span className="text-[var(--text-brand)] ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-[var(--input-radius)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] text-sm transition-all duration-200 outline-none focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)]"
      />
    </div>
  );
}

export function Step2PropertyDetails({ details, onChange }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
          Property details
        </h2>
        <p className="text-[var(--text-secondary)] text-sm">
          Give us the basics — the AI will use these to craft an accurate listing.
        </p>
      </div>

      <div className="space-y-4">
        <Field
          label="Street address"
          id="address"
          value={details.address}
          onChange={(v) => onChange("address", v)}
          placeholder="123 Main Street"
          required
        />

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Field
              label="City"
              id="city"
              value={details.city}
              onChange={(v) => onChange("city", v)}
              placeholder="Joplin"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3 col-span-1 mt-auto">
            <Field
              label="State"
              id="state"
              value={details.state}
              onChange={(v) => onChange("state", v)}
              placeholder="MO"
            />
            <Field
              label="ZIP"
              id="zip"
              value={details.zip}
              onChange={(v) => onChange("zip", v)}
              placeholder="64801"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field
            label="Bedrooms"
            id="bedrooms"
            value={details.bedrooms}
            onChange={(v) => onChange("bedrooms", v)}
            placeholder="3"
            type="number"
          />
          <Field
            label="Bathrooms"
            id="bathrooms"
            value={details.bathrooms}
            onChange={(v) => onChange("bathrooms", v)}
            placeholder="2"
            type="number"
          />
          <Field
            label="Sq. Footage"
            id="sqft"
            value={details.sqft}
            onChange={(v) => onChange("sqft", v)}
            placeholder="1,800"
          />
          <Field
            label="Year Built"
            id="yearBuilt"
            value={details.yearBuilt}
            onChange={(v) => onChange("yearBuilt", v)}
            placeholder="2002"
            type="number"
          />
        </div>

        <Field
          label="Listing price"
          id="listingPrice"
          value={details.listingPrice}
          onChange={(v) => onChange("listingPrice", v)}
          placeholder="$275,000"
          required
        />
      </div>
    </div>
  );
}

export type { PropertyDetails };
