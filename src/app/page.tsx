"use client";
import { SignIn } from "./components/signin";
import { GetSession } from "./_actions";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  React.useEffect(() => {
    const checkSession = async () => {
      const session = await GetSession();
      if (session === true) {
        route.push("/dashboard");
      }
    };
    checkSession();
  }, [route]);

  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <SignIn />
    </div>
  );
}
