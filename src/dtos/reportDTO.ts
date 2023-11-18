import { EmployeeProps } from "./employeeDTO";
import { StudentProps } from "./studentDTO";

export interface ReportProps {
  id: string;
  tipo: string;
  titulo: string;
  relatorio: File;
  dataCriacao: string;
  educando: StudentProps;
  funcionario: EmployeeProps;
}

export interface CreateReportInput {
  formData: FormData;
}

export interface UpdateReportInput {
  id: string;
  formData: FormData;
}
