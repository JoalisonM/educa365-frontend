import { useEffect } from "react";
import * as z from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@ui/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import * as Select from "@components/Select";
import { useEmployee } from "@hooks/useEmployee";
import { AddressFieldsForm } from "./AddressFieldsForm";
import { genders, occupations } from "@configs/constant/employee";
import { SheetClose } from "@ui/components/ui/sheet";
import { employeeFormSchema } from "@schemas/employeeFormSchema";

export type EmployeeFormInputs = z.infer<typeof employeeFormSchema>;

export const EmployeeForm = () => {
  const form = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeFormSchema),
  });
  const {
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = form;
  const { toast } = useToast();
  const { employee, createEmployee, updateEmployee } = useEmployee();

  useEffect(() => {
    if (employee.id) {
      setValue("rg", employee.rg);
      setValue("cpf", employee.cpf);
      setValue("nome", employee.nome);
      setValue("email", employee.email);
      setValue("cargo", employee.cargo);
      setValue("sexo", String(employee.sexo));
      setValue("endereco", employee.endereco);
      setValue("nascimento", new Date(employee.dataNascimento));
    }
  }, [employee, setValue]);

  const handleSaveEmployee = async (data: EmployeeFormInputs) => {
    const { nome, email, nascimento, rg, cpf, cargo, sexo, endereco } = data;
    const formattedDateString = format(nascimento, "yyyy-MM-dd");
    const gender = sexo !== "False";

    if (!employee.id) {
      createEmployee({
        nome,
        email,
        dataNascimento: formattedDateString,
        rg,
        cpf,
        cargo,
        sexo: gender,
        endereco,
        senha: "12345",
      });

      reset();

      toast({
        title: "Funcionário adicionado com sucesso",
      });
    } else {
      updateEmployee({
        id: employee.id,
        nome,
        email,
        dataNascimento: formattedDateString,
        rg,
        cpf,
        sexo: gender,
        cargo,
        endereco,
        senha: "12345",
      });

      toast({
        title: "Funcionário atualizado com sucesso",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSaveEmployee)}
        className="flex flex-1 flex-col w-full gap-6 pt-8"
      >
        <section className="flex flex-col w-full gap-4 border-b border-gray-200 pb-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="name">Nome</FormLabel>
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <FormControl>
                    <Input.Root>
                      <Input.Control
                        id="email"
                        type="email"
                        placeholder="Digite o e-mail"
                        {...field}
                      />
                    </Input.Root>
                  </FormControl>
                  <FormMessage className="text-sm font-normal text-error-500">
                    {errors.email && errors.email.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <FormField
              control={form.control}
              name="rg"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="rg">RG</FormLabel>
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
                    {errors.cpf && errors.cpf.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <FormField
              control={form.control}
              name="nascimento"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="birthday">Data de nascimento</FormLabel>
                  <FormControl>
                    <Input.Root>
                      <Input.Control
                        id="birthday"
                        type="date"
                        placeholder="Digite o RG"
                        onChange={(e) => {
                          const selectedDate = new Date(
                            e.target.value + "T00:00:00",
                          );
                          field.onChange(selectedDate);
                        }}
                        value={
                          field.value
                            ? field.value.toISOString().split("T")[0]
                            : employee.dataNascimento
                            ? new Date(employee.dataNascimento)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </Input.Root>
                  </FormControl>
                  <FormMessage className="text-sm font-normal text-error-500">
                    {errors.nascimento && errors.nascimento.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select.Root
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Selecione o sexo"
                    >
                      {Object.entries(genders).map(([key, gender]) => (
                        <Select.Item
                          key={key}
                          value={gender.value}
                          text={gender.title}
                        />
                      ))}
                    </Select.Root>
                  </FormControl>
                  <FormMessage className="text-sm font-normal text-error-500">
                    {errors.sexo && errors.sexo.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Select.Root
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Selecione o cargo"
                    >
                      {Object.entries(occupations).map(([key, occupation]) => (
                        <Select.Item
                          key={key}
                          value={occupation.value}
                          text={occupation.title}
                        />
                      ))}
                    </Select.Root>
                  </FormControl>
                  <FormMessage className="text-sm font-normal text-error-500">
                    {errors.cargo && errors.cargo.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="flex flex-col w-full gap-4">
          <AddressFieldsForm form={form} errors={errors} />
        </section>

        <div className="mt-auto flex items-center justify-end gap-4 pt-5">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit" disabled={!isDirty || !isValid}>
              Finalizar
            </Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
};
