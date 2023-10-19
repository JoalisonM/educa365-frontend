import * as z from "zod";
import { Form } from "@ui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { conditionsFormSchema } from "@schemas/conditionsFormSchema";
import { useConditions } from "@hooks/useConditions";

export type ConditionsFormInputs = z.infer<typeof conditionsFormSchema>;

interface ConditionsProps {
  student: StudentProps;
}

export const Conditions = ({ student }: ConditionsProps) => {
  const { updateCondition } = useConditions();
  const condicoes = student.responsaveis.map((responsavel) => ({
    condicaoMoradia: {
      id: responsavel.condicaoMoradia.id,
      tipoCasa: responsavel.condicaoMoradia.tipoCasa,
      posseCasa: responsavel.condicaoMoradia.posseCasa,
      banheiroComFossa: responsavel.condicaoMoradia.banheiroComFossa,
      aguaCagepa: responsavel.condicaoMoradia.aguaCagepa,
      poco: responsavel.condicaoMoradia.poco,
      energia: responsavel.condicaoMoradia.energia,
    },
    condicaoVida: {
      id: responsavel.condicaoVida.id,
      trabalhoDaFamilia: responsavel.condicaoVida.trabalhoDaFamilia,
      rendaMensalFamilia: responsavel.condicaoVida.rendaMensalFamilia,
      quantasPessoasTrabalhamNaCasa: responsavel.condicaoVida.quantasPessoasTrabalhamNaCasa,
      programaGoverno: responsavel.condicaoVida.programaGoverno,
      problemaEnfrentado: {
        alcool: responsavel.condicaoVida.problemaEnfrentado.alcool,
        lazer: responsavel.condicaoVida.problemaEnfrentado.lazer,
        saude: responsavel.condicaoVida.problemaEnfrentado.saude,
        fome: responsavel.condicaoVida.problemaEnfrentado.fome,
        drogas: responsavel.condicaoVida.problemaEnfrentado.drogas,
        violencia: responsavel.condicaoVida.problemaEnfrentado.violencia,
        desemprego: responsavel.condicaoVida.problemaEnfrentado.desemprego,
      },
    },
  }));

  const form = useForm<ConditionsFormInputs>({
    resolver: zodResolver(conditionsFormSchema),
    defaultValues: {
      condicoes: condicoes,
    },
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "condicoes" });

  const disableNewParent = fields.length === 2;
  const disableRemoveButton = fields.length < 2;

  const handleAddNewCondition = () => {
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
    const { condicoes } = data;

    condicoes.map((condicao) => {
      if (condicao.condicaoMoradia.id && condicao.condicaoVida.id) {
        updateCondition(condicao);
      }
    });
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Condições de moradia e vida</h2>
          <span className="text-sm text-zinc-500">Atualize as informações das condições aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
          <Button type="submit" form="parents" className="text-sm">Salvar</Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleSubmitConditions)}>
          {fields.map(( item, index ) => (
            <Accordion key={item.id} type="single" defaultValue={`item-${index}`} collapsible className="mt-5 mb-6">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-zinc-900 px-0">Condições do responsável {index+1}</AccordionTrigger>
                <AccordionContent className="px-0">
                  <FormFields
                    form={form}
                    index={index}
                    errors={errors}
                    student={student}
                    setValue={setValue}
                    disableRemoveButton={disableRemoveButton}
                    onRemoveCondition={handleRemoveCondition}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button type="button" variant="outline" className="text-sm">Cancelar</Button>
            <Button type="button" disabled={disableNewParent} onClick={() => handleAddNewCondition()}>
              Nova condição
            </Button>
            <Button type="submit" className="text-sm">Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
