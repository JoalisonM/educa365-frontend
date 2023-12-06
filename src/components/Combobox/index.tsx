import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxType = {
  form: any;
  value: any;
  items: any;
  name: string;
  label: string;
  placeholder: string;
  itemsOptions: Array<string>;
  setValue: (value: any) => void;
}

export function Combobox({ form, name, label, placeholder, items, itemsOptions, value, setValue }: ComboboxType) {
  const [open, setOpen] = useState(false);
  const valueLabel = items.find((item: any) => item[itemsOptions[0]] === value)?.[itemsOptions[1]];

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={label}
        className="font-medium text-sm"
      >{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between",
              !value && "text-muted-foreground",
            )}
          >
            {value && Object.keys(value).length > 0
              ? valueLabel
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {items.map((item: any) => (
                <CommandItem
                  key={item[itemsOptions[0]]}
                  value={item[itemsOptions[0]]}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item[itemsOptions[0]] ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item[itemsOptions[1]]}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <small className="text-zinc-500">
        Este é o responsável que vai ser cadastrado no educando.
      </small>
    </div>
  );
}
