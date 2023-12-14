import { EmployeeProps } from "./employeeDTO";
import { ReportCommentsProps } from "./reportCommentsDTO";

export interface ReportProps {
  id: string;
  tipo: string;
  titulo: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
  comentarios: Array<ReportCommentsProps>;
}

export interface CreateReportInput {
  formData: FormData;
}

export interface UpdateReportInput {
  id: string;
  formData: FormData;
}
