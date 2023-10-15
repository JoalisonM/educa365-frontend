import { EditTabs } from "@components/EditTabs";
import * as Tabs from "@radix-ui/react-tabs";

export const EditStudent = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-zinc-800">Editar educando</h1>
      </div>

      <EditTabs />
    </div>
  );
};
