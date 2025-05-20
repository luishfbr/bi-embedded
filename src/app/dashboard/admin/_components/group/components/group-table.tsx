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
import { DeleteButton } from "./deleteButton";
import { UsersList } from "./users-list";

interface TableGroupsProps {
  groups: Group[];
  update: () => void;
}

export function Grouptable({ groups, update }: TableGroupsProps) {
  return (
    <ScrollArea className="h-64 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Usuários</TableHead>
            <TableHead>Excluir</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {groups.map((group, index) => (
            <TableRow key={index}>
              <TableCell>{group.name}</TableCell>
              <TableCell>
                {new Date(group.createdAt).toLocaleDateString("br")}
              </TableCell>
              <TableCell>
                <UsersList group={group} />
              </TableCell>
              <TableCell>
                <DeleteButton onDelete={update} group={group} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
