import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { commentsFormSchema } from "@schemas/commentsFormSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

export type CommentsFormInputs = z.infer<typeof commentsFormSchema>;

export const CommentsStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { student, addStudentComments, setCurrentStep } = useFormContext();

  const form = useForm<CommentsFormInputs>({
    resolver: zodResolver(commentsFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    setCurrentStep(3);
  }, []);

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

  const handleBackStep = () => {
    navigate(`${location.pathname.replace("comments", "address")}`);
  };

  const handleNextStep = () => {
    navigate(`${location.pathname.replace("comments", "parents")}`);
  };

  const handleSubmitAddress = (data: CommentsFormInputs) => {
    const { laudoMedico ,...newData } = data;
    const laudo = laudoMedico === "1" ? true : false;

    addStudentComments({
      ...newData,
      laudoMedico: laudo,
    });

    handleNextStep();
  };

  return (
    <FormLayout>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleSubmitAddress)} className="flex flex-col w-full gap-6">
          <section className="flex flex-col w-full gap-4">
            <h1 className="text-2xl font-bold">Observações específicas</h1>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="alimentacao"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="food">Alimentação</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="food" type="text" placeholder="Digite a alimentação" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.alimentacao && errors.alimentacao.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="produtoHigienePessoal"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="hygiene">Produto higiene pessoal</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="hygiene" type="text" placeholder="Digite o produto" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.produtoHigienePessoal && errors.produtoHigienePessoal.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="medicacao"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="medication">Medicação</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="medication" type="text" placeholder="Digite a medicação" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.medicacao && errors.medicacao.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipoSangue"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="blood">Tipo do sangue</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="blood" type="text" placeholder="Digite o tipo do sangue" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.tipoSangue && errors.tipoSangue.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="medicacaoDeficiencia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="disability_medication">Medicação da deficiência</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="disability_medication"
                          type="text"
                          placeholder="Digite a medicação da deficiência"
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
              <FormField
                control={form.control}
                name="laudoMedico"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="report">Laudo médico</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="report" type="text" placeholder="Digite o laudo médico" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.laudoMedico && errors.laudoMedico.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <FormLabel>Deficiência</FormLabel>
              <div className="flex gap-8">
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
          </section>

          <div className="flex items-center justify-end gap-4 pt-5">
            <Button type="button" variant="outline" onClick={() => handleBackStep()}>
              Voltar
            </Button>
            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
