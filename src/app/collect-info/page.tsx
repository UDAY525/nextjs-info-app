"use client";

import React, { useState } from "react";
import PersonalInfo from "./multistep-components/PersonalInfo";
import MedicalInfo from "./multistep-components/MedicalInfo";
import DonationInfo from "./multistep-components/DonationInfo";

const STEPS = ["Personal Info", "Mediacal History", "Donation Preference"];
const PERSONAL_INFO_CONFIG = [
  {
    label: "Full Name",
    type: "text",
    min: "3",
    max: "15",
    required: true,
  },
  {
    label: "Email",
    type: "email",
    required: true,
  },
  {
    label: "Phone",
    type: "number",
    required: true,
  },
  {
    labe: "Gender",
    type: "radio",
    required: true,
  },
];
const MEDICAL_HISTORY_CONFIG = [
  {
    label: "Blood Group",
    type: "select",
    required: true,
  },
  {
    label: "Any active health issues",
    type: "text",
    required: false,
  },
  {
    label: "Are you feeling well today?",
    type: "radio",
    required: true,
  },
];

const DONATION_PREFERENCE_CONFIG = [
  {
    label: "Donation Type",
    type: "select",
    required: true,
  },
  {
    label: "Location Available",
    type: "text",
    required: true,
  },
  {
    label: "Can we contact for any requirement",
    type: "radio",
    required: true,
  },
];

const renderCurrentStep = (step: number) => {
  switch (step) {
    case 0:
      return <PersonalInfo />;
    case 1:
      return <MedicalInfo />;
    case 2:
      return <DonationInfo />;
    default:
      return <PersonalInfo />;
  }
};

const CollectInfo = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">
        Please enter the details to complete the account
      </h2>

      <div className="flex justify-center items-center gap-x-4 mt-6 w-full lg:gap-x-16 p-4">
        {STEPS.map((step, index) => {
          return (
            <div key={step + index} onClick={() => setCurrentStep(index)}>
              {step}
            </div>
          );
        })}
      </div>

      {renderCurrentStep(currentStep)}
    </div>
  );
};

export default CollectInfo;
