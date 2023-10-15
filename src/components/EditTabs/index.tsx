import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocation } from "react-router-dom";

import { TabItem } from "./TabItem";
import { Address } from "./Contents/Address";
import { Parents } from "./Contents/Parents";
import { Comments } from "./Contents/Comments";
import { Conditions } from "./Contents/Conditions";
import { StudentDetails } from "./Contents/StudentDetails";
import { useStudent } from "@hooks/useStudent";

export const EditTabs = () => {
  const { state } = useLocation();
  const { getStudent, student } = useStudent();
  const [currentTab, setCurrentTab] = useState("tab1");

  useEffect(() => {
    getStudent(state.id);
  }, [state]);

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200">
        <TabItem value="tab1" title="Detalhes do educando" isSelected={currentTab === "tab1"} />
        <TabItem value="tab2" title="Endereço" isSelected={currentTab === "tab2"} />
        <TabItem value="tab3" title="Observações específicas" isSelected={currentTab === "tab3"} />
        <TabItem value="tab4" title="Responsáveis" isSelected={currentTab === "tab4"} />
        <TabItem value="tab5" title="Condições de moradia e vida" isSelected={currentTab === "tab5"} />
      </Tabs.List>
      <Tabs.Content value="tab1"><StudentDetails student={student} /></Tabs.Content>
      <Tabs.Content value="tab2"><Address student={student} /></Tabs.Content>
      <Tabs.Content value="tab3"><Comments student={student} /></Tabs.Content>
      <Tabs.Content value="tab4"><Parents student={student} /></Tabs.Content>
      <Tabs.Content value="tab5"><Conditions student={student} /></Tabs.Content>
    </Tabs.Root>
  );
};
