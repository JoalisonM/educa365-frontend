import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import * as Select from "@components/Select";
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { conditionsFormSchema } from "@schemas/conditionsFormSchema";
import { home_ownership, house_type } from "@configs/constant/student";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

export type ConditionsFormInputs = z.infer<typeof conditionsFormSchema>;

export const ParentsConditionsStep = () => {
  const navigate = useNavigate();
  const {
    student,
    setCurrentStep,
    addStudentParentsLivingConditions,
    addStudentParentsHousingConditions,
  } = useFormContext();

  const form = useForm<ConditionsFormInputs>({
    resolver: zodResolver(conditionsFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (student && student.responsaveis && student.responsaveis.condicoes_moradia) {
      setValue("housing.agua_cagepa", student.responsaveis.condicoes_moradia.agua_cagepa);
      setValue("housing.banheiro_com_fossa", student.responsaveis.condicoes_moradia.banheiro_com_fossa);
      setValue("housing.energia", student.responsaveis.condicoes_moradia.energia);
      setValue("housing.poco", student.responsaveis.condicoes_moradia.poco);
      setValue("housing.posse_casa", student.responsaveis.condicoes_moradia.posse_casa);
      setValue("housing.tipo_casa", student.responsaveis.condicoes_moradia.tipo_casa);
    }

    // if (student && student.responsaveis && student.responsaveis.condicoes_vida) {
    //   setValue("", student.responsaveis.condicoes_moradia.agua_cagepa);
    //   setValue("banheiro_com_fossa", student.responsaveis.condicoes_moradia.banheiro_com_fossa);
    //   setValue("energia", student.responsaveis.condicoes_moradia.energia);
    //   setValue("poco", student.responsaveis.condicoes_moradia.poco);
    //   setValue("posse_casa", student.responsaveis.condicoes_moradia.posse_casa);
    //   setValue("tipo_casa", student.responsaveis.condicoes_moradia.tipo_casa);
    // }
  }, [student, setValue]);

  useEffect(() => {
    setCurrentStep(5);
  }, []);

  const handleBackStep = () => {
    navigate("/students/new-student/parents");
  };

  const handleSubmitHousing = (data: ConditionsFormInputs) => {
    const { housing, living } = data;

    addStudentParentsLivingConditions(living);
    addStudentParentsHousingConditions(housing);
  };

  return (
    <FormLayout>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleSubmitHousing)} className="flex flex-col w-full gap-6">
          <section className="flex flex-col w-full gap-4">
            <h1 className="text-2xl font-bold">Condições de moradia</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="housing.tipo_casa"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Tipo da casa</FormLabel>
                    <FormControl>
                      <Select.Root
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione o tipo"
                      >
                        {Object.entries(house_type).map(([key, type]) => (
                          <Select.Item key={key} value={type.value} text={type.title} />
                        ))}
                      </Select.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.housing?.tipo_casa && errors.housing?.tipo_casa.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="housing.posse_casa"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Posse da casa</FormLabel>
                    <FormControl>
                      <Select.Root
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione a posse"
                      >
                        {Object.entries(home_ownership).map(([key, ownership]) => (
                          <Select.Item key={key} value={ownership.value} text={ownership.title} />
                        ))}
                      </Select.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.housing?.posse_casa && errors.housing?.posse_casa.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <FormLabel>A casa possui</FormLabel>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="housing.agua_cagepa"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Água da cagepa</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="housing.banheiro_com_fossa"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Banheiro com fossa</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="housing.energia"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Energia</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="housing.poco"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Poço</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col w-full gap-4">
            <h1 className="text-2xl font-bold">Condições de vida</h1>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
              <FormField
                control={form.control}
                name="living.trabalho_familia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="work">Trabalho da família</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="work"
                          type="text"
                          placeholder="Digite o trabalho"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.living?.trabalho_familia && errors.living?.trabalho_familia.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="living.programa_governo"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="government">Está em algum programa do governo?</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="government"
                          type="text"
                          placeholder="Digite a renda"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.living?.programa_governo && errors.living?.programa_governo.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="living.renda_mensal_familia"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="income">Renda mensal da família</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="income"
                          type="number"
                          placeholder="Digite a renda"
                          value={value}
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.living?.renda_mensal_familia &&
                        errors.living?.renda_mensal_familia.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="living.quantas_pessoas_trabalham_casa"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="how_many">Quantas pessoas trabalham em casa?</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="how_many"
                          type="number"
                          placeholder="Digite a renda"
                          value={value}
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.living?.quantas_pessoas_trabalham_casa &&
                        errors.living?.quantas_pessoas_trabalham_casa.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <FormLabel>Problemas enfrentados pela família</FormLabel>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.alcool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Álcool</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.desemprego"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Desemprego</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.drogas"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Drogas</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.fome"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Fome</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.lazer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Lazer</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.saude"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Saúde</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living.problema_enfrentado.violencia"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Violência</FormLabel>
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
            <Button type="submit">FInalizar</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
