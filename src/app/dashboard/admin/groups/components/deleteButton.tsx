import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Group } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteGroup } from "../../_actions";

interface Props {
  group: Group;
  onDelete: () => void;
}

export function DeleteButton({ group, onDelete }: Props) {
  const handleDelete = async () => {
    try {
      await deleteGroup(group.id as string);
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao remover grupo.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, fique atento ao grupo que está
            excluindo.
            <br />
            <br />
            Grupo: {group.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
