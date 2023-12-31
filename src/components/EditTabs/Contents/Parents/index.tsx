import { useState } from "react";
import * as z from "zod";
import { format } from "date-fns";
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
import { useAuth } from "@contexts/auth";
import { FormFields } from "./FormFields";
import { Button } from "@components/Button";
import { useParent } from "@hooks/useParent";
import { StudentProps } from "@dtos/studentDTO";
import { occupations } from "@configs/constant/employee";
import { parentFormSchema } from "@schemas/updateParentsFormSchema";

export type ParentFormInputs = z.infer<typeof parentFormSchema>;

interface BolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;    // res
}

interface ParentsProps {
  student: StudentProps;
}

export const Parents = ({ student }: ParentsProps) => {
  const { user } = useAuth();
  const { updateParent } = useParent();
  const disableSaveButton = user?.cargo !== occupations.MANAGER.value ? true: false;
  const [bolsaFamilia, setBolsaFamilia] = useState<BolsaFamiliaProps>({} as BolsaFamiliaProps);
  const responsaveis = student.responsaveis.map((responsavel) => ({
      id: responsavel.id,
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
  const { fields, append, remove } = useFieldArray({ control, name: "responsaveis", keyName: "key" });

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
      id: "",
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

  const handleSubmitParents = (data: ParentFormInputs) => {
    const { responsaveis } = data;

    responsaveis.map((responsavel) => {
      const { dataNascimento, dataExpedicaoRg, dataExpedicaoCpf, ...updatedData } = responsavel;
      const dataNascimentoString = format(dataNascimento, "yyyy-MM-dd");
      const dataExpedicaoRgString = format(dataExpedicaoRg, "yyyy-MM-dd");
      const dataExpedicaoCpfString = format(dataExpedicaoCpf, "yyyy-MM-dd");
      if (updatedData.id.length > 0) {
        updateParent({
          ...updatedData,
          dataNascimento: dataNascimentoString,
          dataExpedicaoRg: dataExpedicaoRgString,
          dataExpedicaoCpf: dataExpedicaoCpfString,
        });
      }
    });
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Dados dos responsáveis</h2>
          <span className="text-sm text-zinc-500">Atualize as informações do responsáveis aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" disabled={disableSaveButton} form="parents" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="parents"
          onSubmit={handleSubmit(handleSubmitParents)}
        >
          {fields.map(( item, index ) => (
            <Accordion key={item.key} type="single" defaultValue={`item-${index}`} collapsible className="mt-5 mb-6">
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
            <Button type="button" disabled={disableNewParent || disableSaveButton} onClick={() => handleAddNewParent()}>
              Novo parente
            </Button>
            <Button type="submit" disabled={disableSaveButton} className="text-sm">Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
