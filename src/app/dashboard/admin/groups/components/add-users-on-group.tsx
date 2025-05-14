"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Group, User } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { insertUserOnGroup } from "../../_actions";

interface Props {
  users: User[];
  group: Group;
  insert: () => void;
}

export function UsersOnSistem({ users, group, insert }: Props) {
  const handleInsert = async (userId: string, groupId: string) => {
    try {
      await insertUserOnGroup(userId, groupId);
      insert();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao incluir");
    }
  };
  return (
    <ScrollArea className="h-[60vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Incluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleInsert(user.id, group.id);
                    }}
                    variant={"ghost"}
                    size={"icon"}
                  >
                    <Plus />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="text-muted-foreground items-center w-full text-center"
                colSpan={2}
              >
                Não há usuários cadastrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
