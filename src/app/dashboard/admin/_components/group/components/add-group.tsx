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
import { createGroup } from "../../../_actions";

interface Props {
  onUpdate: () => void;
}

interface GroupCreateProps {
  name: string;
}

export function AddGroup({ onUpdate }: Props) {
  const { register, handleSubmit, reset } = useForm<GroupCreateProps>();

  const onSubmit = async (data: GroupCreateProps) => {
    try {
      await createGroup(data.name as string);
      reset();
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error(
        "Falha ao criar grupo, verifique se existe outro com o mesmo nome."
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          Novo Grupo
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <Input
            type="text"
            placeholder="Nome do Grupo"
            required
            {...register("name")}
          />
          <Button type="submit">Adicionar</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
