import { useState } from "react";
import * as z from "zod";
import { Form } from "@ui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useForm, useFieldArray } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import { FormFields } from "./FormFields";
import { Button } from "@components/Button";
import { StudentProps } from "@dtos/studentDTO";
import { parentFormSchema } from "@schemas/parentsFormSchema";

export type ParentFormInputs = z.infer<typeof parentFormSchema>;

interface bolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;
}

interface ParentsProps {
  student: StudentProps;
}

export const Parents = ({ student }: ParentsProps) => {
  const [bolsaFamilia, setBolsaFamilia] = useState<bolsaFamiliaProps>({} as bolsaFamiliaProps);
  const responsaveis = student.responsaveis.map((responsavel) => ({
      nome: responsavel.nome,
      dataNascimento: new Date(responsavel.dataNascimento),
      sexo: false,
      rg: responsavel.rg,
      cpf: responsavel.cpf,
      parentesco: responsavel.parentesco,
      escolaridade: responsavel.escolaridade,
      apelido: responsavel.apelido,
      dataExpedicaoRg: new Date(responsavel.dataExpedicaoRg),
      emissorRg: responsavel.emissorRg,
      ufRg: responsavel.ufRg,
      dataExpedicaoCpf: new Date(responsavel.dataExpedicaoCpf),
      profissao: responsavel.profissao,
      nomeMae: responsavel.nomeMae,
      bolsaFamilia: {
        nis: responsavel.bolsaFamilia?.nis,
      },
      familiaresCasa: 0,
  }));

  const form = useForm<ParentFormInputs>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      responsaveis: responsaveis,
    },
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "responsaveis" });

  const disableNewParent = fields.length === 2;
  const disableRemoveButton = fields.length < 2;

  const handleCheckBolsaFamilia = (index: number, value: CheckedState) => {
    if (index === 0) {
      setBolsaFamilia({ ...bolsaFamilia, parent1: value });
    } else {
      setBolsaFamilia({ ...bolsaFamilia, parent2: value });
    }
  };

  const handleAddNewParent = () => {
    append({
      nome: "",
      dataNascimento: new Date(),
      sexo: false,
      rg: "",
      cpf: "",
      parentesco: "",
      escolaridade: "",
      apelido: "",
      dataExpedicaoRg: new Date(),
      emissorRg: "",
      ufRg: "",
      dataExpedicaoCpf: new Date(),
      profissao: "",
      nomeMae: "",
      bolsaFamilia: {
        nis: "",
      },
      familiaresCasa: 0,
    });
  };

  const handleRemoveParent = (index: number | string) => {
    remove(Number(index));
  };

  const handleSubmitParents = (data: ParentFormInputs) => {};

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex items-center justify-between pb-5 border-b border-zinc-100">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Dados dos responsáveis</h2>
          <span className="text-sm text-zinc-500">Atualize as informações do responsáveis aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" form="parents" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="parents"
          onSubmit={handleSubmit(handleSubmitParents)}
        >
          {fields.map(( item, index ) => (
            <Accordion key={item.id} type="single" defaultValue={`item-${index}`} collapsible className="mt-5 mb-6">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-zinc-900 px-0">Dados do responsável {index+1}</AccordionTrigger>
                <AccordionContent className="px-0">
                  <FormFields
                    form={form}
                    index={index}
                    errors={errors}
                    student={student}
                    setValue={setValue}
                    bolsaFamilia={bolsaFamilia}
                    onRemoveParent={handleRemoveParent}
                    disableRemoveButton={disableRemoveButton}
                    onCheckBolsaFamilia={handleCheckBolsaFamilia}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
            <Button type="button" disabled={disableNewParent} onClick={() => handleAddNewParent()}>
              Novo parente
            </Button>
            <Button type="submit" className="text-sm">Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
