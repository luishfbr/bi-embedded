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
import type { User } from "@prisma/client";
import { UsersList } from "./user-groups";
import { UserActions } from "./actions-button";

interface TableUsersProps {
  users: User[];
  update: () => void;
}

export function TableUsers({ users, update }: TableUsersProps) {
  return (
    <ScrollArea className="h-64 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Atribuição</TableHead>
            <TableHead>Grupos</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name || "Não disponível"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <UsersList user={user} />
              </TableCell>
              <TableCell>
                <UserActions user={user} onUpdate={() => update()} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
