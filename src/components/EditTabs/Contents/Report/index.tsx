import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Sheet, SheetTrigger } from "@ui/components/ui/sheet";

import { Button } from "@components/Button";
import { Drawer } from "@components/Drawer";
import { useReport } from "@hooks/useReport";
import { StudentProps } from "@dtos/studentDTO";
import { ReportForm } from "@components/ReportForm";

interface ReportProps {
  student: StudentProps;
}

export const Report = ({ student }: ReportProps) => {
  const { createReport } = useReport();

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Relatórios</h2>
          <span className="text-sm text-zinc-500">Atualize as informações dos relatórios aqui.</span>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" className="text-sm">Adicionar</Button>
            </SheetTrigger>

            <Drawer title="Adicionar relatórios">
              <ReportForm studentId={student.id} />
            </Drawer>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
