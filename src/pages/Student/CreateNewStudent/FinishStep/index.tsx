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
  const navigate = useNavigate();
  const { createStudent } = useStudent();
  const { student, setCurrentStep } = useFormContext();

  useEffect(() => {
    setCurrentStep(6);
  }, []);

  const form = useForm({
    resolver: zodResolver(conditionsFormSchema),
  });

  const handleSubmit = () => {
    createStudent(student);

    navigate("/students");
  };

  return (
    <FormLayout>
      <div className="flex items-center justify-end gap-4 pt-5" onClick={() => handleSubmit()}>
          <Button type="submit">Finalizar</Button>
      </div>
    </FormLayout>
  );
};
