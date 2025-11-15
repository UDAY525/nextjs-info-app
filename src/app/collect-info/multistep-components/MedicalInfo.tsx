import React, { useState } from "react";

type Props = {
  initial: {
    bloodGroup: string;
    activeHealthIssues: string;
    feelingWellToday: string;
  };
  onBack: () => void;
  onNext: (data: Props["initial"]) => void;
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function MedicalInfo({ initial, onBack, onNext }: Props) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validateAndNext = () => {
    if (!form.bloodGroup) {
      setError("Please select a blood group.");
      return;
    }
    if (!form.feelingWellToday) {
      setError("Please answer whether you're feeling well.");
      return;
    }
    setError(null);
    onNext(form);
  };

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Blood Group</label>
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select blood group</option>
          {BLOOD_GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Active Health Issues (optional)
        </label>
        <input
          name="activeHealthIssues"
          value={form.activeHealthIssues}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., asthma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Are you feeling well today?
        </label>
        <div className="flex gap-4 mt-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="feelingWellToday"
              value="Yes"
              checked={form.feelingWellToday === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="feelingWellToday"
              value="No"
              checked={form.feelingWellToday === "No"}
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
          onClick={validateAndNext}
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
