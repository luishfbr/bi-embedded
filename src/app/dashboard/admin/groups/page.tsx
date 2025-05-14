"use client";

import LoadingPage from "@/components/loading-page";
import React from "react";
import { type Group } from "@prisma/client";
import { getAllGroups } from "../_actions";
import { Grouptable } from "./components/group-table";
import { AddGroup } from "./components/add-group";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const [groups, setGroups] = React.useState<Group[]>([]);

  const fetchGroups = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllGroups();
      if (res) {
        setGroups(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex md:flex-row md:justify-between flex-col w-full items-top gap-2">
        <div className="pl-2 flex flex-col">
          <h1 className="font-bold">Tabela de grupos cadastrados no sistema</h1>
          <span className="text-muted-foreground text-sm">
            Fique atento na criação e não se esqueça de atribuir tanto o usuário
            quanto o painél aos grupos.
          </span>
        </div>
        <AddGroup onUpdate={fetchGroups} />
      </div>
      <Grouptable update={fetchGroups} groups={groups} />
    </div>
  );
}
