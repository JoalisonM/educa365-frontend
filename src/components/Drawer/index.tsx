import { ReactNode } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@ui/components/ui/sheet";

interface DrawerProps {
  title: string;
  children: ReactNode;
  variant?: "md" | "sm" | "lg" | null | undefined;
}

export const Drawer = (props: DrawerProps) => {
  const { title, children, variant } = props;

  return (
    <SheetContent variant={variant}>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      {children}
    </SheetContent>
  );
};
