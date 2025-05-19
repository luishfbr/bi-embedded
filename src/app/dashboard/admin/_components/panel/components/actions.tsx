"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Panel, User } from "@prisma/client";
import { AlignJustify, Edit, Trash } from "lucide-react";
import React from "react";
import { GetSession } from "@/app/_actions";
import { useRouter } from "next/navigation";
import { EditPanel } from "./edit-panel";
import { DeletePanel } from "./delete-panel";

interface props {
  panel: Panel;
  update: () => void;
}

export function ActionsPanel({ panel, update }: props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <span className="text-xs text-muted-foreground">{panel.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditPanel panel={panel} onEdit={update} />
        <DropdownMenuSeparator />
        <DeletePanel panel={panel} onDelete={update} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
