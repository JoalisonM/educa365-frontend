import { Chalkboard, FileCloud, Student, Users } from "@phosphor-icons/react";

import { NavItem } from "./NavItem";
import { USER_TYPES } from "@configs/constant/userTypes";
import { useAuth } from "@contexts/auth";

const MenuItems = {
  STUDENTS: {
    to: "/students",
    title: "Educandos",
    icon: Student,
    roles: [USER_TYPES.MANAGER, USER_TYPES.TEACHER, USER_TYPES.SOCIAL_WORKER],
  },
  EMPLOYEES: {
    to: "/employees",
    title: "Funcionários",
    icon: Users,
    roles: [USER_TYPES.MANAGER],
  },
  CLASSES: {
    to: "/classes",
    title: "Turmas",
    icon: Chalkboard,
    roles: [USER_TYPES.MANAGER],
  },
  REPORTS: {
    to: "/reports",
    title: "Relatórios",
    icon: FileCloud,
    roles: [USER_TYPES.MANAGER, USER_TYPES.TEACHER, USER_TYPES.SOCIAL_WORKER],
  },
};

export const MainNavigation = () => {
  const { user } = useAuth();

  return (
    <nav className="space-y-0.5">
      {Object.entries(MenuItems).map(([key, item]) => {
        const isFound = user && item.roles.includes(user.cargo);

        if (isFound) {
          return <NavItem key={key} to={item.to} icon={item.icon} title={item.title} />;
        }
      })}
    </nav>
  );
};
