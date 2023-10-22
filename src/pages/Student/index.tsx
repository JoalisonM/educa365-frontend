import { useEffect } from "react";
import {
  Trash,
  MagnifyingGlass,
  PencilSimpleLine,
} from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { Button } from "@components/Button";
import * as Input from "@components/Input";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@hooks/useStudent";
import { AlertDialog } from "@components/Alert";
import { formatDate, formatDateToAge } from "@utils/format-date";
import { useToast } from "@ui/components/ui/use-toast";

export const Student = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { students, getStudent, fetchStudents, deleteStudent } = useStudent();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleNavigate = (to?: string, id?: string) => {
    navigate(`${to}`, { state: { id: id } });
  };

  const handleEdit = async (id: string) => {
    await getStudent(id);

    handleNavigate(id, id);
  };

  const handleDelete = (id: string | number) => {
    deleteStudent(String(id));

    toast({
      title: "Estudante deletado com sucesso",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-5 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Educandos</h1>

        <Button
          type="button"
          variant="primary"
          onClick={() => handleNavigate("new-student")}
        >
          Adicionar
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
                <th className="py-4 px-8 whitespace-nowrap">Nome da mãe</th>
                <th className="py-4 px-8 whitespace-nowrap">Turma</th>
                <th className="py-4 px-8 whitespace-nowrap">Idade</th>
                <th className="py-4 px-8 whitespace-nowrap">Data de nascimento</th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((student) => (
                <tr key={student.id} className="bg-zinc-100 text-zinc-700 text-left">
                <td className="rounded-tl-md rounded-bl-md py-5 px-8">
                  {student.nome}
                </td>
                <td className="py-5 px-8">{student.nomeMae}</td>
                <td className="py-5 px-8">{student.turma.nome}</td>
                <td className="py-5 px-8">{formatDateToAge(student.dataNascimento)}</td>
                <td className="py-5 px-8">{formatDate(student.dataNascimento)}</td>
                <td className=" rounded-tr-md rounded-br-md py-5 px-8 text-right space-x-4">
                  <Button type="button" variant="ghost" onClick={() => handleEdit(student.id)}>
                    <PencilSimpleLine className="h-5 w-5" />
                  </Button>
                  <AlertDialog
                    id={student.id}
                    title="Você tem certeza absoluta?"
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o educando."
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
