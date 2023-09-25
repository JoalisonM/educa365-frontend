import { House, Users } from "@phosphor-icons/react";

import { NavItem } from "./NavItem";

const MenuItems = {
  HOME: {
    to: "/",
    title: "Home",
    icon: House,
  },
  EMPLOYEES: {
    to: "/employees",
    title: "Funcionários",
    icon: Users,
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
