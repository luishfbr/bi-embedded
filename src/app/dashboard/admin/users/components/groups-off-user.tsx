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
  user: User;
  offGroups: Group[];
  insert: () => void;
}

export function GroupsOffUser({ user, offGroups, insert }: Props) {
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
            <TableHead>Nome do Grupo</TableHead>
            <TableHead>Incluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offGroups.length > 0 ? (
            offGroups.map((offGroup) => (
              <TableRow key={offGroup.id}>
                <TableCell>{offGroup.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleInsert(user.id, offGroup.id);
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
                Não há grupos cadastrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
