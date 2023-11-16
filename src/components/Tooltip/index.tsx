import { ReactNode } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipPrimitive,
} from "@ui/components/ui/tooltip";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent><p>{content}</p></TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};
