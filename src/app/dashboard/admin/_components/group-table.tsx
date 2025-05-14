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
import type { Group } from "@prisma/client";
import { Menu } from "lucide-react";

interface TableGroupsProps {
  groups: Group[];
}

export function Grouptable({ groups }: TableGroupsProps) {
  return (
    <ScrollArea className="h-64 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Menu</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {groups.map((group, index) => (
            <TableRow key={index}>
              <TableCell>{group.name || "Não disponível"}</TableCell>
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
