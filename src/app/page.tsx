"use server";

import React from "react";
import SignInButton from "./components/sign-in-button";
import { auth } from "@/auth";
import Image from "next/image";
import UserInfo from "./user-info/page";
import Link from "next/link";
import SignOutButton from "./components/sign-out-button";

const Home = async () => {
  const session = await auth();
  console.log(session);

  if (session?.user) {
    return (
      <div>
        <Link href="/user-info">User Info</Link>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div>
      <p>You are not signed in</p>
      <SignInButton />
    </div>
  );
};

export default Home;
