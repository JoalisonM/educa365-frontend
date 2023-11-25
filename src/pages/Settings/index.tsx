import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

import { useCep } from "@hooks/useCep";
import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { employeeFormSchema } from "@schemas/employeeFormSchema";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react";

export type EmployeeFormInputs = z.infer<typeof employeeFormSchema>;

export const Settings = () => {
  const { getCep } = useCep();

  const form = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const checkCep = async (value: string) => {
    if (!value) {
      return;
    }

    const cep = value.replace(/\D/g, "");

    const data = await getCep(cep);

    if (data) {
      form.setValue("endereco.uf", data.uf);
      form.setValue("endereco.cidade", data.localidade);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Configurações</h1>
      </div>

      <div className="flex flex-col gap-4 justify-between pb-5 mt-4 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Meus dados</h2>
          <span className="text-sm text-zinc-500">Atualize as suas informações aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" form="details" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="details"
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
            <FormLabel htmlFor="email" className="text-sm font-medium text-zinc-700">E-mail</FormLabel>
            <div>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Prefix>
                          <EnvelopeSimple className="h-5 w-5 text-zinc-400" />
                        </Input.Prefix>
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
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="telephone" className="text-sm font-medium text-zinc-700">Telefone</FormLabel>
            <div>
              <FormField
                  control={form.control}
                  name="endereco.telefone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input.Root>
                          <Input.Prefix>
                            <Phone className="h-5 w-5 text-zinc-400" />
                          </Input.Prefix>
                          <Input.Control
                            id="telephone"
                            type="text"
                            placeholder="Digite o telefone"
                            {...field}
                          />
                        </Input.Root>
                      </FormControl>
                      <FormMessage className="text-sm font-normal text-error-500">
                        {errors.endereco?.telefone && errors.endereco?.telefone?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <h2 className="text-lg font-medium text-zinc-900">Endereço</h2>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="street" className="text-sm font-medium text-zinc-700">Logradouro</FormLabel>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                  control={form.control}
                  name="endereco.rua"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input.Root>
                          <Input.Control
                            id="street"
                            type="text"
                            placeholder="Digite a rua"
                            {...field}
                          />
                        </Input.Root>
                      </FormControl>
                      <FormMessage className="text-sm font-normal text-error-500">
                        {errors.endereco?.rua && errors.endereco?.rua?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

              <FormField
                  control={form.control}
                  name="endereco.bairro"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input.Root>
                          <Input.Control
                            type="text"
                            placeholder="Digite o bairro"
                            {...field}
                          />
                        </Input.Root>
                      </FormControl>
                      <FormMessage className="text-sm font-normal text-error-500">
                        {errors.endereco?.bairro && errors.endereco?.bairro?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="number" className="text-sm font-medium text-zinc-700">Número e Referência</FormLabel>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                  control={form.control}
                  name="endereco.numero"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input.Root>
                          <Input.Control
                            id="number"
                            type="text"
                            placeholder="Digite o número"
                            {...field}
                          />
                        </Input.Root>
                      </FormControl>
                      <FormMessage className="text-sm font-normal text-error-500">
                        {errors.endereco?.numero && errors.endereco?.numero?.message}
                      </FormMessage>
                    </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="endereco.numero"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input.Root>
                          <Input.Control
                            type="text"
                            placeholder="Digite a referência"
                            {...field}
                          />
                        </Input.Root>
                      </FormControl>
                      <FormMessage className="text-sm font-normal text-error-500">
                        {errors.endereco?.numero && errors.endereco?.numero?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="cep" className="text-sm font-medium text-zinc-700">Cidade</FormLabel>
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="endereco.cep"
                render={({ field: { onBlur, ...field } }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="cep"
                          type="text"
                          placeholder="Digite o CEP"
                        onBlur={(event) => checkCep(event.target.value)}
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.endereco?.cep && errors.endereco?.cep?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco.cidade"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          type="text"
                          placeholder="Digite a cidade"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.endereco?.cidade && errors.endereco?.cidade?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco.uf"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          type="text"
                          placeholder="Digite a UF"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.endereco?.uf && errors.endereco?.uf?.message}
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
