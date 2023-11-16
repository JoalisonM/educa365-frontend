import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

import {
  ReportProps,
  CreateReportInput,
  UpdateReportInput,
} from "../dtos";
import { Report } from "../api/report";

interface ReportContextType {
  report: ReportProps;
  reports: ReportProps[];
  deleteReport: (id: string) => void;
  setReport: (value: ReportProps) => void;
  getReport: (id: string) => Promise<void>;
  fetchReports: () => Promise<void>;
  createReport: (data: CreateReportInput) => Promise<void>;
  updateReport: (data: UpdateReportInput) => Promise<void>;
}

export const ReportContext = createContext({} as ReportContextType);

interface ReportContextProviderProps {
  children: ReactNode;
}

export const ReportContextProvider = ({
  children,
}: ReportContextProviderProps) => {
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [report, setReport] = useState<ReportProps>({} as ReportProps);

  const fetchReports = useCallback(async () => {
    const response = await Report.getAll();

    setReports(response.data);
  }, []);

  const getReport = useCallback(async (id: string) => {
    const response = await Report.get(id);

    if (response) {
      setReport(response.data);
    }
  }, []);

  const createReport = useCallback(async (data: CreateReportInput) => {
    const response = await Report.create(data);

    return response.data;

    // setReports((state) => [response.data, ...state]);
  }, []);

  const updateReport = useCallback(async (data: UpdateReportInput) => {
    const response = await Report.update(data);

    setReports((state) =>
      state.map((employee) =>
        employee.id === data.id ? response.data : employee,
      ),
    );
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
