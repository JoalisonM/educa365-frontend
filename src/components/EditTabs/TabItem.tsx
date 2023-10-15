import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

interface TabItemProps {
  value: string;
  title: string;
  isSelected?: boolean;
}

export const TabItem = ({ value, title, isSelected = false }: TabItemProps) => {
  return (
    <Tabs.Trigger value={value} className="relative px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-blueLagoon data-[state=active]:text-blueLagoon">
      <span>{title}</span>

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-blueLagoon"
        />
      )}
    </Tabs.Trigger>
  );
};
