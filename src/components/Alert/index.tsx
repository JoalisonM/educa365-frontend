import { ReactNode } from "react";
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RootProps {
  id: string;
  title: string;
  children: ReactNode;
  description?: string;
  onDelete: (id: string) => void;
}

export const AlertDialog = ({
  id,
  title,
  children,
  description,
  onDelete,
}: RootProps) => {
  return (
    <AlertDialogPrimitive>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border text-base border-zinc-300 text-zinc-700 hover:bg-zinc-50">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white text-base bg-error-500 hover:bg-error-600"
            onClick={() => onDelete(id)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  );
};
