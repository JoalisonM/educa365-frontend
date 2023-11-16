import { ReactNode } from "react";
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { DownloadSimple } from "@phosphor-icons/react";

interface DropdownMenuProps {
  children: ReactNode;
}

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return (
    <DropdownMenuPrimitive>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <DownloadSimple className="mr-2 h-4 w-4" />
          <span>Fazer download</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>Deletar arquivo</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
};
