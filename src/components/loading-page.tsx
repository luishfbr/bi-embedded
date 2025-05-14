import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-full w-full mx-auto">
      <Loader2 className="animate-spin h-8 w-8" />
    </div>
  );
}
