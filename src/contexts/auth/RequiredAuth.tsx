import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { STORAGE_KEYS } from ".";

interface UserProps {
  id: string;
  role: string;
}

interface RequiredAuthProps {
  children: ReactNode;
}

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const userStorage = localStorage.getItem(STORAGE_KEYS.USER_KEY);
  const user: UserProps = userStorage && JSON.parse(userStorage);

  if (!user?.id) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
