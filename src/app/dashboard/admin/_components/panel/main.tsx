import type { Panel } from "@prisma/client";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { DataTablePanels } from "./data-table-panel/data-table";
import { getPanelColumns } from "./data-table-panel/columns";

interface props {
  panels: Panel[];
  update: () => void;
}

export default function PanelMain({ panels, update }: props) {
  return (
    <div className="h-full w-full flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div className="flex flex-row gap-2">
          <h1 className="text-xl">Painéis</h1>
          <LayoutDashboard />
        </div>
        <span className="text-muted-foreground text-sm">
          Tenha controle de todos os painéis atualmente cadastrados na
          plataforma.
        </span>
      </div>
      <DataTablePanels
        columns={getPanelColumns(update)}
        data={panels}
        update={update}
      />
    </div>
  );
}
