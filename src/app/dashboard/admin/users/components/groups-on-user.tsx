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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { removeUserFromGroup } from "../../_actions";

interface Props {
  user: User;
  groups: Group[];
  onDelete: () => void;
}

export function GroupsOnUser({ user, groups, onDelete }: Props) {
  const handleDelete = async (groupId: string, UserId: string) => {
    try {
      await removeUserFromGroup(UserId, groupId);
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao retirar grupo");
    }
  };

  return (
    <ScrollArea className="h-[60vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Grupo</TableHead>
            <TableHead>Excluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.length > 0 ? (
            groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDelete(group.id as string, user.id as string);
                    }}
                    variant={"ghost"}
                    size={"icon"}
                  >
                    <Trash2 />
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
                Não há grupos cadastrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
