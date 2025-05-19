"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Panel } from "@prisma/client";
import { ActionsPanel } from "../components/actions";

export const getPanelColumns = (update: () => void): ColumnDef<Panel>[] => [
  {
    accessorKey: "name",
    header: () => <div>Nome</div>,
  },
  {
    accessorKey: "url",
    header: () => <div>Url</div>,
  },
  {
    id: "actions",
    header: () => <div>Ações</div>,
    cell: ({ row }) => {
      const panel = row.original;
      return <ActionsPanel panel={panel}/>;
    },
  },
];
