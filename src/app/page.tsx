"use client";

import React from "react";
import SignIn from "./components/signin";
import { GetSession } from "./_actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  React.useEffect(() => {
    async function CheckSession() {
      const res = await GetSession();
      if (res !== null) {
        route.push("/dashboard");
      }
    }
    CheckSession();
  }, [route]);
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <SignIn />
    </div>
  );
}
