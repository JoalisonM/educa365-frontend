import { api } from "../lib/axios";
import { ReportProps } from "@dtos/reportDTO";

const uriReport = "relatorio";

export const Report = {
  get(id: string) {
    return api.get(`${uriReport}/${id}`);
  },

  getAll(params: object | undefined) {
    return api.get(uriReport, { params });
  },

  create(report: FormData) {
    return api.post<ReportProps>(uriReport, report, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(id: string, report: FormData) {
    return api.put(`${uriReport}/${id}`, report, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete(id: string) {
    return api.delete(`${uriReport}/${id}`);
  },
};
