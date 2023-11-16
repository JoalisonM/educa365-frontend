export interface ReportProps {
  id: string;
  tipo: string;
  titulo: string;
  funcionario_id: string;
  relatorio: File;
}

export interface CreateReportInput {
  tipo: string;
  titulo: string;
  funcionario_id: string;
  relatorio: FormData;
}

export interface UpdateReportInput {
  id: string;
  tipo: string;
  titulo: string;
  funcionario_id: string;
  relatorio: File;
}
