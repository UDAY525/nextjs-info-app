// CollectInfo.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const stepRef = useRef<(HTMLButtonElement | null)[]>([]);
  const stepRefProgSect = useRef<HTMLDivElement | null>(null);
  // const [progressMargin, setProgressMargin] = useState({
  //   marginLeft: 0,
  //   marginRight: 0,
  // });
  const [sectWidth, setSectWidth] = useState<number>(0);

  // useEffect(() => {
  //   // If refs are not assigned yet, skip
  //   if (!stepRef.current.length) return;

  //   const first = stepRef.current[0];
  //   const last = stepRef.current[STEPS.length - 1];

  //   if (!first || !last) return; // Safety check

  //   const ml = first.offsetWidth / 2;
  //   const mr = last.offsetWidth / 2;

  //   setProgressMargin({ marginLeft: ml, marginRight: mr });
  // }, [stepRef, STEPS]);

  // useEffect(() => {
  //   if (!stepRefProgSect.current) return;
  //   setSectWidth(stepRefProgSect?.current?.offsetWidth);
  // }, []);

  useEffect(() => {
    const el = stepRefProgSect.current;
    if (!el) return;

    // Set initial value once
    const initial = el.offsetWidth;
    setSectWidth((prev) => (prev === initial ? prev : initial));

    // Observe subsequent size changes
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setSectWidth((prev) => (prev === w ? prev : w));
      }
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (STEPS.length - 1)) * 100;
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

        <div
          className="flex justify-between text-xs lg:px-12 relative gap-4 mt-6"
          ref={stepRefProgSect}
        >
          {STEPS.map((s, i) => (
            <button
              key={s + i}
              type="button"
              onClick={() => handleStepClick(i)}
              ref={(el) => {
                stepRef.current[i] = el;
              }}
              className={`px-2 py-1 z-10 rounded ${
                i === currentStep
                  ? "bg-sky-600 text-white"
                  : i < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}

          <div
            id="progress-bar"
            className="absolute h-1 top-1/2 w-full bg-gray-300"
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              // width: `calc(100% - ${
              //   progressMargin.marginLeft + progressMargin.marginRight
              // }px)`,
              width: `${sectWidth}px`,
            }}
          >
            <div
              className="h-1 bg-green-300 w-0"
              style={{ width: `${calculateProgressBarWidth()}%` }}
            ></div>
          </div>
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
