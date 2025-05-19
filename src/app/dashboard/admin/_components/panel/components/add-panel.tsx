"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPanel, getAllGroups } from "../../../_actions";
import { Group, type Panel } from "@prisma/client";
import React from "react";

interface Props {
  onUpdate: () => void;
}

export function AddPanel({ onUpdate }: Props) {
  const { register, handleSubmit, reset } = useForm<Panel>();
  const [groups, setGroups] = React.useState<Group[]>();

  const fetchGroups = React.useCallback(async () => {
    const res = await getAllGroups();
    setGroups(res);
  }, []);

  const onSubmit = async (data: Panel) => {
    try {
      await createPanel(data);
      reset();
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error(
        "Falha ao criar painél, verifique se existe outro com o mesmo nome."
      );
    }
  };

  React.useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          Novo Painél
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[60vw]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="Nome"
              required
              {...register("name")}
              className="w-[40%]"
            />
            <Input
              type="text"
              placeholder="URL"
              required
              {...register("url")}
              className="w-full"
            />
          </div>
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="Descrição"
              {...register("description")}
            />
            <select
              required
              {...register("groupId")}
              className="border rounded px-3 py-2 w-full bg-background"
              defaultValue=""
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
          <Button type="submit">Adicionar</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
