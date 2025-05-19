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
import type { Panel, User } from "@prisma/client";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deletePanel } from "../../../_actions";

interface Props {
  panel: Panel;
  onDelete: () => void;
}

export function DeletePanel({ panel, onDelete }: Props) {
  const handleDelete = async () => {
    try {
      await deletePanel(panel.id as string);
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao remover painél.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full p-0 m-0" asChild>
        <Button
          variant={"ghost"}
          size={"default"}
          className="w-full font-normal justify-between p-0 m-0"
        >
          <span>Excluir</span>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, fique atento ao painél que está
            excluindo.
            <br />
            <br />
            Painél: {panel.name}
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
