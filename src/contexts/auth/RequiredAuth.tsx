import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { STORAGE_KEYS } from ".";

interface UserProps {
  userId: string;
  role: string;
}

interface RequiredAuthProps {
  children: ReactNode;
}

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const userStorage: UserProps = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_KEY) as string);

  if (!userStorage?.userId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
