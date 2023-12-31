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
import { Combobox } from "@components/Combobox";
import { useEmployee } from "@hooks/useEmployee";
import { ParentsProps } from "@dtos/parentsDTO";
import { useParent } from "@hooks/useParent";

interface bolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;
}

export type ParentFormInputs = z.infer<typeof parentFormSchema>;

export const ParentsStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [parentId, setParentId] = useState("");
  const [parentIndex, setParentIndex] = useState(0);
  const { fetchParents, parents, getParent } = useParent();
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
            nis: null,
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
    fetchParents();
  }, []);

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  // useEffect(() => {
  //   const loadParent = async () => {
  //     const parent = await getParent(parentId);
  //     console.log("parent: ", parent);
  //     setParentIndex((index) => index + 1);
  //     if (parent && Object.keys(parent).length > 0) {
  //       setValue(`responsaveis.${parentIndex}.nome`, parent.nome);
  //       setValue(`responsaveis.${parentIndex}.apelido`, parent.apelido);
  //       setValue(`responsaveis.${parentIndex}.bolsaFamilia.nis`, parent.bolsaFamilia?.nis ? parent.bolsaFamilia.nis : null);
  //       setValue(`responsaveis.${parentIndex}.cpf`, parent.cpf);
  //       setValue(`responsaveis.${parentIndex}.dataExpedicaoCpf`, new Date(
  //         parent.dataExpedicaoCpf,
  //       ));
  //       setValue(`responsaveis.${parentIndex}.dataExpedicaoRg`, new Date(
  //         parent.dataExpedicaoRg,
  //       ));
  //       setValue(`responsaveis.${parentIndex}.dataNascimento`, new Date(
  //         parent.dataNascimento,
  //       ));
  //       setValue(`responsaveis.${parentIndex}.emissorRg`, parent.emissorRg);
  //       setValue(`responsaveis.${parentIndex}.escolaridade`, parent.escolaridade);
  //       setValue(`responsaveis.${parentIndex}.familiaresCasa`, parent.familiaresCasa);
  //       setValue(`responsaveis.${parentIndex}.nomeMae`, parent.nomeMae);
  //       setValue(`responsaveis.${parentIndex}.parentesco`, parent.parentesco);
  //       setValue(`responsaveis.${parentIndex}.profissao`, parent.profissao);
  //       setValue(`responsaveis.${parentIndex}.rg`, parent.rg);
  //       setValue(`responsaveis.${parentIndex}.sexo`, parent.sexo);
  //       setValue(`responsaveis.${parentIndex}.ufRg`, parent.ufRg);

  //       if (parent.bolsaFamilia?.nis) {
  //         handleCheckBolsaFamilia(parentIndex, true);
  //       }
  //     }
  //   };

  //   loadParent();
  // }, [parentId]);

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
        nis: null,
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

          {parents && (
            <></>
            // <div className="w-full flex flex-col gap-4 pt-5 px-4">
            //   <h1 className="text-2xl font-bold">Responsável cadastrado</h1>
            //   <div className="grid grid-cols-3">
            //     <Combobox
            //       form={form}
            //       value={parentId}
            //       items={parents}
            //       name="responsavel"
            //       label="Responsáveis"
            //       setValue={setParentId}
            //       itemsOptions={["id", "nome"]}
            //       placeholder="Selecione o responsável"
            //     />
            //   </div>
            // </div>
          )}

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
