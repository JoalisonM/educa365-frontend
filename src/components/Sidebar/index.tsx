import { Gear, List } from "@phosphor-icons/react";
import * as Collapsible from "@radix-ui/react-collapsible";

import { Profile } from "./Profile";
import { MainNavigation } from "./MainNavigation";
import { NavItem } from "./NavItem";
import { Button } from "@components/Button";

export const Sidebar = () => {
  return (
    <Collapsible.Root className="flex flex-col gap-8 p-4  fixed left-0 top-0 right-0 z-20 bg-gray700 lg:right-auto lg:w-80 lg:bg-gray700 lg:px-5 lg:py-8 data-[state=open]:h-screen data-[state=open]:bottom-0 lg:data-[state=closed]:bottom-0 lg:data-[state=closed]:h-screen">
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <strong className="text-2xl font-semibold text-white">
            Educa365
          </strong>
          <Collapsible.Trigger asChild className="lg:hidden">
            <Button variant="ghost">
              <List className="h-6 w-6" />
            </Button>
          </Collapsible.Trigger>
        </div>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
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
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
