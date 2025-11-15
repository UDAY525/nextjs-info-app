import React, { useState } from "react";

type Props = {
  initial: {
    donationType: string;
    locationAvailable: string;
    canWeContact: string;
  };
  onBack: () => void;
  onSubmit: (data: Props["initial"]) => void;
};

const DONATION_TYPES = ["Whole Blood", "Platelets", "Plasma"];

export default function DonationInfo({ initial, onBack, onSubmit }: Props) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validateAndSubmit = () => {
    if (!form.donationType) {
      setError("Please select donation type.");
      return;
    }
    if (!form.locationAvailable.trim()) {
      setError("Please provide a preferred location.");
      return;
    }
    setError(null);
    onSubmit(form);
  };

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Donation Type</label>
        <select
          name="donationType"
          value={form.donationType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          {DONATION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Location Available</label>
        <input
          name="locationAvailable"
          value={form.locationAvailable}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Center name or address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Can we contact for any requirement?
        </label>
        <div className="flex gap-4 mt-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="canWeContact"
              value="Yes"
              checked={form.canWeContact === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="canWeContact"
              value="No"
              checked={form.canWeContact === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border rounded"
        >
          Back
        </button>

        <button
          type="button"
          onClick={validateAndSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
