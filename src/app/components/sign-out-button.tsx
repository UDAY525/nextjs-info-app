"use client";

import React from "react";
import { logout } from "@/lib/actions/auth";
const SignOutButton = () => {
  return (
    <div>
      <button className="bg-gray-400 text-white p-2" onClick={() => logout()}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
