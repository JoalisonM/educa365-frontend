import { MagnifyingGlass } from "@phosphor-icons/react";
import { Sheet, SheetTrigger } from "@ui/components/ui/sheet";

import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { Drawer } from "@components/Drawer";
import { ReportForm } from "@components/ReportForm";
import { CardFile } from "@components/CardFile";
import { useReport } from "@hooks/useReport";
import { useEffect, useState } from "react";
import { EmployeeProps } from "@dtos/employeeDTO";

export interface ReportDataProps {
  id: string;
  tipo: string;
  titulo: string;
  fileUrl: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
}

export const Report = () => {
  const { fetchReports, getReport } = useReport();
  const [reportsData, setReportsData] = useState<ReportDataProps[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      const reports = await fetchReports();

      if (reports) {
        reports.map(async (report) => {
          const response = await getReport(report.id);

          if (response) {
            const fileURL = URL.createObjectURL(response);

            setReportsData((state) => {
              const existingReport = state.find((existing) => existing.id === report.id);

              if (existingReport) {
                return state.map((item) =>
                  item.id === report.id
                    ? {
                      ...item,
                      titulo: report.titulo,
                      funcionario: report.funcionario,
                      tipo: report.tipo,
                      dataCriacao: report.dataCriacao,
                      fileUrl: fileURL,
                    }
                    : item,
                );
              } else {
                return [
                  ...state,
                  {
                    id: report.id,
                    titulo: report.titulo,
                    funcionario: report.funcionario,
                    tipo: report.tipo,
                    dataCriacao: report.dataCriacao,
                    fileUrl: fileURL,
                  },
                ];
              }
            });
          }
        });
      }
    };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-5 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Relatórios</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="primary"
            >
              Adicionar
            </Button>
          </SheetTrigger>

          <Drawer title="Adicionar relatórios">
            <ReportForm />
          </Drawer>
        </Sheet>
      </div>

      <Input.Root className="mx-1 flex items-center gap-2 rounded-full bg-gray-50 border border-gray-300 px-3 py-2 shadow-sm md:w-96">
        <Input.Prefix>
          <MagnifyingGlass className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control placeholder="Pesquisar" />
      </Input.Root>

      <section className="w-full grid grid-cols-5 gap-4 mt-4">
        {reportsData && reportsData.map((report) => (
          <CardFile
            key={report.id}
            report={report}
            imgUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ))}
      </section>
    </div>
  );
};
