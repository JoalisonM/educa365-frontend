import { ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";

interface TabContentProps {
  value: string;
  children: ReactNode;
}

export const TabContent = ({ value, children }: TabContentProps) => {
  return (
    <Tabs.Content value={value}>
      {children}
    </Tabs.Content>
  );
};
