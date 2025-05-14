"use client";

import LoadingPage from "@/components/loading-page";
import React from "react";
import { type Panel } from "@prisma/client";
import { getAllPanels } from "../_actions";
import { PanelTable } from "../_components/panel-table";

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const [panels, setPanels] = React.useState<Panel[]>([]);

  const fetchPanels = React.useCallback(async () => {
    try {
      const res = await getAllPanels();
      if (res) {
        setPanels(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPanels();
  }, [fetchPanels]);

  if (loading) {
    return <LoadingPage />;
  }

  return <PanelTable panels={panels} />;
}
