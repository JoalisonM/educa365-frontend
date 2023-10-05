import { useEffect } from "react";
import { Trash } from "@phosphor-icons/react";
import { FieldErrors, UseFormReturn, UseFormSetValue } from "react-hook-form";

import { ConditionsFormInputs } from ".";
import * as Input from "@components/Input";
import { Button } from "@components/Button";
import * as Select from "@components/Select";
import { AlertDialog } from "@components/Alert";
import { Checkbox } from "@/components/ui/checkbox";
import { home_ownership, house_type } from "@configs/constant/student";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";
import { useFormContext } from "@hooks/useForm";

interface FormFieldsProps {
  index: number;
  disableRemoveButton: boolean;
  form: UseFormReturn<ConditionsFormInputs>;
  errors: FieldErrors<ConditionsFormInputs>;
  setValue: UseFormSetValue<ConditionsFormInputs>;
  onRemoveCondition: (index: number | string) => void;
}

export const FormFields = (props: FormFieldsProps) => {
  const { form, index, errors, setValue, disableRemoveButton, onRemoveCondition } = props;
  const { student } = useFormContext();

  useEffect(() => {
    if (student && student.responsaveis) {
      setValue(
        `condicoes.${index}.condicaoVida.problemaEnfrentado`,
        student.responsaveis?.[index]?.condicaoVida?.problemaEnfrentado,
      );
      setValue(
        `condicoes.${index}.condicaoVida.programaGoverno`,
        student.responsaveis?.[index]?.condicaoVida?.programaGoverno,
      );
      setValue(
        `condicoes.${index}.condicaoVida.quantasPessoasTrabalhamNaCasa`,
        student.responsaveis?.[index]?.condicaoVida?.quantasPessoasTrabalhamNaCasa,
      );
      setValue(
        `condicoes.${index}.condicaoVida.rendaMensalFamilia`,
        student.responsaveis?.[index]?.condicaoVida?.rendaMensalFamilia,
      );
      setValue(
        `condicoes.${index}.condicaoVida.trabalhoDaFamilia`,
        student.responsaveis?.[index]?.condicaoVida?.trabalhoDaFamilia,
      );

      setValue(
        `condicoes.${index}.condicaoMoradia.aguaCagepa`,
        student.responsaveis?.[index]?.condicaoMoradia?.aguaCagepa,
      );
      setValue(
        `condicoes.${index}.condicaoMoradia.banheiroComFossa`,
        student.responsaveis?.[index]?.condicaoMoradia?.banheiroComFossa,
      );
      setValue(
        `condicoes.${index}.condicaoMoradia.energia`,
        student.responsaveis?.[index]?.condicaoMoradia?.energia,
      );
      setValue(
        `condicoes.${index}.condicaoMoradia.poco`,
        student.responsaveis?.[index]?.condicaoMoradia?.poco,
      );
      setValue(
        `condicoes.${index}.condicaoMoradia.posseCasa`,
        student.responsaveis?.[index]?.condicaoMoradia?.posseCasa,
      );
      setValue(
        `condicoes.${index}.condicaoMoradia.tipoCasa`,
        student.responsaveis?.[index]?.condicaoMoradia?.tipoCasa,
      );
    }
  }, [student, setValue, index]);

  return (
    <div className="space-y-6 mt-8">
      <section className="flex flex-col w-full gap-4">
        <h1 className="text-2xl font-bold">Condições de moradia</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <FormField
            control={form.control}
            name={`condicoes.${index}.condicaoMoradia.tipoCasa`}
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
                  {errors?.condicoes?.[index]?.condicaoMoradia?.tipoCasa &&
                    errors?.condicoes?.[index]?.condicaoMoradia?.tipoCasa?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`condicoes.${index}.condicaoMoradia.posseCasa`}
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
                  {errors?.condicoes?.[index]?.condicaoMoradia?.posseCasa &&
                    errors?.condicoes?.[index]?.condicaoMoradia?.posseCasa?.message}
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
              name={`condicoes.${index}.condicaoMoradia.aguaCagepa`}
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
              name={`condicoes.${index}.condicaoMoradia.banheiroComFossa`}
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
              name={`condicoes.${index}.condicaoMoradia.energia`}
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
              name={`condicoes.${index}.condicaoMoradia.poco`}
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <FormField
            control={form.control}
            name={`condicoes.${index}.condicaoVida.trabalhoDaFamilia`}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="work">Trabalho da família</FormLabel>
                <FormControl>
                  <Input.Root>
                    <Input.Control id="work" type="text" placeholder="Digite o trabalho" {...field} />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.condicoes?.[index]?.condicaoVida?.trabalhoDaFamilia &&
                    errors?.condicoes?.[index]?.condicaoVida?.trabalhoDaFamilia?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`condicoes.${index}.condicaoVida.programaGoverno`}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="government">Está em algum programa do governo?</FormLabel>
                <FormControl>
                  <Input.Root>
                    <Input.Control
                      id="government"
                      type="text"
                      placeholder="Digite o programa"
                      {...field}
                    />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.condicoes?.[index]?.condicaoVida?.programaGoverno &&
                    errors?.condicoes?.[index]?.condicaoVida?.programaGoverno?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`condicoes.${index}.condicaoVida.rendaMensalFamilia`}
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
                  {errors?.condicoes?.[index]?.condicaoVida?.rendaMensalFamilia &&
                    errors?.condicoes?.[index]?.condicaoVida?.rendaMensalFamilia?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`condicoes.${index}.condicaoVida.quantasPessoasTrabalhamNaCasa`}
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="how_many">Quantas pessoas trabalham em casa?</FormLabel>
                <FormControl>
                  <Input.Root>
                    <Input.Control
                      id="how_many"
                      type="number"
                      placeholder="Digite o número"
                      value={value}
                      onChange={(e) => onChange(parseInt(e.target.value))}
                      {...field}
                    />
                  </Input.Root>
                </FormControl>
                <FormMessage className="text-sm font-normal text-error-500">
                  {errors?.condicoes?.[index]?.condicaoVida?.quantasPessoasTrabalhamNaCasa &&
                    errors?.condicoes?.[index]?.condicaoVida?.quantasPessoasTrabalhamNaCasa?.message}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.alcool`}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.desemprego`}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.drogas`}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.fome`}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.lazer`}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.saude`}
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
              name={`condicoes.${index}.condicaoVida.problemaEnfrentado.violencia`}
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

      <div className="flex items-center justify-end pt-6">
        <AlertDialog
          id={index}
          title="Você tem certeza absoluta?"
          description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o responsável."
          onDelete={onRemoveCondition}
        >
          <Button type="button" variant="iconDanger" disabled={disableRemoveButton}>
            <Trash className="h-5 w-5" />
            Remover condições
          </Button>
        </AlertDialog>
      </div>
    </div>
  );
};
