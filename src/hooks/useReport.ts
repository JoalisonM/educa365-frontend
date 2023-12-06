import { useContextSelector } from "use-context-selector";

import { ReportContext } from "../contexts/reportContext";

export const useReport = () => {
  const report = useContextSelector(ReportContext, (context) => context.report);
  const reports = useContextSelector(ReportContext, (context) => context.reports);
  const getReport = useContextSelector(ReportContext, (context) => context.getReport);
  const setReport = useContextSelector(ReportContext, (context) => context.setReport);
  const setReports = useContextSelector(ReportContext, (context) => context.setReports);
  const createReport = useContextSelector(ReportContext, (context) => context.createReport);
  const deleteReport = useContextSelector(ReportContext, (context) => context.deleteReport);
  const fetchReports = useContextSelector(ReportContext, (context) => context.fetchReports);
  const updateReport = useContextSelector(ReportContext, (context) => context.updateReport);

  return {
    report,
    reports,
    getReport,
    setReport,
    setReports,
    fetchReports,
    createReport,
    deleteReport,
    updateReport,
  };
};
