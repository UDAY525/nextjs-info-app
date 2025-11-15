import React from "react";

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

const MedicalInfo = () => {
  return <div>MedicalInfo</div>;
};

export default MedicalInfo;
