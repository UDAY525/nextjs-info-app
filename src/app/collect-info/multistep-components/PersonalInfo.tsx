// multistep-components/PersonalInfo.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { getErrorMessage } from "../formUtils";

export default function PersonalInfo() {
  const { register, formState } = useFormContext();

  const fullNameError = getErrorMessage(formState.errors, "personal.fullName");
  const emailError = getErrorMessage(formState.errors, "personal.email");
  const phoneError = getErrorMessage(formState.errors, "personal.phone");
  const dobError = getErrorMessage(formState.errors, "personal.dob");

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          {...register("personal.fullName")}
          className="w-full px-3 py-2 border rounded"
        />
        {fullNameError && (
          <p className="text-sm text-red-500">{fullNameError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("personal.email")}
          className="w-full px-3 py-2 border rounded"
        />
        {emailError && <p className="text-sm text-red-500">{emailError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          {...register("personal.phone")}
          className="w-full px-3 py-2 border rounded"
        />
        {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          {...register("personal.dob")}
          className="w-full px-3 py-2 border rounded"
        />
        {dobError && <p className="text-sm text-red-500">{dobError}</p>}
      </div>
    </div>
  );
}
