import { api } from "../lib/axios";

const uriReport = "relatorio";

export const Report = {
  get(id: string) {
    return api.get(`${uriReport}/${id}`);
  },

  getAll() {
    return api.get(uriReport);
  },

  create(report: FormData) {
    return api.post(uriReport, report, {
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
