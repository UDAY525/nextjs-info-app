import React from "react";
import Image from "next/image";
import { auth } from "@/auth";

const UserInfo = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <h1>NextAuth</h1>
      <p>User signed in with name: {session.user.name}</p>
      <p>User signed in with email: {session.user.email}</p>
      {session.user.image && (
        <Image
          src={session.user.image}
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default UserInfo;
