import { api } from "../lib/axios";
import { LoginProps } from "@dtos/loginDTO";
import { EmployeeProps } from "@dtos/employeeDTO";

export interface LoginResponse {
  pessoa: {
    id: number;
    nome: string;
    email: string;
    nascimento: string;
    telefone: string;
    senha: string;
    tipo: string;
  };
  token: string;
}

const uriLogin = "/login";
const uriLogout = "/logout";
const uriGetMe = "/funcionarios/me";

export const Authenticator = {
  doLogin(parameter: LoginProps) {
    return api.post<any>(
      uriLogin,
      parameter,
    );
  },

  doLogout() {
    return api.post(uriLogout);
  },

  getMe() {
    return api.get<EmployeeProps>(uriGetMe);
  },
};
