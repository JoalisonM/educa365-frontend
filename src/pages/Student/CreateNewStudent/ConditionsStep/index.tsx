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
import { FormFields } from "./FormFields";
import { Button } from "@components/Button";
import { Form } from "@ui/components/ui/form";
import { useStudent } from "@hooks/useStudent";
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { CreateStudentInput } from "@dtos/studentDTO";
import { conditionsFormSchema } from "@schemas/conditionsFormSchema";

export type ConditionsFormInputs = z.infer<typeof conditionsFormSchema>;

export const ParentsConditionsStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentData, setStudentData] = useState<CreateStudentInput>({} as CreateStudentInput);

  const { createStudent } = useStudent();
  const { student, setCurrentStep, addStudentParentsConditions } = useFormContext();

  const form = useForm<ConditionsFormInputs>({
    resolver: zodResolver(conditionsFormSchema),
    defaultValues: {
      condicoes: [
        {
          condicaoMoradia: {
            tipoCasa: "",
            posseCasa: "",
            banheiroComFossa: false,
            aguaCagepa: false,
            poco: false,
            energia: false,
          },
          condicaoVida: {
            trabalhoDaFamilia: "",
            rendaMensalFamilia: 0,
            quantasPessoasTrabalhamNaCasa: 0,
            programaGoverno: "",
            problemaEnfrentado: {
              alcool: false,
              lazer: false,
              saude: false,
              fome: false,
              drogas: false,
              violencia: false,
              desemprego: false,
            },
          },
        },
      ],
    },
  });
  const {
    control,
    setValue,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "condicoes" });

  const disableNewParent = fields.length === 2;
  const disableRemoveButton = fields.length < 2;

  useEffect(() => {
    setCurrentStep(5);
    setStudentData(student);
  }, []);

  const handleBackStep = () => {
    navigate(`${location.pathname.replace("conditions", "parents")}`);
  };

  const handleNextStep = () => {
    navigate(`${location.pathname.replace("conditions", "finish")}`);
  };

  const handleAddNewParent = () => {
    append({
      condicaoMoradia: {
        tipoCasa: "",
        posseCasa: "",
        banheiroComFossa: false,
        aguaCagepa: false,
        poco: false,
        energia: false,
      },
      condicaoVida: {
        trabalhoDaFamilia: "",
        rendaMensalFamilia: 0,
        quantasPessoasTrabalhamNaCasa: 0,
        programaGoverno: "",
        problemaEnfrentado: {
          alcool: false,
          lazer: false,
          saude: false,
          fome: false,
          drogas: false,
          violencia: false,
          desemprego: false,
        },
      },
    });
  };

  const handleRemoveCondition = (index: number | string) => {
    remove(Number(index));
  };

  const handleSubmitConditions = (data: ConditionsFormInputs) => {
    addStudentParentsConditions(data.condicoes);

    handleNextStep();
  };

  return (
    <FormLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitConditions)} className="flex flex-col w-full gap-6">
        {fields.map(( item, index ) => (
            <Accordion key={item.id} type="single" defaultValue={`item-${index}`} collapsible className="mb-6">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-2xl font-bold">Condições do responsável {index+1}</AccordionTrigger>
                <AccordionContent>
                  <FormFields
                    form={form}
                    index={index}
                    errors={errors}
                    setValue={setValue}
                    disableRemoveButton={disableRemoveButton}
                    onRemoveCondition={handleRemoveCondition}
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
                Nova condição
            </Button>
            <Button type="submit">Proximo</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
