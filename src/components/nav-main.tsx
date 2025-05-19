"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import React from "react";
import {
  getPanelByGroupId,
  getUserGroups,
} from "@/app/dashboard/admin/_actions";
import { Group, type Panel } from "@prisma/client";
import { useRouter } from "next/navigation";

interface props {
  id: string;
}

export function NavMain({ id }: props) {
  const route = useRouter();
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [panels, setPanels] = React.useState<Panel[]>([]);

  const fetchGroupsById = React.useCallback(async () => {
    try {
      const res = await getUserGroups(id);
      if (res) {
        setGroups(res);
      }
    } catch (error) {
      console.error("Failed to fetch user groups:", error);
    }
  }, [id]);

  const fetchPanelsByGroupId = React.useCallback(async (id: string) => {
    try {
      const res = await getPanelByGroupId(id);
      if (res) {
        setPanels(res);
      }
    } catch (error) {
      console.error("Failed to fetch groups panels:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchGroupsById();
  }, [fetchGroupsById]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Grupos & Dashboards</SidebarGroupLabel>
      <SidebarMenu>
        {groups.map((group) => (
          <Collapsible key={group.id} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  onClick={() => {
                    fetchPanelsByGroupId(group.id);
                  }}
                  tooltip={group.name}
                >
                  <span>{group.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {panels.map((panel) => (
                    <SidebarMenuSubItem key={panel.id}>
                      <SidebarMenuSubButton
                      className="cursor-pointer"
                        onClick={() =>
                          route.push(`/dashboard?url=${panel.url}`)
                        }
                        asChild
                      >
                        <span>{panel.name}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
