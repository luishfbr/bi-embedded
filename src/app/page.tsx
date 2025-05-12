"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  const handleClick = () => {
    route.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <Button onClick={handleClick}>Dashboard</Button>
    </div>
  );
}
