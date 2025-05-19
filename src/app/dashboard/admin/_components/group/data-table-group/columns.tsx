"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Group } from "@prisma/client";
import { UserActions } from "../../../users/components/actions-button";
import { DeleteButton } from "../../../groups/components/deleteButton";
import { UsersList } from "../../../groups/components/users-list";

export const getUserColumns = (update: () => void): ColumnDef<Group>[] => [
  {
    accessorKey: "name",
    header: () => <div>Nome</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Criado em</div>,
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return new Date(createdAt).toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "users",
    header: () => <div>Usuários</div>,
    cell: ({ row }) => {
      const group = row.original;
      return <UsersList group={group} />;
    },
  },
  {
    id: "actions",
    header: () => <div>Ações</div>,
    cell: ({ row }) => {
      const group = row.original;
      return <DeleteButton onDelete={update} group={group} />;
    },
  },
];
