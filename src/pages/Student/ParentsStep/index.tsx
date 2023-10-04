import { useEffect, useState } from "react";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

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

interface bolsaFamiliaProps {
  parent1: CheckedState;
  parent2: CheckedState;
}

export type ParentFormInputs = z.infer<typeof parentFormSchema>;

export const ParentsStep = () => {
  const navigate = useNavigate();
  const { student, addStudentParents, setCurrentStep } = useFormContext();
  const [bolsaFamilia, setBolsaFamilia] = useState<bolsaFamiliaProps>({} as bolsaFamiliaProps);

  const form = useForm<ParentFormInputs>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      responsaveis: [
        {
          nome: "",
          data_nascimento: new Date(),
          sexo: "TRUE",
          rg: "",
          cpf: "",
          parentesco: "",
          escolaridade: "",
          apelido: "",
          data_expedicao_rg: new Date(),
          emissor_rg: "",
          uf_rg: "",
          data_expedicao_cpf: new Date(),
          profissao: "",
          nome_mae: "",
          bolsa_familia: {
            nis: "",
          },
          familiares_casa: 0,
        },
      ],
    },
  });
  const { control, setValue, handleSubmit, formState: { errors } } = form;
  const { fields, append } = useFieldArray({ control, name: "responsaveis" });

  // useEffect(() => {
  //   if (student && student.responsaveis) {
  //     setValue("apelido", student.responsaveis.apelido);
  //     setValue("bolsa_familia.nis", student.responsaveis.bolsa_familia?.nis);
  //     setValue("cpf", student.responsaveis.cpf);
  //     setValue("data_expedicao_cpf", new Date(student.responsaveis.data_expedicao_cpf));
  //     setValue("data_expedicao_rg", new Date(student.responsaveis.data_expedicao_rg));
  //     setValue("data_nascimento", new Date(student.responsaveis.data_nascimento));
  //     setValue("emissor_rg", student.responsaveis.emissor_rg);
  //     setValue("escolaridade", student.responsaveis.escolaridade);
  //     setValue("familiares_casa", student.responsaveis.familiares_casa);
  //     setValue("nome", student.responsaveis.nome);
  //     setValue("nome_mae", student.responsaveis.nome_mae);
  //     setValue("parentesco", student.responsaveis.parentesco);
  //     setValue("profissao", student.responsaveis.profissao);
  //     setValue("rg", student.responsaveis.rg);
  //     setValue("sexo", student.responsaveis.sexo ? "True" : "False");
  //     setValue("uf_rg", student.responsaveis.uf_rg);

  //     if (student.responsaveis.bolsa_familia?.nis) {
  //       setBolsaFamilia(true);
  //     }
  //   }
  // }, [student, setValue]);

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  const handleBackStep = () => {
    navigate("/students/new-student/comments");
  };

  const handleNextStep = () => {
    navigate("/students/new-student/housing");
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
      data_nascimento: new Date(),
      sexo: "TRUE",
      rg: "",
      cpf: "",
      parentesco: "",
      escolaridade: "",
      apelido: "",
      data_expedicao_rg: new Date(),
      emissor_rg: "",
      uf_rg: "",
      data_expedicao_cpf: new Date(),
      profissao: "",
      nome_mae: "",
      bolsa_familia: {
        nis: "",
      },
      familiares_casa: 0,
    });
  };

  const handleSubmitParent = (data: any) => {
    console.log("data: ", data);

    // const { data_nascimento, data_expedicao_rg, data_expedicao_cpf, sexo, ...newData } = data;
    // const gender = sexo !== "False";
    // const data_nascimento_string = format(data_nascimento, "yyyy-MM-dd");
    // const data_expedicao_rg_string = format(data_expedicao_rg, "yyyy-MM-dd");
    // const data_expedicao_cpf_string = format(data_expedicao_cpf, "yyyy-MM-dd");

    // addStudentParents({
    //   ...newData,
    //   sexo: gender,
    //   data_nascimento: data_nascimento_string,
    //   data_expedicao_rg: data_expedicao_rg_string,
    //   data_expedicao_cpf: data_expedicao_cpf_string,
    // });

    // handleNextStep();
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
                    bolsaFamilia={bolsaFamilia}
                    handleCheckBolsaFamilia={handleCheckBolsaFamilia}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

          <div className="flex items-center justify-end gap-4 pt-5">
            <Button type="button" variant="outline" onClick={() => handleBackStep()}>
              Voltar
            </Button>
            <Button type="button" onClick={() => handleAddNewParent()}>Novo parente</Button>
            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};
