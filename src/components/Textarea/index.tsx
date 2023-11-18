import { ComponentProps } from "react";

type ControlProps = ComponentProps<"textarea">;

export const Control = (props: ControlProps) => {
  return (
    <textarea
      className="flex-1 h-full p-2 border-0 bg-transparent leading-snug outline-none resize-none text-zinc-900 placeholder-zinc-500 placeholder:text-sm disabled:cursor-not-allowed"
      {...props}
    />
  );
};

type RootProps = ComponentProps<"div">;

export const Root = (props: RootProps) => {
  return (
    <div
      className="flex w-96 h-40 items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus-within:border-blueLagoon focus-within:ring-4 focus-within:ring-emerald-100"
      {...props}
    />
  );
};
