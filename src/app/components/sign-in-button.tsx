"use client";

import React from "react";
import { login } from "@/lib/actions/auth";
const SignInButton = () => {
  return (
    <div>
      <button className="bg-gray-400 text-white p-2" onClick={() => login()}>
        Sign In With Github
      </button>
    </div>
  );
};

export default SignInButton;
