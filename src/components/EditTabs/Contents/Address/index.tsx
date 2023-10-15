import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { useAddress } from "@hooks/useAddress";
import { StudentProps } from "@dtos/studentDTO";
import { addressFormSchema } from "@schemas/addressFormSchema";

export type AddressFormInputs = z.infer<typeof addressFormSchema>;

interface AddressContentProps {
  student: StudentProps;
}

export const Address = ({ student }: AddressContentProps ) => {
  const { updateAddress } = useAddress();
  const form = useForm<AddressFormInputs>({
    resolver: zodResolver(addressFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (student) {
      setValue("bairro", student.endereco.bairro);
      setValue("cep", student.endereco.cep);
      setValue("cidade", student.endereco.cidade);
      setValue("numero", student.endereco.numero);
      setValue("referencia", student.endereco.referencia);
      setValue("rua", student.endereco.rua);
      setValue("telefone", student.endereco.telefone);
      setValue("uf", student.endereco.uf);
    }
  }, [student, setValue]);

  const handleSubmitAddress = (data: AddressFormInputs) => {
    const { bairro, cep, cidade, numero, referencia, rua, telefone, uf } = data;
    updateAddress({
      id: student.endereco.id,
      uf,
      cep,
      rua,
      cidade,
      numero,
      bairro,
      telefone,
      referencia,
    });
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Endereço</h2>
          <span className="text-sm text-zinc-500">Atualize as informações do endereço aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" form="address" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="address"
          onSubmit={handleSubmit(handleSubmitAddress)}
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-100"
        >
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form">
            <FormLabel htmlFor="street" className="text-sm font-medium text-zinc-700">Rua</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="rua"
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
                      {errors.rua && errors.rua.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="neighborhood" className="text-sm font-medium text-zinc-700">Bairro</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="neighborhood"
                          type="text"
                          placeholder="Digite o bairro"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.bairro && errors.bairro.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="number" className="text-sm font-medium text-zinc-700">Número</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="number"
                          type="text"
                          placeholder="Digite o numero"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.numero && errors.numero.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="cep" className="text-sm font-medium text-zinc-700">CEP</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="cep"
                          type="text"
                          placeholder="Digite o CEP"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.cep && errors.cep.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="uf" className="text-sm font-medium text-zinc-700">UF</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="uf"
                          type="text"
                          placeholder="Digite a UF"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.uf && errors.uf.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="city" className="text-sm font-medium text-zinc-700">Cidade</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="city"
                          type="text"
                          placeholder="Digite a cidade"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.cidade && errors.cidade.message}
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
                name="telefone"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="telephone"
                          type="text"
                          placeholder="Digite o telefone"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.telefone && errors.telefone.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form pt-5">
            <FormLabel htmlFor="reference" className="text-sm font-medium text-zinc-700">Referência</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="referencia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="reference"
                          type="text"
                          placeholder="Digite o referencia"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.referencia && errors.referencia.message}
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
