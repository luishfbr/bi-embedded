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
import { type Group, type User } from "@prisma/client";
import { toast } from "sonner";
import { getUserGroups, getUserOffGroups } from "../../_actions";
import { GroupsOnUser } from "./groups-on-user";
import { GroupsOffUser } from "./groups-off-user";

interface Props {
  user: User;
}

export function UsersList({ user }: Props) {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [offGroups, setOffGroups] = React.useState<Group[]>([]);

  const fetchGroups = React.useCallback(async () => {
    try {
      const res = await getUserGroups(user.id as string);
      if (res) {
        setGroups(res);
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar os grupos deste usuário.");
    }
  }, [user.id]);

  const fetchGroupsOffUser = React.useCallback(async () => {
    try {
      const res = await getUserOffGroups(user.id as string);
      if (res) {
        setOffGroups(res);
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar grupos.");
    }
  }, [user.id]);

  const update = () => {
    fetchGroupsOffUser();
    fetchGroups();
  };

  React.useEffect(() => {
    fetchGroupsOffUser();
    fetchGroups();
  }, [fetchGroups, fetchGroupsOffUser]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%]">
        <div className="w-full flex flex-row justify-between gap-4">
          <div className="w-full">
            <DialogHeader className="pb-4">
              <DialogTitle>Grupos do usuário {user.email}</DialogTitle>
              <DialogDescription>
                Tabela de grupos do usuário, realize a inserção/exclusão.
              </DialogDescription>
            </DialogHeader>
            <GroupsOnUser onDelete={update} groups={groups} user={user} />
          </div>
          <div className="bg-muted-foreground/20 h-full w-[0.2vw] rounded-full"></div>
          <div className="w-full">
            <DialogHeader className="pb-4">
              <DialogTitle>Grupos no Sistema</DialogTitle>
              <DialogDescription>
                Tabela de grupos que o usuário não está cadastrado, realize a
                inserção/exclusão.
              </DialogDescription>
            </DialogHeader>
            <GroupsOffUser insert={update} offGroups={offGroups} user={user} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
