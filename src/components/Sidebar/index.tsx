import { Gear } from "@phosphor-icons/react";

import { Profile } from "./Profile";
import { MainNavigation } from "./MainNavigation";
import { NavItem } from "./MainNavigation/NavItem";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-8 px-5 py-8 bg-gray700">
      <div className="px-3 space-y-4">
        <strong className="text-2xl font-semibold text-white">Educa365</strong>
        <div className="h-px bg-gray-600" />
      </div>

      <MainNavigation />

      <div className="mt-auto flex flex-col gap-4">
        <nav className="space-y-0.5">
          <NavItem to="/settings" icon={Gear} title="Configurações" />
        </nav>

        <div className="mt-auto px-3 space-y-6">
          <div className="h-px bg-gray-600" />
          <Profile />
        </div>
      </div>
    </aside>
  );
};
