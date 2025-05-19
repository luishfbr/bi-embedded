"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Group, Panel, User } from "@prisma/client";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAllGroups, updatePanel } from "../../../_actions";
import React from "react";

interface props {
  panel: Panel;
  onEdit: () => void;
}

interface toEdit {
  name: string;
}

export function EditPanel({ panel, onEdit }: props) {
  const { register, handleSubmit, reset } = useForm<Panel>();
  const [groups, setGroups] = React.useState<Group[]>();

  const fetchGroups = React.useCallback(async () => {
    const res = await getAllGroups();
    setGroups(res);
  }, []);

  const onSubmit = async (data: toEdit) => {
    try {
      await updatePanel(panel.id as string, data);
      onEdit();
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao editar informações.");
    }
  };

  React.useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"default"}
          className="w-full font-normal justify-between p-0 m-0"
        >
          <span>Editar</span>
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Edição de painél</DialogTitle>
          <DialogDescription>
            Realize a edição das informações do painél selecionado -{" "}
            {panel.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-2.5">
            <div className="flex flex-col gap-2 py-2 w-[40%]">
              <Label className="pl-2">Nome</Label>
              <Input
                required
                placeholder={panel.name || ""}
                className="col-span-3"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 w-full">
              <Label className="pl-2">URL</Label>
              <Input
                required
                placeholder={panel.url || ""}
                className="col-span-3"
                {...register("url")}
              />
            </div>
          </div>
          <div className="flex flex-row gap-x-2.5">
            <div className="flex flex-col gap-2 py-2 w-full">
              <Label className="pl-2">Descrição</Label>
              <Input
                placeholder={panel.description || ""}
                className="col-span-3"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col gap-2 py-2 w-[60%]">
              <Label className="pl-2">Grupo</Label>
              <select
                required
                className="col-span-3 border rounded px-3 py-2"
                {...register("groupId")}
                defaultValue={panel.groupId || ""}
              >
                <option value="" disabled>
                  Selecione um grupo
                </option>
                {groups?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter className="pt-6">
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
