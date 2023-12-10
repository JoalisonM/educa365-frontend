import { useEffect } from "react";
import { Sheet, SheetTrigger } from "@ui/components/ui/sheet";

import { Button } from "@components/Button";
import { Drawer } from "@components/Drawer";
import { useReport } from "@hooks/useReport";
import { StudentProps } from "@dtos/studentDTO";
import { ReportForm } from "@components/ReportForm";
import { CardFile } from "@components/CardFile";

interface ReportProps {
  student: StudentProps;
}

export const Report = ({ student }: ReportProps) => {
  const { fetchReports, reports } = useReport();

  useEffect(() => {
    if (student) {
      fetchReports({ educando_id: student.id });
    }
  }, []);

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col gap-4 justify-between pb-5 border-b border-zinc-100 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Relatórios</h2>
          <span className="text-sm text-zinc-500">Os relatórios do educando são listados aqui.</span>
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

      <section className="w-full grid grid-cols-4 gap-4 mt-8 lg:grid-cols-5">
        {reports && reports.map((report) => (
          <CardFile
            key={report.id}
            report={report}
          />
        ))}
      </section>
    </div>
  );
};
