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
import type { User } from "@prisma/client";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editUserName } from "../../_actions";

interface props {
  user: User;
  onEdit: () => void;
}

interface toEdit {
  name: string;
}

export function EditUser({ user, onEdit }: props) {
  const { register, handleSubmit, reset } = useForm<toEdit>();

  const onSubmit = async (data: toEdit) => {
    try {
      await editUserName(user.id, data.name as string);
      onEdit();
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao editar informações.");
    }
  };
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
          <DialogTitle>Edição de usuário</DialogTitle>
          <DialogDescription>
            Somente a atualização de nome está disponível no momento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 py-2">
            <Label className="pl-2">Nome Completo</Label>
            <Input
              required
              placeholder={user.name || ""}
              className="col-span-3"
              {...register("name")}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
