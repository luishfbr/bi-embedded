"use client";

import React from "react";
import { GetSession } from "../_actions";
import { useRouter } from "next/navigation";
import SignOut from "../components/signout";

export default function Page() {
  const route = useRouter();

  React.useEffect(() => {
    const checkSession = async () => {
      const session = await GetSession();
      if (!session) {
        route.push("/");
      }
    };
    checkSession();
  }, [route]);

  return (
    <div>
      <SignOut />
    </div>
  );
}
