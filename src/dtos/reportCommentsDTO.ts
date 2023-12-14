import { EmployeeProps } from "./employeeDTO";

export interface ReportCommentsProps {
  id: string;
  texto: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
}

export interface CreateReportInput {
  texto: string;
  relatorio_id: string;
  funcionario_id: string;
}
