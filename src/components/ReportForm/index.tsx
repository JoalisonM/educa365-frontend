import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
} from "@ui/components/ui/form";

import { Button } from "@components/Button";
import * as Upload from "@components/Upload";
import { useReport } from "@hooks/useReport";
import { SheetClose } from "@ui/components/ui/sheet";
import { reportFormSchema } from "@schemas/reportFormSchema";

export type ReportFormInputs = z.infer<typeof reportFormSchema>;

interface ReportFormProps {
  studentId?: string;
}

export const ReportForm = ({ studentId }: ReportFormProps) => {
  const { createReport } = useReport();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<any>();

  const handleSubmitReport = () => {
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("relatorio", file);
      formData.append("tipo", "Academico");
      formData.append("titulo", file.name);
      studentId && formData.append("educando_id", studentId);
      formData.append("funcionario_id", "d9b644f8-6adf-476f-97b8-733db8f1f8ce");

      await createReport(formData);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitReport)}
        className="flex flex-1 flex-col w-full gap-6 pt-8"
      >
        <div className="grid grid-cols-1">
          <Upload.Root setFilesInfo={setFiles}>
            <Upload.Trigger />
            <Upload.FileList />
            <Upload.Control multiple />
          </Upload.Root>
        </div>

        <div className="mt-auto flex items-center justify-end gap-4 pt-5">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">
              Finalizar
            </Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
};
