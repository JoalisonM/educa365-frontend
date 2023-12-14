import { api } from "../lib/axios";
import { ReportCommentsProps, CreateReportInput } from "@dtos/reportCommentsDTO";

const uriReportComments = "comentarios";

export const ReportComments = {
  getAll() {
    return api.get(uriReportComments);
  },

  create(report: CreateReportInput) {
    return api.post<ReportCommentsProps>(uriReportComments, report);
  },

  delete(id: string) {
    return api.delete(`${uriReportComments}/${id}`);
  },
};
