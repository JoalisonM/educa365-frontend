import { useEffect } from "react";
import * as z from "zod";
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
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { ButtonLink } from "@components/ButtonLink";
import { addressFormSchema } from "@schemas/addressFormSchema";

export type AddressFormInputs = z.infer<typeof addressFormSchema>;

export const AddressStep = () => {
  const navigate = useNavigate();
  const { student, addStudentAddress, setCurrentStep } = useFormContext();

  const form = useForm<AddressFormInputs>({
    resolver: zodResolver(addressFormSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = form;

  useEffect(() => {
    setCurrentStep(2);
  }, []);

  useEffect(() => {
    if (student && student.endereco) {
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

  const handleNextStep = () => {
    navigate("/students/new-student/comments");
  };

  const handleSubmitAddress = (data: AddressFormInputs) => {
    console.log("endereço: ", data);
    addStudentAddress(data);

    handleNextStep();
  };

  return (
    <FormLayout>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitAddress)}
          className="flex flex-col w-full gap-6"
        >
          <section className="flex flex-col w-full gap-4">
            <h1 className="text-2xl font-bold">Endereço</h1>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="rua"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="street">Rua</FormLabel>
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
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="neighborhood">Bairro</FormLabel>
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
                      {errors.numero && errors.numero.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="number">Número</FormLabel>
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
                      {errors.numero && errors.numero.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="cep">CEP</FormLabel>
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
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="uf">UF</FormLabel>
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="city">Cidade</FormLabel>
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
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="telephone">Telefone</FormLabel>
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
            <div className="grid grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="referencia"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="reference">Referência</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="reference"
                          type="text"
                          placeholder="Digite a referência"
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
          </section>

          <div className="flex items-center justify-end gap-4 pt-5">
            <ButtonLink to=".." relative="path" variant="outline">
              Voltar
            </ButtonLink>
            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
