import { CloudArrowUp } from "@phosphor-icons/react";

import { useUpload } from "./Root";

export const Trigger = () => {
  const { id } = useUpload();

  return (
    <label
      htmlFor={id}
      className="group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm hover:border-emerald-200 hover:bg-emerald-25 hover:text-emerald-800"
    >
      <div className="rounded-full border-6 border-zinc-50 bg-zinc-100 p-2 group-hover:border-emerald-50 group-hover:bg-emerald-100">
        <CloudArrowUp className="h-5 w-5 text-zinc-600 group-hover:text-blueLagoon" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-bold text-blueLagoon">
            Clique para o upload
          </span>{" "}
          ou arraste e solte
        </span>
        <span className="text-sm">o(s) arquivo(s) PDF</span>
      </div>
    </label>
  );
};
