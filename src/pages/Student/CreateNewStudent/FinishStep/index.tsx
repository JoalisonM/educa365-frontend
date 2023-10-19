import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@components/Button";
import { Form } from "@ui/components/ui/form";
import { useStudent } from "@hooks/useStudent";
import { useFormContext } from "@hooks/useForm";
import { FormLayout } from "@layouts/FormLayout";
import { conditionsFormSchema } from "@schemas/conditionsFormSchema";

export const FinishStep = () => {
  const initialData = {
    currentStep: 1,
    student: {},
  };
  const navigate = useNavigate();
  const { createStudent } = useStudent();
  const { student, resetStudent, setCurrentStep } = useFormContext();

  useEffect(() => {
    setCurrentStep(6);
  }, []);

  const handleBackStep = () => {
    navigate(`${location.pathname.replace("finish", "conditions")}`);
  };

  const handleSubmit = () => {
    createStudent(student);

    const stateJSON = JSON.stringify(initialData);
    localStorage.setItem("@educa365:form-state-1.0.0", stateJSON);

    resetStudent();

    navigate("/students");
  };

  return (
    <FormLayout>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-4 px-4 py-2 divide-x border-gray-200 bg-zinc-100 rounded-lg">
          <h1 className="text-2xl font-bold">Dados do educando</h1>
          <div className="grid grid-cols-3">
            <span>Nome: {student.nome}</span>
            <span>NIS: {student.nis}</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 pt-5">
          <Button type="button" variant="outline" onClick={() => handleBackStep()}>
            Voltar
          </Button>
          <Button type="button" onClick={() => handleSubmit()}>Finalizar</Button>
        </div>
      </div>
    </FormLayout>
  );
};
