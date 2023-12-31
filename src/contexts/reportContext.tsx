import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

import {
  ReportProps,
  EmployeeProps,
} from "../dtos";
import { Report } from "../api/report";
import { ReportCommentsProps } from "@dtos/reportCommentsDTO";

export interface ReportDataProps {
  id: string;
  tipo: string;
  titulo: string;
  fileUrl: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
  comentarios: Array<ReportCommentsProps>;
}

interface ReportContextType {
  report: ReportProps;
  reports: ReportDataProps[];
  deleteReport: (id: string) => void;
  setReport: (value: ReportProps) => void;
  setReports: (value: ReportDataProps[]) => void;
  getReport: (id: string) => Promise<Blob | undefined>;
  fetchReports: (params?: ParamsProps) => Promise<void>;
  createReport: (data: FormData) => Promise<ReportProps>;
  updateReport: (id: string, data: FormData) => Promise<void>;
}

export const ReportContext = createContext({} as ReportContextType);

interface ParamsProps {
  educando_id?: string;
  funcionario_id?: string;
}

interface ReportContextProviderProps {
  children: ReactNode;
}

export const ReportContextProvider = ({
  children,
}: ReportContextProviderProps) => {
  const [reports, setReports] = useState<ReportDataProps[]>([]);
  const [report, setReport] = useState<ReportProps>({} as ReportProps);

  const fetchReports = useCallback(async (params?: ParamsProps) => {
    setReports([]);
    try {
      const response = await Report.getAll(params);
      const reports = response.data;

      if (reports) {
        reports.map(async (report: ReportDataProps) => {
          const reportResponse = await getReport(report.id);

          if (reportResponse) {
            const fileURL = window.URL.createObjectURL(reportResponse);

            setReports((state) => {
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
                      comentarios: report.comentarios,
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
                    comentarios: report.comentarios,
                    fileUrl: fileURL,
                  },
                ];
              }
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getReport = useCallback(async (id: string) => {
    const tokenStorage = localStorage.getItem("access-token");
    const token = `Bearer ${tokenStorage}`;

    const response = await fetch(`http://127.0.0.1:5000/api/relatorio/${id}`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    });

    if (response.ok) {
      const blob = await response.blob();

      return blob;
    }
  }, []);

  const createReport = useCallback(async (data: FormData) => {
    const response = await Report.create(data);

    return response.data;
  }, []);

  const updateReport = useCallback(async (id: string, data: FormData) => {
    const response = await Report.update(id, data);

    // setReports((state) =>
    //   state.map((employee) =>
    //     employee.id === data.id ? response.data : employee,
    //   ),
    // );
  }, []);

  const deleteReport = async (id: string) => {
    await Report.delete(id);

    setReports((state) => state.filter((employee) => employee.id !== id));
  };

  return (
    <ReportContext.Provider
      value={{
        report,
        reports,
        setReport,
        getReport,
        setReports,
        fetchReports,
        createReport,
        updateReport,
        deleteReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
