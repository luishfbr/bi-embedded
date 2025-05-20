"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Panel } from "@prisma/client";
import { getPanelById } from "./admin/_actions";

export default function Page() {
  const searchParams = useSearchParams();
  const panelId = searchParams.get("panelId");

  const [panel, setPanel] = useState<Panel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPanel = useCallback(async () => {
    if (!panelId) {
      setPanel(null);
      return;
    }

    setLoading(true);
    try {
      const res = await getPanelById(panelId);
      setPanel(res ?? null);
    } catch (error) {
      console.error("Erro ao buscar o painel:", error);
      setPanel(null);
    } finally {
      setLoading(false);
    }
  }, [panelId]);

  useEffect(() => {
    fetchPanel();
  }, [fetchPanel]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-background px-12">
      {loading ? (
        <p className="text-muted-foreground text-sm">Carregando painel...</p>
      ) : panel ? (
        <iframe
          src={panel.url}
          className="h-full w-full rounded-md border shadow-lg"
          allowFullScreen
          title={`Painel: ${panel.name}`}
        />
      ) : (
        <div className="flex flex-col text-center max-w-md mx-auto space-y-2">
          <p className="text-lg font-medium">Nenhum painel encontrado</p>
          <span className="text-muted-foreground text-sm">
            Selecione um painel ao lado. Caso não tenha acesso, solicite ao
            responsável pelo BI de sua cooperativa.
          </span>
        </div>
      )}
    </div>
  );
}
