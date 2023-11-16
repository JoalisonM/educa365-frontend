import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@ui/components/ui/select";
import { FormControl } from "@/components/ui/form";
import * as SelectRadix from "@radix-ui/react-select";

interface SelectProps {
  children: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

interface SelectItemProps extends SelectRadix.SelectItemProps {
  text: string;
}

export const Item = ({ text, ...props }: SelectItemProps) => {
  return (
    <SelectItem
      className="flex items-center gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-zinc-50"
      {...props}
    >
      {text}
    </SelectItem>
  );
};

export const Root = ({
  value,
  onChange,
  children,
  placeholder,
}: SelectProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <FormControl>
        <SelectTrigger className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm data-[placeholder]:text-zinc-500 outline-none focus:border-blueLagoon focus:ring-4 focus:ring-emerald-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent
        side="bottom"
        position="popper"
        sideOffset={6}
        className="w-[--radix-select-trigger-width] animate-slideDownAndFade rounded-lg border border-zinc-200 bg-white overflow-hidden"
      >
        {children}
      </SelectContent>
    </Select>
  );
};
