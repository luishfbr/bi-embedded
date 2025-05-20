"use client";

import React from "react";
import LoadingPage from "@/components/loading-page";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { type User, type Group, type Panel } from "@prisma/client";
import { getAllGroups, getAllPanels, getAllUsers } from "./_actions";
import { toast } from "sonner";
import UserMain from "./_components/user/main";
import GroupMain from "./_components/group/main";
import PanelMain from "./_components/panel/main";

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<User[]>();
  const [groups, setGroups] = React.useState<Group[]>();
  const [panels, setPanels] = React.useState<Panel[]>();

  const fetchAndSet = async <T,>(
    fetchFn: () => Promise<T>,
    setFn: React.Dispatch<React.SetStateAction<T | undefined>>,
    label: string
  ) => {
    try {
      const data = await fetchFn();
      setFn(data);
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao carregar ${label}.`);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchAndSet(getAllUsers, setUsers, "usuários"),
      fetchAndSet(getAllGroups, setGroups, "grupos"),
      fetchAndSet(getAllPanels, setPanels, "painéis"),
    ]);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAll();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={50}>
        <UserMain
          users={users || []}
          update={() => fetchAndSet(getAllUsers, setUsers, "usuários")}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <GroupMain
              groups={groups || []}
              update={() => fetchAndSet(getAllGroups, setGroups, "grupos")}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <PanelMain
              panels={panels || []}
              update={() => fetchAndSet(getAllPanels, setPanels, "painéis")}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
