"use client";

import React from "react";
import TopBar from "./_components/bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full flex flex-col gap-2">
      <TopBar />
      {children}
    </main>
  );
}
