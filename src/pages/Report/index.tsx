import {
  MagnifyingGlass,
  DotsThreeVertical,
} from "@phosphor-icons/react";
import { Sheet, SheetTrigger } from "@ui/components/ui/sheet";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { Tooltip } from "@components/Tooltip";
import { Drawer } from "@components/Drawer";
import { DropdownMenu } from "@components/DropdownMenu";
import { ReportForm } from "./ReportForm";

export const Report = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-5 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Relatórios</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="primary"
            >
              Adicionar
            </Button>
          </SheetTrigger>

          <Drawer title="Adicionar relatórios">
            <ReportForm />
          </Drawer>
        </Sheet>
      </div>

      <Input.Root className="mx-1 flex items-center gap-2 rounded-full bg-gray-50 border border-gray-300 px-3 py-2 shadow-sm md:w-96">
        <Input.Prefix>
          <MagnifyingGlass className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control placeholder="Pesquisar" />
      </Input.Root>

      <section className="w-full grid grid-cols-5 gap-4 mt-4">
        <div className="flex flex-col gap-3 p-6 rounded-lg bg-zinc-100">
          <div className="flex items-center gap-2">
            <h3 className="text-ellipsis overflow-hidden whitespace-nowrap text-zinc-700">Lorem ipsum dolor sit amet consectetur</h3>
            <Tooltip content="Mais opções">
              <DropdownMenu>
                <Button type="button" variant="ghost">
                  <DotsThreeVertical weight="bold" className="h-5 w-5" />
                </Button>
              </DropdownMenu>
            </Tooltip>
          </div>

          <img className="rounded-md" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </section>
    </div>
  );
};
