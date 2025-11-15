import React from "react";

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
const DonationInfo = () => {
  return <div>DonationInfo</div>;
};

export default DonationInfo;
