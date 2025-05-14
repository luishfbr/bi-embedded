"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Panel } from "@prisma/client";
import { Menu } from "lucide-react";

interface TablePanelProps {
  panels: Panel[];
}

export function PanelTable({ panels }: TablePanelProps) {
  return (
    <ScrollArea className="h-64 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Menu</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {panels.map((panel, index) => (
            <TableRow key={index}>
              <TableCell>{panel.name || "Não disponível"}</TableCell>
              <TableCell>{panel.description}</TableCell>
              <TableCell>
                <Menu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
