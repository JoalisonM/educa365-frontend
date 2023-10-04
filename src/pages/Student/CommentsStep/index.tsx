import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const { student, addStudentComments, setCurrentStep } = useFormContext();

  const form = useForm<CommentsFormInputs>({
    resolver: zodResolver(commentsFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = form;

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  useEffect(() => {
    if (student && student.observacao) {
      setValue("alergia", student.observacao.alergia);
      setValue("alimentacao", student.observacao.alimentacao);
      setValue("laudo_medico", student.observacao.laudo_medico);
      setValue("medicacao", student.observacao.medicacao);
      setValue("deficiencia", student.observacao.deficiencia);
      setValue("medicacao_deficiencia", student.observacao.medicacao_deficiencia);
      setValue("produto_higiene_corporal", student.observacao.produto_higiene_corporal);
      setValue("tipo_sangue", student.observacao.tipo_sangue);
    }
  }, [student, setValue]);

  const handleBackStep = () => {
    navigate("/students/new-student/address");
  };

  const handleNextStep = () => {
    navigate("/students/new-student/parents");
  };

  const handleSubmitAddress = (data: CommentsFormInputs) => {
    addStudentComments(data);

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
                name="alergia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="allergy">Alergia</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="allergy" type="text" placeholder="Digite a(s) alergia(s)" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.alergia && errors.alergia.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
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
                name="produto_higiene_corporal"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="hygiene">Produto higiene corporal</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="hygiene" type="text" placeholder="Digite o produto" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.produto_higiene_corporal && errors.produto_higiene_corporal.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo_sangue"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="blood">Tipo do sangue</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="blood" type="text" placeholder="Digite o tipo do sangue" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.tipo_sangue && errors.tipo_sangue.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="medicacao_deficiencia"
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
                      {errors.medicacao_deficiencia && errors.medicacao_deficiencia.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="laudo_medico"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="report">Laudo médico</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control id="report" type="text" placeholder="Digite o laudo médico" {...field} />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.laudo_medico && errors.laudo_medico.message}
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
