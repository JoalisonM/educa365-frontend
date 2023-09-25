import { api } from "../lib/axios";
import { CreateEmployeeInput, UpdateEmployeeInput } from "../dtos";

const uriEmployee = "funcionarios";

export const Employee = {
  get(id: string) {
    return api.get(`${uriEmployee}/${id}`);
  },

  getAll() {
    return api.get(uriEmployee);
  },

  create(employee: CreateEmployeeInput) {
    return api.post(uriEmployee, employee);
  },

  update(employee: UpdateEmployeeInput) {
    const { id, ...newEmployee } = employee;

    return api.put(`${uriEmployee}/${id}`, newEmployee);
  },

  delete(id: string) {
    return api.delete(`${uriEmployee}/${id}`);
  },
};
