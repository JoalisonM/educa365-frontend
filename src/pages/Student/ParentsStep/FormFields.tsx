import { useEffect } from "react";
import { Trash } from "@phosphor-icons/react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FieldErrors, UseFormReturn, UseFormSetValue } from "react-hook-form";

import { ParentFormInputs } from ".";
import * as Input from "@components/Input";
import { Button } from "@components/Button";
import * as Select from "@components/Select";
import { useFormContext } from "@hooks/useForm";
import { AlertDialog } from "@components/Alert";
import { Checkbox } from "@/components/ui/checkbox";
import { genders } from "@configs/constant/employee";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

interface bolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;
}

interface FormFieldsProps {
  index: number;
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
    setValue,
    bolsaFamilia,
    onRemoveParent,
    disableRemoveButton,
    onCheckBolsaFamilia,
  } = props;
  const { student } = useFormContext();

  useEffect(() => {
    if (student && student.responsaveis) {
      setValue(`responsaveis.${index}.nome`, student.responsaveis?.[index].nome);
      setValue(`responsaveis.${index}.apelido`, student.responsaveis?.[index].apelido);
      setValue(`responsaveis.${index}.bolsaFamilia.nis`, student?.responsaveis?.[index]?.bolsaFamilia?.nis);
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

      if (student?.responsaveis?.[index]?.bolsaFamilia?.nis) {
        onCheckBolsaFamilia(index, true);
      }
    }
  }, [student, setValue, index, onCheckBolsaFamilia]);

  const disableNis = () => {
    if (index === 0) {
      return !bolsaFamilia.parent1;
    } else {
      return !bolsaFamilia.parent2;
    }
  };

  return (
    <section className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <FormField
          control={form.control}
          name={`responsaveis.${index}.nome`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="name">Nome</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control id="name" type="text" placeholder="Digite o nome" {...field} />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.nome && errors?.responsaveis?.[index]?.nome?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`responsaveis.${index}.parentesco`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="kinship">Parentesco</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="kinship"
                    type="text"
                    placeholder="Digite o parentesco"
                    {...field}
                  />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.parentesco && errors?.responsaveis?.[index]?.parentesco?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <FormField
          control={form.control}
          name={`responsaveis.${index}.escolaridade`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="education">Escolaridade</FormLabel>
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
        <FormField
          control={form.control}
          name={`responsaveis.${index}.profissao`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="kinship">Profissão</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="kinship"
                    type="text"
                    placeholder="Digite a profissão"
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
        <FormField
          control={form.control}
          name={`responsaveis.${index}.apelido`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="surname">Apelido</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="surname"
                    type="text"
                    placeholder="Digite o apelido"
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <FormField
          control={form.control}
          name={`responsaveis.${index}.dataNascimento`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="birthday">Data de nascimento</FormLabel>
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
        <FormField
          control={form.control}
          name={`responsaveis.${index}.sexo`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <Select.Root
                  onChange={field.onChange}
                  value={String(field.value)}
                  placeholder="Selecione o sexo"
                >
                  {Object.entries(genders).map(([key, gender]) => (
                    <Select.Item key={key} value={String(gender.value)} text={gender.title} />
                  ))}
                </Select.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.sexo && errors?.responsaveis?.[index]?.sexo?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`responsaveis.${index}.rg`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="rg">RG</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control id="rg" type="text" placeholder="Digite o RG" {...field} />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.rg && errors?.responsaveis?.[index]?.rg?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <FormField
          control={form.control}
          name={`responsaveis.${index}.dataExpedicaoRg`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="shipping_date_rg">Data de expedição RG</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="shipping_date_rg "
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
                {errors?.responsaveis?.[index]?.dataExpedicaoRg
                && errors?.responsaveis?.[index]?.dataExpedicaoRg?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`responsaveis.${index}.emissorRg`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="issue_rg">Emissor do RG</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="issue_rg"
                    type="text"
                    placeholder="Digite o emissor do RG"
                    {...field}
                  />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.emissorRg && errors?.responsaveis?.[index]?.emissorRg?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`responsaveis.${index}.ufRg`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="uf_rg">UF do RG</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control id="uf_rg" type="text" placeholder="Digite a UF do RG" {...field} />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.ufRg && errors?.responsaveis?.[index]?.ufRg?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <FormField
          control={form.control}
          name={`responsaveis.${index}.cpf`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="cpf">CPF</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control id="cpf" type="text" placeholder="Digite o CPF" {...field} />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.cpf && errors?.responsaveis?.[index]?.cpf?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`responsaveis.${index}.dataExpedicaoCpf`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="shipping_date_cpf">Data de expedição CPF</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="shipping_date_cpf "
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
                {errors?.responsaveis?.[index]?.dataExpedicaoCpf
                && errors?.responsaveis?.[index]?.dataExpedicaoCpf?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`responsaveis.${index}.familiaresCasa`}
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="relatives">Familiares da casa</FormLabel>
              <FormControl>
                <Input.Root>
                  <Input.Control
                    id="relatives"
                    type="number"
                    value={value}
                    placeholder="Digite o número"
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    {...field}
                  />
                </Input.Root>
              </FormControl>
              <FormMessage className="text-sm font-normal text-error-500">
                {errors?.responsaveis?.[index]?.familiaresCasa
                && errors?.responsaveis?.[index]?.familiaresCasa?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <FormField
          control={form.control}
          name={`responsaveis.${index}.nomeMae`}
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
                {errors?.responsaveis?.[index]?.nomeMae && errors?.responsaveis?.[index]?.nomeMae?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox onCheckedChange={(checked) => onCheckBolsaFamilia(index, checked)} />
          </FormControl>
          <FormLabel>Recebe o bolsa família?</FormLabel>
        </FormItem>
        <FormField
          control={form.control}
          name={`responsaveis.${index}.bolsaFamilia.nis`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel htmlFor="nis">NIS</FormLabel>
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
    </section>
  );
};
