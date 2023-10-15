import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import { Button } from "@components/Button";
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { parentFormSchema } from "@schemas/parentsFormSchema";
import { Form } from "@ui/components/ui/form";
import { FormFields } from "./FormFields";
import { CheckedState } from "@radix-ui/react-checkbox";
import { format } from "date-fns";

interface bolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;
}

export type ParentFormInputs = z.infer<typeof parentFormSchema>;

export const ParentsStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addStudentParents, setCurrentStep } = useFormContext();
  const [bolsaFamilia, setBolsaFamilia] = useState<bolsaFamiliaProps>({} as bolsaFamiliaProps);

  const form = useForm<ParentFormInputs>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      responsaveis: [
        {
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
        },
      ],
    },
  });
  const { control, setValue, handleSubmit, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "responsaveis" });

  const disableNewParent = fields.length === 2;
  const disableRemoveButton = fields.length < 2;

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  const handleBackStep = () => {
    navigate(`${location.pathname.replace("parents", "comments")}`);
  };

  const handleNextStep = () => {
    navigate(`${location.pathname.replace("parents", "conditions")}`);
  };

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

  const handleSubmitParent = (data: ParentFormInputs) => {
    const responsaveis = data.responsaveis.map((responsavel) => {
      return {
        ...responsavel,
        dataNascimento: format(responsavel.dataNascimento, "yyyy-MM-dd"),
        dataExpedicaoRg: format(responsavel.dataExpedicaoRg, "yyyy-MM-dd"),
        dataExpedicaoCpf: format(responsavel.dataExpedicaoCpf, "yyyy-MM-dd"),
      };
    });
    addStudentParents(responsaveis);

    handleNextStep();
  };

  return (
    <FormLayout>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleSubmitParent)}>
          {fields.map(( item, index ) => (
            <Accordion key={item.id} type="single" defaultValue={`item-${index}`} collapsible className="mb-6">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-2xl font-bold">Dados do responsável {index+1}</AccordionTrigger>
                <AccordionContent>
                  <FormFields
                    form={form}
                    index={index}
                    errors={errors}
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

          <div className="flex items-center justify-end gap-4 pt-5">
            <Button type="button" variant="outline" onClick={() => handleBackStep()}>
              Voltar
            </Button>
            <Button
              type="button"
              disabled={disableNewParent}
              onClick={() => handleAddNewParent()}>
                Novo parente
            </Button>
            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
