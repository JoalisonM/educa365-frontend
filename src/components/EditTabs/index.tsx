import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocation } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { TabItem } from "./TabItem";
import { Report } from "./Contents/Report";
import { Address } from "./Contents/Address";
import { Parents } from "./Contents/Parents";
import { Comments } from "./Contents/Comments";
import { Conditions } from "./Contents/Conditions";
import { StudentDetails } from "./Contents/StudentDetails";
import { useStudent } from "@hooks/useStudent";
import { useAuth } from "@contexts/auth";
import { occupations } from "@configs/constant/employee";

export const EditTabs = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const { getStudent, student } = useStudent();
  const [currentTab, setCurrentTab] = useState("tab1");

  useEffect(() => {
    getStudent(state.id);
  }, [state]);

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <ScrollArea.Root className="w-full" type="scroll">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200">
            <TabItem value="tab1" title="Detalhes do educando" isSelected={currentTab === "tab1"} />
            <TabItem value="tab2" title="Endereço" isSelected={currentTab === "tab2"} />
            <TabItem value="tab3" title="Observações específicas" isSelected={currentTab === "tab3"} />
            <TabItem value="tab4" title="Responsáveis" isSelected={currentTab === "tab4"} />
            <TabItem value="tab5" title="Condições de moradia e vida" isSelected={currentTab === "tab5"} />
            {user?.cargo === occupations.SOCIAL_WORKER.value &&
              <TabItem value="tab6" title="Relatórios" isSelected={currentTab === "tab6"} />
            }
          </Tabs.List>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex h-0.5 translate-y-1.5 touch-none select-none bg-zinc-100"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <Tabs.Content value="tab1"><StudentDetails student={student} /></Tabs.Content>
      <Tabs.Content value="tab2"><Address student={student} /></Tabs.Content>
      <Tabs.Content value="tab3"><Comments student={student} /></Tabs.Content>
      <Tabs.Content value="tab4"><Parents student={student} /></Tabs.Content>
      <Tabs.Content value="tab5"><Conditions student={student} /></Tabs.Content>
      <Tabs.Content value="tab6"><Report student={student} /></Tabs.Content>
    </Tabs.Root>
  );
};
