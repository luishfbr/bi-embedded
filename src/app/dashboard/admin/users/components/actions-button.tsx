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
import type { User } from "@prisma/client";
import { AlignJustify, Edit, Trash } from "lucide-react";
import { DeleteUser } from "./delete-user";
import { EditUser } from "./edit-user";
import React from "react";
import { GetSession } from "@/app/_actions";
import { useRouter } from "next/navigation";

interface props {
  user: User;
  update: () => void;
}

export function UserActions({ user, update }: props) {
  const [id, setId] = React.useState<string>();
  const route = useRouter();

  const fetchSessionUser = async () => {
    const res = await GetSession();
    setId(res?.user?.id);
  };

  React.useEffect(() => {
    fetchSessionUser();
  }, [fetchSessionUser]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          Usuário:{" "}
          {user.name ? (
            <span className="text-xs text-muted-foreground">{user.name}</span>
          ) : (
            <span className="text-xs text-muted-foreground">{user.email}</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditUser user={user} onEdit={update} />
        <DropdownMenuSeparator />
        <DeleteUser
          user={user}
          userSessionId={id as string}
          onDelete={update}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
