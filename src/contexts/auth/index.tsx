import { useState, useCallback, ReactNode, useEffect } from "react";
import { useContextSelector } from "use-context-selector";

import AuthContext from "./context";
import { useLogin } from "@hooks/useLogin";
import { LoginProps } from "@dtos/loginDTO";
import { EmployeeProps } from "@dtos/employeeDTO";
import { occupations } from "@configs/constant/employee";

export const STORAGE_KEYS = {
  USER_KEY: "user-storage",
  ACCESS_TOKEN: "access-token",
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { loading, getSession, logout, getMe, loadingUser } = useLogin();
  const [user, setUser] = useState<EmployeeProps | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      if (token) {
        await handleUser();
      } else {
        await signOut();
      }
    };

    validateToken();
  }, []);

  const signIn = useCallback(async (userData: LoginProps) => {
    const { email, senha } = userData;

    const data = await getSession({
      email,
      senha,
    });

    if (data) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.token);
      await handleUser();

      return true;
    }

    return false;
  }, []);

  const handleUser = useCallback(async () => {
    const newUser = await getMe();
    if (newUser) {
      setUser(newUser);
    }

    localStorage.setItem(STORAGE_KEYS.USER_KEY, JSON.stringify({
      id: newUser && newUser.id,
      role: newUser && newUser.cargo,
    }));
  }, []);

  const signOut = useCallback(async () => {
    await logout();

    setUser(null);
    clearSessionData();
  }, []);

  const validateManager = async () => {
    if (user && user.cargo === occupations.MANAGER.value) {
      return true;
    };

    return false;
  };

  const validateSocialWorker = async () => {
    if (user && user.cargo === occupations.SOCIAL_WORKER.value) {
      return true;
    };

    return false;
  };

  const clearSessionData = () => {
    localStorage.setItem(STORAGE_KEYS.USER_KEY, "");
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, "");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
        loadingUser,
        validateManager,
        validateSocialWorker,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const loading = useContextSelector(AuthContext, (auth) => auth.loading);
  const signOut = useContextSelector(AuthContext, (auth) => auth.signOut);
  const signIn = useContextSelector(AuthContext, (auth) => auth.signIn);
  const user = useContextSelector(AuthContext, (auth) => auth.user);
  const loadingUser = useContextSelector(AuthContext, (auth) => auth.loadingUser);
  const validateManager = useContextSelector(AuthContext, (auth) => auth.validateManager);
  const validateSocialWorker = useContextSelector(AuthContext, (auth) => auth.validateSocialWorker);

  return {
    loading,
    signOut,
    signIn,
    user,
    loadingUser,
    validateManager,
    validateSocialWorker,
  };
}
