import { api } from "../lib/axios";
import { CreateStudentInput, UpdateStudentInput } from "../dtos";

const uriStudent = "educandos";

export const Student = {
  get(id: string) {
    return api.get(`${uriStudent}/${id}`);
  },

  getAll() {
    return api.get(uriStudent);
  },

  create(student: CreateStudentInput) {
    return api.post(uriStudent, student);
  },

  update(student: UpdateStudentInput) {
    const { id, ...newStudent } = student;

    return api.put(`${uriStudent}/${id}`, newStudent);
  },

  delete(id: string) {
    return api.delete(`${uriStudent}/${id}`);
  },
};
