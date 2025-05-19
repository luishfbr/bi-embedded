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
import type { User } from "@prisma/client";
import { toast } from "sonner";
import { deleteUser } from "../../_actions";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";

interface Props {
  user: User;
  onDelete: () => void;
  userSessionId: string;
}

export function DeleteUser({ user, onDelete, userSessionId }: Props) {
  const handleDelete = async () => {
    try {
      await deleteUser(user.id as string);
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao remover usuário.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full p-0 m-0" asChild>
        <Button
          variant={"ghost"}
          size={"default"}
          className="w-full font-normal justify-between p-0 m-0"
          disabled={userSessionId === user.id}
        >
          <span>Excluir</span>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, fique atento ao usuário que está
            excluindo.
            <br />
            <br />
            Usuário: {user.name || user.email}
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
