import { api } from "../lib/axios";
import { ClassProps, RequestTeacher } from "@dtos/class";

interface CreateClassesProps {
  professor_id: string;
}

const uriClass = "turmas";

export const Class = {
  get(id: string) {
    return api.get(`${uriClass}/${id}`);
  },

  getAll() {
    return api.get(uriClass);
  },

  createClasses() {
    return api.post<Array<ClassProps>>(`${uriClass}/gerarTurmas`);
  },

  addTeacher(id: string, params: CreateClassesProps) {
    return api.patch(`${uriClass}/${id}`, params);
  },

  delete(id: string | number) {
    return api.delete(`${uriClass}/${id}`);
  },
};
