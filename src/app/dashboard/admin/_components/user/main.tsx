import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@prisma/client";
import { User2, Plus } from "lucide-react";
import React from "react";
import { InfoUser } from "./info-create-user";
import { DataTable } from "./data-table-user/data-table";
import { getUserColumns as columns } from "./data-table-user/columns";

interface props {
  users: User[];
  update: () => void;
}

export default function UserMain({ users, update }: props) {
  return (
    <div className="h-full w-full flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div className="flex flex-row gap-2">
          <h1 className="text-xl">Usuários</h1>
          <User2 />
        </div>
        <span className="text-muted-foreground text-sm">
          Tenha controle de todos os usuários atualmente cadastrados na
          plataforma.
        </span>
      </div>
      <DataTable columns={columns(update)} data={users} update={update} />
    </div>
  );
}
