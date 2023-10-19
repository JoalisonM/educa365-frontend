import { useEffect } from "react";
import * as z from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@ui/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { useStudent } from "@hooks/useStudent";
import { StudentProps } from "@dtos/studentDTO";
import { studentFormSchema } from "@schemas/studentFormSchema";

export type StudentFormInputs = z.infer<typeof studentFormSchema>;

interface StudentDetailsProps {
  student: StudentProps;
}

export const StudentDetails = ({ student }: StudentDetailsProps) => {
  const { toast } = useToast();
  const { updateStudent } = useStudent();

  const form = useForm<StudentFormInputs>({
    resolver: zodResolver(studentFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (student && student.nome && student.nome.length > 0) {
      setValue("nome", student.nome);
      setValue("cidadeCartorio", student.cidadeCartorio);
      setValue("cpf", student.cpf);
      setValue(
        "dataEmissaoCertidao",
        new Date(student.dataEmissaoCertidao),
      );
      setValue("dataNascimento", new Date(student.dataNascimento));
      setValue("etnia", student.etnia);
      setValue("nis", student.nis);
      setValue("nomeCartorio", student.nomeCartorio);
      setValue("nomeMae", student.nomeMae);
      setValue("nomePai", student.nomePai);
      setValue(
        "numeroRegistroNascimento",
        student.numeroRegistroNascimento,
      );
      setValue("rg", student.rg);
      setValue("sexo", student.sexo);
      setValue("sus", student.sus);
      setValue("ufCartorio", student.ufCartorio);
    }
  }, [student, setValue]);

  const handleSubmitStudent = (data: StudentFormInputs) => {
    const { turma, instituicao, ...dataStudent } = student;
    const { nome, rg, cpf, sus, nis, numeroRegistroNascimento, dataNascimento, nomeMae, nomePai } = data;
    const dataNascimentoString = format(dataNascimento, "yyyy-MM-dd");

    updateStudent({
      ...dataStudent,
      nome,
      rg,
      cpf,
      sus,
      nis,
      nomeMae,
      nomePai,
      turma_id: turma.id,
      numeroRegistroNascimento,
      instituicao_id: instituicao.id,
      dataNascimento: dataNascimentoString,
    });

    toast({
      title: "Estudante atualizado com sucesso.",
    });
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Dados do educando</h2>
          <span className="text-sm text-zinc-500">Atualize as informações do educando aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" form="details" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="details"
          onSubmit={handleSubmit(handleSubmitStudent)}
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-100"
        >
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form">
            <FormLabel htmlFor="name" className="text-sm font-medium text-zinc-700">Nome </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="name"
                          type="text"
                          placeholder="Digite o nome"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nome && errors.nome.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="rg" className="text-sm font-medium text-zinc-700">RG </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="rg"
                          type="text"
                          placeholder="Digite o RG"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.rg && errors.rg.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="cpf" className="text-sm font-medium text-zinc-700">CPF </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="cpf"
                          type="text"
                          placeholder="Digite o CPF"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.cpf && errors.cpf.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="sus" className="text-sm font-medium text-zinc-700">SUS </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="sus"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="sus"
                          type="text"
                          placeholder="Digite o SUS"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.sus && errors.sus.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="nis" className="text-sm font-medium text-zinc-700">NIS </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="nis"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="nis"
                          type="text"
                          placeholder="Digite o NIS"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nis && errors.nis.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="number_registry" className="text-sm font-medium text-zinc-700">N° do registro de nascimento</FormLabel>
            <div>
            <FormField
                control={form.control}
                name="numeroRegistroNascimento"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="number_registry"
                          type="text"
                          placeholder="Digite o n° do registro"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.numeroRegistroNascimento && errors.numeroRegistroNascimento.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="birthday" className="text-sm font-medium text-zinc-700">Data de nascimento </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="dataNascimento"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                      <Input.Control
                          id="birthday"
                          type="date"
                          onChange={(e) => {
                            const selectedDate = new Date(
                              e.target.value + "T00:00:00",
                            );
                            field.onChange(selectedDate);
                          }}
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.dataNascimento && errors.dataNascimento.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="motherName" className="text-sm font-medium text-zinc-700">Nome da mãe </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="nomeMae"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="motherName"
                          type="text"
                          placeholder="Digite o nome da mãe"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nomeMae && errors.nomeMae.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="fatherName" className="text-sm font-medium text-zinc-700">Nome do pai </FormLabel>
            <div>
            <FormField
                control={form.control}
                name="nomePai"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="fatherName"
                          type="text"
                          placeholder="Digite o nome do pai"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nomePai && errors.nomePai.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
            <Button type="submit" className="text-sm">Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
