import { api } from "../lib/axios";
import { CreateReportInput, UpdateReportInput } from "../dtos";

const uriReport = "relatorios";

export const Report = {
  get(id: string) {
    return api.get(`${uriReport}/${id}`);
  },

  getAll() {
    return api.get(uriReport);
  },

  create(report: CreateReportInput) {
    return api.post(uriReport, report, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(report: UpdateReportInput) {
    const { id, ...newReport } = report;

    return api.put(`${uriReport}/${id}`, newReport, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete(id: string) {
    return api.delete(`${uriReport}/${id}`);
  },
};
