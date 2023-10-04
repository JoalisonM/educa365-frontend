import { ReactNode } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface DrawerProps {
  title: string;
  children: ReactNode;
}

export const Drawer = (props: DrawerProps) => {
  const { title, children } = props;

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      {children}
    </SheetContent>
  );
};
