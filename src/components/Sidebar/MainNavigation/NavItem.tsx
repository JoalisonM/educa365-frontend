import { ElementType } from "react";
import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

const item = tv({
  slots: {
    base: "group flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-yellow-50 hover:text-gray600",
    active:
      "group flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-yellow-50 hover:text-gray600",
  },
});

const { base, active } = item();

interface NavItemProps {
  to: string;
  title: string;
  icon: ElementType;
}

export const NavItem = ({ to, icon: Icon, title }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (!isActive ? base() : active())}
    >
      <div className="bg-gray600 p-2 rounded-md group-hover:text-white group-aria-[current=page]:bg-selectiveYellow">
        <Icon className="h-5 w-5 group-aria-[current=page]:text-gray600" />
      </div>
      <span className="font-normal group-aria-[current=page]:font-medium">
        {title}
      </span>
    </NavLink>
  );
};
