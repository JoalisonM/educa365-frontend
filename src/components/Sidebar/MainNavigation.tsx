import { Chalkboard, FileCloud, House, Student, Users } from "@phosphor-icons/react";

import { NavItem } from "./NavItem";

const MenuItems = {
  HOME: {
    to: "/",
    title: "Home",
    icon: House,
  },
  STUDENTS: {
    to: "/students",
    title: "Educandos",
    icon: Student,
  },
  EMPLOYEES: {
    to: "/employees",
    title: "Funcionários",
    icon: Users,
  },
  CLASSES: {
    to: "/classes",
    title: "Turmas",
    icon: Chalkboard,
  },
  REPORTS: {
    to: "/reports",
    title: "Relatórios",
    icon: FileCloud,
  },
};

export const MainNavigation = () => {
  return (
    <nav className="space-y-0.5">
      {Object.entries(MenuItems).map(([key, item]) => (
        <NavItem key={key} to={item.to} icon={item.icon} title={item.title} />
      ))}
    </nav>
  );
};
