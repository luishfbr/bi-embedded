"use client";

import LoadingPage from "@/components/loading-page";
import React from "react";

export default function Page() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex w-full h-full justify-center items-center p-2">
      <p>teste</p>
    </div>
  );
}
