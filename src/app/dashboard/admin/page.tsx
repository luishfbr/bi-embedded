"use client";

import LoadingPage from "@/components/loading-page";
import React from "react";
import { TableUsers } from "./_components/user-table";
import { Group, User, type Panel } from "@prisma/client";
import { getAllGroups, getAllPanels, getAllUsers } from "./_actions";
import { PanelTable } from "./_components/panel-table";
import { Grouptable } from "./_components/group-table";

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<User[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [panels, setPanels] = React.useState<Panel[]>([]);

  const fetchUsers = React.useCallback(async () => {
    try {
      const res = await getAllUsers();
      if (res) {
        setUsers(res);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchGroups = React.useCallback(async () => {
    try {
      const res = await getAllGroups();
      if (res) {
        setGroups(res);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchPanels = React.useCallback(async () => {
    try {
      const res = await getAllPanels();
      if (res) {
        setPanels(res);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers();
    fetchGroups();
    fetchPanels();
    setLoading(false);
  }, [fetchUsers, fetchGroups, fetchPanels]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full p-4">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1>Tabela de Usuários Cadastrados</h1>
        <TableUsers users={users} />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1>Tabela de Grupos Cadastrados</h1>
        <Grouptable groups={groups} />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1>Tabela de Painéis Cadastrados</h1>
        <PanelTable panels={panels} />
      </div>
    </div>
  );
}
