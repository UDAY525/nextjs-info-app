// multistep-components/DonationInfo.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { getErrorMessage } from "../formUtils";

const DONATION_TYPES = ["Whole Blood", "Platelets", "Plasma"];

export default function DonationInfo() {
  const { register, formState } = useFormContext();
  const locError = getErrorMessage(
    formState.errors,
    "donation.locationAvailable"
  );
  const typeError = getErrorMessage(formState.errors, "donation.donationType");

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Donation Type</label>
        <select
          {...register("donation.donationType")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          {DONATION_TYPES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {typeError && <p className="text-sm text-red-500">{typeError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Location Available</label>
        <input
          {...register("donation.locationAvailable")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Center name or address"
        />
        {locError && <p className="text-sm text-red-500">{locError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Can we contact for any requirement?
        </label>
        <div className="flex gap-4 mt-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="Yes"
              {...register("donation.canWeContact")}
            />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="No"
              {...register("donation.canWeContact")}
            />
            No
          </label>
        </div>
      </div>
    </div>
  );
}
