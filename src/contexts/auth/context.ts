import { createContext } from "use-context-selector";

import { LoginProps } from "@dtos/loginDTO";
import { EmployeeProps } from "@dtos/employeeDTO";

interface AuthContextData {
  user: EmployeeProps | null;
  loading: boolean;
  signOut: () => void;
  loadingUser: boolean;
  signIn: (user: LoginProps) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
