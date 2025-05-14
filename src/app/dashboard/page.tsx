"use client";

import React from "react";

export default function Page() {
  const url =
    "https://app.powerbi.com/reportEmbed?reportId=e40cab6a-20fe-49bd-8749-2d4fbc9d277b&autoAuth=true&ctid=28b886f2-1894-4dda-9cf2-066ad2e94c2c";
  return (
    <div className="flex items-center justify-center h-full w-full mx-auto">
      {url ? (
        <iframe title="Capital Premiado" width="100%" height="100%" src={url} />
      ) : (
        <span className="text-muted-foreground">Selecione um painél</span>
      )}
    </div>
  );
}
