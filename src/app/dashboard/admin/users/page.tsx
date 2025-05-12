import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, UserPlus } from "lucide-react";
import React from "react";
import { UserTable } from "./_components/user-table";
import { GroupTable } from "./_components/group-table";

export default function Page() {
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Página de criação de usuários e grupos</CardTitle>
        <CardDescription>
          Crie um novo usuário e o insira em grupos para que tenha acesso aos
          dashboards corretos.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full flex md:flex-row flex-col gap-2 items-center justify-center">
        <Card className="flex w-full h-full">
          <CardHeader>
            <CardTitle>Usuários</CardTitle>
            <CardDescription>
              Tabela de usuários atualmente cadastrados no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <UserTable />
          </CardContent>
          <CardFooter>
            <Button>
              <UserPlus />
              Criar novo usuário
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex w-full h-full">
          <CardHeader>
            <CardTitle>Grupos</CardTitle>
            <CardDescription>
              Tabela de grupos atualmente cadastrados no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <GroupTable />
          </CardContent>
          <CardFooter>
            <Button>
              <Plus />
              Criar novo grupo
            </Button>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
