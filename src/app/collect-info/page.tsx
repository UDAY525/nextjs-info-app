"use client";

import React, { useState } from "react";
import PersonalInfo from "./multistep-components/PersonalInfo";
import MedicalInfo from "./multistep-components/MedicalInfo";
import DonationInfo from "./multistep-components/DonationInfo";

const STEPS = ["Personal Info", "Medical History", "Donation Preference"];

type Personal = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
};

type Medical = {
  bloodGroup: string;
  activeHealthIssues: string;
  feelingWellToday: string;
};

type Donation = {
  donationType: string;
  locationAvailable: string;
  canWeContact: string;
};

export default function CollectInfo() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // collected data
  const [personal, setPersonal] = useState<Personal>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [medical, setMedical] = useState<Medical>({
    bloodGroup: "",
    activeHealthIssues: "",
    feelingWellToday: "Yes",
  });

  const [donation, setDonation] = useState<Donation>({
    donationType: "Whole Blood",
    locationAvailable: "",
    canWeContact: "Yes",
  });

  const handleNextFromPersonal = (data: Personal) => {
    setPersonal(data);
    setCurrentStep(1);
  };

  const handleNextFromMedical = (data: Medical) => {
    setMedical(data);
    setCurrentStep(2);
  };

  const handleBackFromMedical = () => setCurrentStep(0);
  const handleBackFromDonation = () => setCurrentStep(1);

  const handleSubmit = (data: Donation) => {
    setDonation(data);

    // final combined payload
    const payload = {
      personal,
      medical,
      donation: data,
    };

    console.log("Final payload", payload);
    // Call your API here...
    // e.g., fetch('/api/submit', { method: 'POST', body: JSON.stringify(payload) })
    alert("Submitted! Check console for payload.");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-center text-2xl font-semibold">
        Please enter the details to complete the account
      </h2>

      <div className="flex justify-center items-center gap-x-4 mt-6 w-full lg:gap-x-16 p-4">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isClickable = index <= currentStep; // allow going back freely
          return (
            <button
              key={step + index}
              onClick={() => isClickable && setCurrentStep(index)}
              className={`px-3 py-1 rounded ${
                isActive ? "bg-sky-600 text-white" : "bg-gray-100"
              }`}
            >
              {step}
            </button>
          );
        })}
      </div>

      <div className="mt-6 bg-white shadow rounded p-6">
        {currentStep === 0 && (
          <PersonalInfo initial={personal} onNext={handleNextFromPersonal} />
        )}

        {currentStep === 1 && (
          <MedicalInfo
            initial={medical}
            onBack={handleBackFromMedical}
            onNext={handleNextFromMedical}
          />
        )}

        {currentStep === 2 && (
          <DonationInfo
            initial={donation}
            onBack={handleBackFromDonation}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
