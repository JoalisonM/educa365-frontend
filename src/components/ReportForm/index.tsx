import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
} from "@ui/components/ui/form";

import { Button } from "@components/Button";
import * as Upload from "@components/Upload";
import { useReport } from "@hooks/useReport";
import { STORAGE_KEYS } from "@contexts/auth";
import { SheetClose } from "@ui/components/ui/sheet";
import { ReportDataProps } from "@contexts/reportContext";
import { reportFormSchema } from "@schemas/reportFormSchema";

export type ReportFormInputs = z.infer<typeof reportFormSchema>;

interface ReportFormProps {
  studentId?: string;
}

export const ReportForm = ({ studentId }: ReportFormProps) => {
  const { createReport, setReports } = useReport();
  const [files, setFiles] = useState<File[]>([]);
  const userStorage = localStorage.getItem(STORAGE_KEYS.USER_KEY);
  const user = userStorage && JSON.parse(userStorage);

  const form = useForm<any>();

  const handleSubmitReport = () => {
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("relatorio", file);
      formData.append("tipo", "Academico");
      formData.append("titulo", file.name);
      studentId && formData.append("educando_id", studentId);
      formData.append("funcionario_id", user.id);

      const response = await createReport(formData);
      const fileURL = window.URL.createObjectURL(file);

      const report: ReportDataProps = {
        ...response,
        fileUrl: fileURL,
      };

      setReports((state: ReportDataProps[])  => [report, ...state]);
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
