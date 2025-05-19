"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true); // Só renderiza após montagem
    const param = searchParams.get("url");
    setUrl(param);
  }, [searchParams]);

  const isValidUrl = (input: string | null) => {
    if (!input) return false;
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  if (!mounted) {
    return null; // Evita hidratação prematura
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-background px-12">
      {isValidUrl(url) ? (
        <div className="w-full h-full max-w-screen-xl">
          <iframe
            title="Painel Integrado"
            src={url!}
            className="w-full h-full border-none rounded-xl shadow-lg"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-muted-foreground text-lg text-center">
          Nenhum painel selecionado ou URL inválida.
        </p>
      )}
    </div>
  );
}
