// CollectInfo.tsx
"use client";

import React, { useState } from "react";
import { useForm, FormProvider, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fullMultiStepFormSchema,
  type FullMultiStepForm,
} from "./multistep-schemas/schema";
import PersonalInfo from "./multistep-components/PersonalInfo";
import MedicalInfo from "./multistep-components/MedicalInfo";
import DonationInfo from "./multistep-components/DonationInfo";

const STEPS = ["Personal Info", "Medical History", "Donation Preference"];

const STEP_FIELDS: Record<number, FieldPath<FullMultiStepForm>[]> = {
  0: [
    "personal.fullName",
    "personal.email",
    "personal.phone",
    "personal.dob",
    "personal.gender",
  ] as FieldPath<FullMultiStepForm>[],
  1: [
    "medical.bloodGroup",
    "medical.feelingWellToday",
  ] as FieldPath<FullMultiStepForm>[],
  2: [
    "donation.donationType",
    "donation.locationAvailable",
  ] as FieldPath<FullMultiStepForm>[],
};

export default function CollectInfo() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<FullMultiStepForm>({
    resolver: zodResolver(fullMultiStepFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      personal: {
        fullName: "",
        email: "",
        phone: "",
        gender: undefined,
        dob: "",
      },
      medical: {
        bloodGroup: "O+",
        activeHealthIssues: "",
        feelingWellToday: "Yes",
      },
      donation: {
        donationType: "Whole Blood",
        locationAvailable: "",
        canWeContact: "Yes",
      },
    },
  });

  const canGoToStep = async (target: number) => {
    if (target <= currentStep) return true;
    // validate all steps up to target
    for (let s = 0; s < target; s++) {
      const ok = await methods.trigger(STEP_FIELDS[s]);
      if (!ok) {
        setCurrentStep(s);
        return false;
      }
    }
    return true;
  };

  const handleStepClick = async (index: number) => {
    if (await canGoToStep(index)) setCurrentStep(index);
  };

  const next = async () => {
    const ok = await methods.trigger(STEP_FIELDS[currentStep]);
    if (!ok) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: FullMultiStepForm) => {
    console.log("Submitted:", data);
    // send to server here
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-4"
      >
        <h2 className="text-center text-2xl font-semibold">
          Please enter the details to complete the account
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          {STEPS.map((s, i) => (
            <button
              key={s + i}
              type="button"
              onClick={() => handleStepClick(i)}
              className={`px-3 py-1 rounded ${
                i === currentStep ? "bg-sky-600 text-white" : "bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-white shadow rounded p-6">
          {currentStep === 0 && <PersonalInfo />}
          {currentStep === 1 && <MedicalInfo />}
          {currentStep === 2 && <DonationInfo />}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={back}
            disabled={currentStep === 0}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Back
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="px-4 py-2 bg-sky-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
