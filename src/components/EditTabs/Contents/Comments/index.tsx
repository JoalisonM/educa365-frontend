import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@ui/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { useStudent } from "@hooks/useStudent";
import { StudentProps } from "@dtos/studentDTO";
import { useComments } from "@hooks/useComments";
import { Checkbox } from "@/components/ui/checkbox";
import { commentsFormSchema } from "@schemas/commentsFormSchema";

export type CommentsFormInputs = z.infer<typeof commentsFormSchema>;

interface CommentsProps {
  student: StudentProps;
}

export const Comments = ({ student }: CommentsProps) => {
  const { toast } = useToast();
  const { updateStudent } = useStudent();
  const { updateComments } = useComments();

  const form = useForm<CommentsFormInputs>({
    resolver: zodResolver(commentsFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (student && student.observacoesEducando) {
      setValue("alimentacao", student.observacoesEducando.alimentacao);
      setValue("laudoMedico", student.observacoesEducando.laudoMedico ? "1" : "0");
      setValue("medicacao", student.observacoesEducando.medicacao);
      setValue("deficiencia", student.observacoesEducando.deficiencia);
      setValue("medicacaoDeficiencia", student.observacoesEducando.medicacaoDeficiencia);
      setValue("produtoHigienePessoal", student.observacoesEducando.produtoHigienePessoal);
      setValue("tipoSangue", student.observacoesEducando.tipoSangue);
    }
  }, [student, setValue]);

  const handleSubmitComments = (data: CommentsFormInputs) => {
    const { laudoMedico ,...newData } = data;
    const laudo = laudoMedico === "1" ? true : false;
    const { observacoesEducando } = student;

    updateComments({
      ...newData,
      laudoMedico: laudo,
      id: observacoesEducando.id,
    });
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Observações específicas</h2>
          <span className="text-sm text-zinc-500">Atualize as informações das observações específicas aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" form="comments" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="comments"
          onSubmit={handleSubmit(handleSubmitComments)}
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-100"
        >
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form">
            <FormLabel htmlFor="food" className="text-sm font-medium text-zinc-700">Alimentação</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="alimentacao"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="food"
                          type="text"
                          placeholder="Digite a alimentação"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.alimentacao && errors.alimentacao.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="medication" className="text-sm font-medium text-zinc-700">Medicação</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="medicacao"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="medication"
                          type="text"
                          placeholder="Digite a alimentação"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.medicacao && errors.medicacao.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="hygiene" className="text-sm font-medium text-zinc-700">Produto higiene pessoal</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="produtoHigienePessoal"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="hygiene"
                          type="text"
                          placeholder="Digite a alimentação"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.produtoHigienePessoal && errors.produtoHigienePessoal.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="blood" className="text-sm font-medium text-zinc-700">Tipo do sangue</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="tipoSangue"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="blood"
                          type="text"
                          placeholder="Digite a alimentação"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.tipoSangue && errors.tipoSangue.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="disability_medication" className="text-sm font-medium text-zinc-700">Medicação da deficiência</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="medicacaoDeficiencia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="disability_medication"
                          type="text"
                          placeholder="Digite a alimentação"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.medicacaoDeficiencia && errors.medicacaoDeficiencia.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="report" className="text-sm font-medium text-zinc-700">Laudo médico</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="laudoMedico"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="report"
                          type="text"
                          placeholder="Digite a alimentação"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.laudoMedico && errors.laudoMedico.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel className="text-sm font-medium text-zinc-700">Deficiência</FormLabel>
            <div className="flex gap-8 flex-wrap">
              <FormField
                control={form.control}
                name="deficiencia.auditiva"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Auditiva</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deficiencia.fisica"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Física</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deficiencia.intelectual"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Intelectual</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deficiencia.multipla"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Múltipla</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deficiencia.visual"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Visual</FormLabel>
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
