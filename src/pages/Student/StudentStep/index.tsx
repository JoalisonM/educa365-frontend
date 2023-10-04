import { useEffect } from "react";
import * as z from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { studentFormSchema } from "@schemas/studentFormSchema";
import { genders, ethnicities } from "@configs/constant/employee";

export type StudentFormInputs = z.infer<typeof studentFormSchema>;

export const StudentStep = () => {
  const navigate = useNavigate();
  const { student, addStudent, setCurrentStep } = useFormContext();

  const form = useForm<StudentFormInputs>({
    resolver: zodResolver(studentFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = form;

  useEffect(() => {
    setCurrentStep(1);
  }, []);

  useEffect(() => {
    if (student && student.nome && student.nome.length > 0) {
      setValue("nome", student.nome);
      setValue("cidade_cartorio", student.cidade_cartorio);
      setValue("cidade_nascenca", student.cidade_nascenca);
      setValue("cpf", student.cpf);
      setValue(
        "data_emissao_certidao",
        new Date(student.data_emissao_certidao),
      );
      setValue("data_nascimento", new Date(student.data_nascimento));
      setValue("etnia", student.etnia);
      setValue("nis", student.nis);
      setValue("nome_cartorio", student.nome_cartorio);
      setValue("nome_mae", student.nome_mae);
      setValue("nome_pai", student.nome_pai);
      setValue(
        "numero_registro_nascimento",
        student.numero_registro_nascimento,
      );
      setValue("rg", student.rg);
      setValue("sexo", student.sexo ? "True" : "False");
      setValue("sus", student.sus);
      setValue("uf_cartorio", student.uf_cartorio);
    }
  }, [student, setValue]);

  const handleNextStep = () => {
    navigate("address");
  };

  const handleSubmitStudent = (data: StudentFormInputs) => {
    console.log("data: ", data);
    const { data_emissao_certidao, data_nascimento, sexo, ...newData } = data;
    const gender = sexo !== "False";
    const data_nascimento_string = format(data_nascimento, "yyyy-MM-dd");
    const data_emissao_certidao_string = format(
      data_emissao_certidao,
      "yyyy-MM-dd",
    );

    addStudent({
      ...newData,
      sexo: gender,
      id_turma: "1fb802b9-7128-4922-b32d-f51418972908",
      id_instituicao_ensino: "e1093718-a1b4-4eed-a8d0-7d18a2ce0b31",
      data_nascimento: data_nascimento_string,
      data_emissao_certidao: data_emissao_certidao_string,
    });

    handleNextStep();
  };

  return (
    <FormLayout>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitStudent)}
          className="flex flex-col w-full gap-6"
        >
          <section className="flex flex-col w-full gap-6">
            <h1 className="text-2xl font-bold">Dados do educando</h1>
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
                name="nis"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="nis">NIS</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="nis"
                          type="text"
                          placeholder="Digite o nis"
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="cidade_nascenca"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="city_origin">
                      Cidade em que nasceu
                    </FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="city_origin"
                          type="text"
                          placeholder="Digite a cidade"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.cidade_nascenca && errors.cidade_nascenca.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cidade_cartorio"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="city_registry">
                      Cidade do cartório
                    </FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="city_registry"
                          type="text"
                          placeholder="Digite a cidade"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.cidade_cartorio && errors.cidade_cartorio.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
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
              <FormField
                control={form.control}
                name="sus"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="sus">SUS</FormLabel>
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <FormField
                control={form.control}
                name="data_nascimento"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="birthday">Data de nascimento</FormLabel>
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
                      {errors.data_nascimento && errors.data_nascimento.message}
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
                name="etnia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Etnia</FormLabel>
                    <FormControl>
                      <Select.Root
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione a etnia"
                      >
                        {Object.entries(ethnicities).map(([key, ethnicity]) => (
                          <Select.Item
                            key={key}
                            value={ethnicity.value}
                            text={ethnicity.title}
                          />
                        ))}
                      </Select.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.etnia && errors.etnia.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="nome_cartorio"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="name_registry">
                      Nome do cartório
                    </FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="name_registry"
                          type="text"
                          placeholder="Digite o nome"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nome_cartorio && errors.nome_cartorio.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero_registro_nascimento"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="number_registry">
                      N° do registro de data_nascimento
                    </FormLabel>
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
                      {errors.numero_registro_nascimento &&
                        errors.numero_registro_nascimento.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="data_emissao_certidao"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="date_registry">
                      Data da emissão da certidão
                    </FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="date_registry"
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
                      {errors.data_emissao_certidao &&
                        errors.data_emissao_certidao.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uf_cartorio"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="uf_registry">Uf do cartório</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="uf_registry"
                          type="text"
                          placeholder="Digite a UF"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.uf_cartorio && errors.uf_cartorio.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="nome_mae"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="mother_name">Nome da mãe</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="mother_name"
                          type="text"
                          placeholder="Digite o nome da mãe"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nome_mae && errors.nome_mae.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nome_pai"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="father_name">Nome do pai</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="father_name"
                          type="text"
                          placeholder="Digite o nome do pai"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.nome_pai && errors.nome_pai.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </section>

          <div className="flex items-center justify-end gap-4 pt-5">
            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
