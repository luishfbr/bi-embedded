"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import React from "react";
import { GetSession } from "../_actions";
import type { User } from "@prisma/client";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>();
  const route = useRouter();
  React.useEffect(() => {
    async function CheckSession() {
      const res = await GetSession();
      if (res === null) {
        route.push("/");
      }
      if (res !== null) {
        setUser(res.user as User);
      }
    }
    CheckSession();
  }, [route]);
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="p-2 border-border border flex flex-col rounded-md m-2 w-full shadow-sm">
        <SidebarTrigger className="absolute" />
        {children}
      </main>
    </SidebarProvider>
  );
}
