import { useEffect } from "react";
import { Trash } from "@phosphor-icons/react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FieldErrors, UseFormReturn, UseFormSetValue } from "react-hook-form";

import { ParentFormInputs } from ".";
import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { StudentProps } from "@dtos/studentDTO";
import { AlertDialog } from "@components/Alert";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

interface bolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;
}

interface FormFieldsProps {
  index: number;
  student: StudentProps;
  disableRemoveButton: boolean;
  bolsaFamilia: bolsaFamiliaProps;
  form: UseFormReturn<ParentFormInputs>;
  errors: FieldErrors<ParentFormInputs>;
  setValue: UseFormSetValue<ParentFormInputs>;
  onRemoveParent: (index: number | string) => void;
  onCheckBolsaFamilia: (index: number, value: CheckedState) => void;
}

export const FormFields = (props: FormFieldsProps) => {
  const {
    form,
    index,
    errors,
    student,
    setValue,
    bolsaFamilia,
    onRemoveParent,
    disableRemoveButton,
    onCheckBolsaFamilia,
  } = props;

  useEffect(() => {
    if (student && student.responsaveis) {
      setValue(`responsaveis.${index}.nome`, student.responsaveis?.[index].nome);
      setValue(`responsaveis.${index}.apelido`, student.responsaveis?.[index].apelido);
      setValue(`responsaveis.${index}.cpf`, student.responsaveis?.[index].cpf);
      setValue(`responsaveis.${index}.dataExpedicaoCpf`, new Date(
        student.responsaveis?.[index].dataExpedicaoCpf,
      ));
      setValue(`responsaveis.${index}.dataExpedicaoRg`, new Date(
        student.responsaveis?.[index].dataExpedicaoRg,
      ));
      setValue(`responsaveis.${index}.dataNascimento`, new Date(
        student.responsaveis?.[index].dataNascimento,
      ));
      setValue(`responsaveis.${index}.emissorRg`, student.responsaveis?.[index].emissorRg);
      setValue(`responsaveis.${index}.escolaridade`, student.responsaveis?.[index].escolaridade);
      setValue(`responsaveis.${index}.familiaresCasa`, student.responsaveis?.[index].familiaresCasa);
      setValue(`responsaveis.${index}.nomeMae`, student.responsaveis?.[index].nomeMae);
      setValue(`responsaveis.${index}.parentesco`, student.responsaveis?.[index].parentesco);
      setValue(`responsaveis.${index}.profissao`, student.responsaveis?.[index].profissao);
      setValue(`responsaveis.${index}.rg`, student.responsaveis?.[index].rg);
      setValue(`responsaveis.${index}.sexo`, student.responsaveis?.[index].sexo);
      setValue(`responsaveis.${index}.ufRg`, student.responsaveis?.[index].ufRg);
      setValue(`responsaveis.${index}.bolsaFamilia.nis`, student?.responsaveis?.[index]?.bolsaFamilia?.nis);

      if (student?.responsaveis?.[index]?.bolsaFamilia?.nis) {
        onCheckBolsaFamilia(index, true);
      }
    }
  }, [student, setValue]);

  const disableNis = () => {
    if (index === 0) {
      return !bolsaFamilia.parent1;
    } else {
      return !bolsaFamilia.parent2;
    }
  };

  const nisChecked = () => {
    if (index === 0) {
      return bolsaFamilia.parent1;
    } else {
      return bolsaFamilia.parent2;
    }
  };

  return (
    <div className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-100">
      <div className="grid grid-cols-form gap-3">
        <FormLabel htmlFor="name" className="text-sm font-medium text-zinc-700">Nome</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.nome`}
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
                  {errors?.responsaveis?.[index]?.nome && errors?.responsaveis?.[index]?.nome?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="education" className="text-sm font-medium text-zinc-700">Escolaridade</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.escolaridade`}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input.Root>
                    <Input.Control
                      id="education"
                      type="text"
                      placeholder="Digite a escolaridade"
                      {...field}
                    />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.responsaveis?.[index]?.escolaridade && errors?.responsaveis?.[index]?.escolaridade?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="kinship" className="text-sm font-medium text-zinc-700">Profissão</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.profissao`}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input.Root>
                    <Input.Control
                      id="kinship"
                      type="text"
                      placeholder="Digite a profissao"
                      {...field}
                    />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.responsaveis?.[index]?.profissao && errors?.responsaveis?.[index]?.profissao?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="surname" className="text-sm font-medium text-zinc-700">Apelido</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.apelido`}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input.Root>
                    <Input.Control
                      id="surname"
                      type="text"
                      placeholder="Digite a apelido"
                      {...field}
                    />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.responsaveis?.[index]?.apelido && errors?.responsaveis?.[index]?.apelido?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="rg" className="text-sm font-medium text-zinc-700">RG</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.rg`}
            render={({ field }) => (
              <FormItem className="space-y-1">
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
                  {errors?.responsaveis?.[index]?.rg && errors?.responsaveis?.[index]?.rg?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="cpf" className="text-sm font-medium text-zinc-700">CPF</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.cpf`}
            render={({ field }) => (
              <FormItem className="space-y-1">
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
                  {errors?.responsaveis?.[index]?.cpf && errors?.responsaveis?.[index]?.cpf?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="nis" className="text-sm font-medium text-zinc-700">NIS</FormLabel>
        <div className="grid grid-cols-2">
          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
            <FormControl>
              <Checkbox checked={nisChecked()} onCheckedChange={(checked) => onCheckBolsaFamilia(index, checked)} />
            </FormControl>
            <FormLabel>Recebe o bolsa família?</FormLabel>
          </FormItem>
          <div className="w-full">
            <FormField
              control={form.control}
              name={`responsaveis.${index}.bolsaFamilia.nis`}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <Input.Root>
                      <Input.Control
                        disabled={disableNis()}
                        id="nis"
                        type="text"
                        placeholder="Digite o NIS"
                        {...field}
                      />
                    </Input.Root>
                  </FormControl>
                  <FormMessage className="text-sm font-normal text-error-500">
                    {errors?.responsaveis?.[index]?.bolsaFamilia?.nis
                    && errors?.responsaveis?.[index]?.bolsaFamilia?.nis?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-form gap-3 pt-5">
        <FormLabel htmlFor="birthday" className="text-sm font-medium text-zinc-700">Data de nascimento</FormLabel>
        <div>
          <FormField
            control={form.control}
            name={`responsaveis.${index}.dataNascimento`}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input.Root>
                    <Input.Control
                      id="birthday"
                      type="date"
                      placeholder="xx-xx-xxxx"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value + "T00:00:00");
                        field.onChange(selectedDate);
                      }}
                      value={field.value ? field.value.toISOString().split("T")[0] : ""}
                    />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.responsaveis?.[index]?.dataNascimento
                  && errors?.responsaveis?.[index]?.dataNascimento?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-end pt-6">
        <AlertDialog
          id={index}
          title="Você tem certeza absoluta?"
          description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o responsável."
          onDelete={onRemoveParent}
        >
          <Button type="button" variant="iconDanger" disabled={disableRemoveButton}>
            <Trash className="h-5 w-5" />
            Remover responsável
          </Button>
        </AlertDialog>
      </div>
    </div>
  );
};
