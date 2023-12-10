import { useEffect } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Sheet, SheetTrigger } from "@ui/components/ui/sheet";

import { useAuth } from "@contexts/auth";
import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { Drawer } from "@components/Drawer";
import { useReport } from "@hooks/useReport";
import { CardFile } from "@components/CardFile";
import { EmployeeProps } from "@dtos/employeeDTO";
import { ReportForm } from "@components/ReportForm";
import { occupations } from "@configs/constant/employee";

export interface ReportDataProps {
  id: string;
  tipo: string;
  titulo: string;
  fileUrl: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
}

export const Report = () => {
  const { user } = useAuth();
  const { fetchReports, reports } = useReport();

  useEffect(() => {
    if (user?.cargo === occupations.MANAGER.value) {
      fetchReports();
    } else {
      user && fetchReports({ funcionario_id: user.id });
    }
  }, []);

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

      <section className="w-full grid grid-cols-4 gap-4 mt-4 lg:grid-cols-5">
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
