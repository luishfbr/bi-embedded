"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { UsersOnGroup } from "./users-on-group";
import { User, type Group } from "@prisma/client";
import { toast } from "sonner";
import { getGroupOffUsers, getGroupUsers } from "../../_actions";
import { UsersOnSistem } from "./add-users-on-group";

interface Props {
  group: Group;
}

export function UsersList({ group }: Props) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [offUsers, setOffUsers] = React.useState<User[]>([]);

  const fetchUsersOnGroup = React.useCallback(async () => {
    try {
      const res = await getGroupUsers(group.id as string);
      if (res) {
        setUsers(res);
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar usuários desse grupo.");
    }
  }, [group]);

  const fetchUsersOffGroup = React.useCallback(async () => {
    try {
      const res = await getGroupOffUsers(group.id as string);
      if (res) {
        setOffUsers(res);
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar usuários desse grupo.");
    }
  }, [group]);

  const update = () => {
    fetchUsersOffGroup();
    fetchUsersOnGroup();
  };

  React.useEffect(() => {
    fetchUsersOnGroup();
    fetchUsersOffGroup();
  }, [fetchUsersOnGroup, fetchUsersOffGroup]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60vw]">
        <div className="w-full flex flex-row justify-between gap-4">
          <div className="w-full">
            <DialogHeader className="pb-4">
              <DialogTitle>Usuários em {group.name}</DialogTitle>
              <DialogDescription>
                Tabela de usuários cadastrados no grupo selecionado, realize a
                inserção/exclusão.
              </DialogDescription>
            </DialogHeader>
            <UsersOnGroup onDelete={update} group={group} users={users} />
          </div>
          <div className="bg-muted-foreground/20 h-full w-[0.2vw] rounded-full"></div>
          <div className="w-full">
            <DialogHeader className="pb-4">
              <DialogTitle>Usuários no Sistema</DialogTitle>
              <DialogDescription>
                Tabela de usuários não cadastrados no grupo selecionado, realize
                a inserção/exclusão.
              </DialogDescription>
            </DialogHeader>
            <UsersOnSistem insert={update} group={group} users={offUsers} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
