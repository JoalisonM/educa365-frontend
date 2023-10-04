import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  MagnifyingGlass,
  PencilSimpleLine,
  Trash,
} from "@phosphor-icons/react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { EmployeeProps } from "@dtos/index";
import { EmployeeForm } from "./EmployeeForm";
import * as Input from "@components/Input";
import { Drawer } from "@components/Drawer";
import { Button } from "@components/Button";
import { AlertDialog } from "@components/Alert";
import { useEmployee } from "@hooks/useEmployee";

export const Employee = () => {
  const {
    employees,
    getEmployee,
    setEmployee,
    fetchEmployees,
    deleteEmployee,
  } = useEmployee();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleShowEmployee = (id?: string) => {
    if (id) {
      getEmployee(id);
    } else {
      setEmployee({} as EmployeeProps);
    }
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-5 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Funcionários</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleShowEmployee()}
            >
              Adicionar
            </Button>
          </SheetTrigger>

          <Drawer title="Registro de funcionário">
            <EmployeeForm />
          </Drawer>
        </Sheet>
      </div>

      <Input.Root className="mx-1 flex items-center gap-2 rounded-full bg-gray-50 border border-gray-300 px-3 py-2 shadow-sm md:w-96">
        <Input.Prefix>
          <MagnifyingGlass className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control placeholder="Pesquisar" />
      </Input.Root>

      <ScrollArea.Root className="w-full" type="scroll">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <table className="mt-4 w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-grayTableTitle">
                <th className="py-4 px-8 whitespace-nowrap">Nome</th>
                <th className="py-4 px-8 whitespace-nowrap">E-mail</th>
                <th className="py-4 px-8 whitespace-nowrap">Cargo</th>
                <th className="py-4 px-8 whitespace-nowrap">Nascimento</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="bg-zinc-100 text-zinc-700 text-left"
                  >
                    <td className="rounded-tl-md rounded-bl-md py-5 px-8">
                      {employee.nome}
                    </td>
                    <td className="py-5 px-8">{employee.email}</td>
                    <td className="py-5 px-8">{employee.cargo}</td>
                    <td className="py-5 px-8">{employee.dataNascimento}</td>
                    <td className=" rounded-tr-md rounded-br-md py-5 px-8 text-right space-x-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleShowEmployee(employee.id)}
                          >
                            <PencilSimpleLine className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>

                        <Drawer title="Atualizar funcionário">
                          <EmployeeForm />
                        </Drawer>
                      </Sheet>
                      <AlertDialog
                        id={employee.id}
                        title="Você tem certeza absoluta?"
                        description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o funcionário."
                        onDelete={handleDelete}
                      >
                        <Button type="button" variant="danger">
                          <Trash className="h-5 w-5" />
                        </Button>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex h-1 touch-none select-none bg-zinc-100"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};
