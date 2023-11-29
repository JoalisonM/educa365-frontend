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

import { useReport } from "@hooks/useReport";

interface DropdownMenuProps {
  id: string;
  children: ReactNode;
  fileUrl: string;
}

export const DropdownMenu = ({ id, fileUrl, children }: DropdownMenuProps) => {
  const { deleteReport } = useReport();

  const handleDeleteReport = (id: string) => {
    deleteReport(id);
  };

  return (
    <DropdownMenuPrimitive>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer">
          <DownloadSimple className="mr-2 h-4 w-4" />
          <span>
            <a href={fileUrl} download>Fazer download</a>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteReport(id)} className="cursor-pointer">
          <Trash className="mr-2 h-4 w-4" />
          <span>Deletar arquivo</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
};
