import { FieldErrors, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as Input from "@components/Input";
import { EmployeeFormInputs } from "./EmployeeForm";

interface AddressFieldsFormProps {
  form: UseFormReturn<EmployeeFormInputs>;
  errors: FieldErrors<EmployeeFormInputs>;
}

export const AddressFieldsForm = ({ form, errors }: AddressFieldsFormProps) => {
  return (
    <>
      <h1 className="text-xl font-bold">Endereço</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <FormField
          control={form.control}
          name="endereco.rua"
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
                {errors.endereco?.rua && errors.endereco?.rua.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endereco.bairro"
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
                {errors.endereco?.numero && errors.endereco?.numero.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        <FormField
          control={form.control}
          name="endereco.numero"
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
                {errors.endereco?.numero && errors.endereco?.numero.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endereco.cep"
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
                {errors.endereco?.cep && errors.endereco?.cep.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endereco.uf"
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
                {errors.endereco?.uf && errors.endereco?.uf.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <FormField
          control={form.control}
          name="endereco.cidade"
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
                {errors.endereco?.cidade && errors.endereco?.cidade.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endereco.telefone"
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
                {errors.endereco?.telefone && errors.endereco?.telefone.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <FormField
          control={form.control}
          name="endereco.referencia"
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
                {errors.endereco?.referencia &&
                  errors.endereco?.referencia.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
