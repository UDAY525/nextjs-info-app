// multistep-components/MedicalInfo.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { getErrorMessage } from "../formUtils";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function MedicalInfo() {
  const { register, formState } = useFormContext();
  const bgError = getErrorMessage(formState.errors, "medical.bloodGroup");
  const feelError = getErrorMessage(
    formState.errors,
    "medical.feelingWellToday"
  );

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Blood Group</label>
        <select
          {...register("medical.bloodGroup")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select blood group</option>
          {BLOOD_GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {bgError && <p className="text-sm text-red-500">{bgError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Active Health Issues (optional)
        </label>
        <input
          {...register("medical.activeHealthIssues")}
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
              value="Yes"
              {...register("medical.feelingWellToday")}
            />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="No"
              {...register("medical.feelingWellToday")}
            />
            No
          </label>
        </div>
        {feelError && <p className="text-sm text-red-500">{feelError}</p>}
      </div>
    </div>
  );
}
