import React from "react";

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
const PersonalInfo = () => {
  return <div>PersonalInfo</div>;
};

export default PersonalInfo;
