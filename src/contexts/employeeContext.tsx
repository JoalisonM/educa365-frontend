import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

import {
  EmployeeProps,
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "../dtos";
import { Employee } from "../api/employee";

interface EmployeeContextType {
  employee: EmployeeProps;
  employees: EmployeeProps[];
  deleteEmployee: (id: string) => void;
  setEmployee: (value: EmployeeProps) => void;
  getEmployee: (id: string) => Promise<void>;
  fetchEmployees: (cargo?: string) => Promise<void>;
  createEmployee: (data: CreateEmployeeInput) => Promise<void>;
  updateEmployee: (data: UpdateEmployeeInput) => Promise<void>;
}

export const EmployeeContext = createContext({} as EmployeeContextType);

interface EmployeeContextProviderProps {
  children: ReactNode;
}

export const EmployeeContextProvider = ({
  children,
}: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [employee, setEmployee] = useState<EmployeeProps>({} as EmployeeProps);

  const fetchEmployees = useCallback(async (cargo?: string) => {
    const params = {
      nome: "",
      sexo: 0,
      rg: "",
      cpf: "",
      dataNascimento: "",
      email: "",
      cargo: cargo ? cargo : "",
      senha: "",
      endereco: {},
    };
    const response = await Employee.getAll(params);

    setEmployees(response.data);
  }, []);

  const getEmployee = useCallback(async (id: string) => {
    const response = await Employee.get(id);

    if (response) {
      setEmployee(response.data);
    }
  }, []);

  const createEmployee = useCallback(async (data: CreateEmployeeInput) => {
    const response = await Employee.create(data);

    setEmployees((state) => [response.data, ...state]);
  }, []);

  const updateEmployee = useCallback(async (data: UpdateEmployeeInput) => {
    const response = await Employee.update(data);

    setEmployees((state) =>
      state.map((employee) =>
        employee.id === data.id ? response.data : employee,
      ),
    );
  }, []);

  const deleteEmployee = async (id: string) => {
    Employee.delete(id);

    setEmployees((state) => state.filter((employee) => employee.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employee,
        employees,
        setEmployee,
        getEmployee,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
