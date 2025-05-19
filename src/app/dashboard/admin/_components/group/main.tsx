import type { Group } from "@prisma/client";
import { Boxes } from "lucide-react";
import React from "react";
import { getUserColumns as columns } from "./data-table-group/columns";
import { DataTableGroups } from "./data-table-group/data-table";

interface props {
  groups: Group[];
  update: () => void;
}

export default function GroupMain({ groups, update }: props) {
  return (
    <div className="h-full w-full flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div className="flex flex-row gap-2">
          <h1 className="text-xl">Gruopos</h1>
          <Boxes />
        </div>
        <span className="text-muted-foreground text-sm">
          Tenha controle de todos os grupos atualmente cadastrados na
          plataforma.
        </span>
      </div>
      <DataTableGroups
        columns={columns(update)}
        data={groups}
        update={update}
      />
    </div>
  );
}
