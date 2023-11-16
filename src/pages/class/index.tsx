import { useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  Trash,
  MagnifyingGlass,
  ChalkboardTeacher,
} from "@phosphor-icons/react";
import { Sheet, SheetTrigger } from "@ui/components/ui/sheet";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { Tooltip } from "@components/Tooltip";
import { AlertDialog } from "@components/Alert";
import { useClass } from "@hooks/useClass";
import { Drawer } from "@components/Drawer";
import { TeacherForm } from "./TeacherForm";

export const Class = () => {
  const {
    classes,
    getClass,
    deleteClass,
    fetchClasses,
    createClasses,
  } = useClass();
  const disableClass = classes.length > 0;

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses, createClasses]);

  const handleShowTeacherClass = (id: string) => {
    if (id) {
      getClass(id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-5 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Turmas</h1>

        <Button
          type="button"
          variant="primary"
          disabled={disableClass}
          onClick={() => createClasses()}
        >
          Gerar turmas
        </Button>
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
                <th className="py-4 px-8 whitespace-nowrap">turno</th>
                <th className="py-4 px-8 whitespace-nowrap">Instituição</th>
                <th className="py-4 px-8 whitespace-nowrap">Professor</th>
              </tr>
            </thead>
            <tbody>
              {classes &&
                classes.map((institutionClass) => (
                  <tr
                    key={institutionClass.id}
                    className="bg-zinc-100 text-zinc-700 text-left"
                  >
                    <td className="rounded-tl-md rounded-bl-md py-5 px-8">
                      {institutionClass.nome}
                    </td>
                    <td className="py-5 px-8">{institutionClass.turno}</td>
                    <td className="py-5 px-8">{institutionClass.instituicao.nome}</td>
                    <td className="py-5 px-8">{institutionClass.professor.nome}</td>
                    <td className=" rounded-tr-md rounded-br-md py-5 px-8 text-right space-x-4">
                      <Sheet>
                        <SheetTrigger>
                          <Tooltip content="Adicionar professor(a)">
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => handleShowTeacherClass(institutionClass.id)}
                            >
                              <ChalkboardTeacher className="h-5 w-5" />
                            </Button>
                          </Tooltip>
                        </SheetTrigger>
                        <Drawer variant="sm" title="Adicionar professor(a)">
                          <TeacherForm classId={institutionClass.id} />
                        </Drawer>
                      </Sheet>
                      <AlertDialog
                        id={institutionClass.id}
                        title="Você tem certeza absoluta?"
                        description="Essa ação não pode ser desfeita. Isso excluirá permanentemente a turma."
                        onDelete={deleteClass}
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
