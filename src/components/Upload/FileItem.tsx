import { tv, VariantProps } from "tailwind-variants";
import { CheckCircle, CloudArrowUp, Trash } from "@phosphor-icons/react";

import { Button } from "../Button";
import { formatBytes } from "@utils/format-bytes";

const fileItem = tv({
  slots: {
    container:
      "group flex items-start gap-4 rounded-lg border border-zinc-200 p-4",
    icon: "rounded-full border-4 border-emerald-100 bg-emerald-200 p-2 text-blueLagoon",
    deleteButton: "",
  },

  variants: {
    state: {
      progress: {
        container: "",
      },
      complete: {
        container: "border-blueLagoon",
      },
      error: {
        container: "bg-error-25 border-error-300",
        icon: "border-error-50 bg-error-100 text-error-600",
        deleteButton: "text-error-700 hover:text-error-900",
      },
    },
  },

  defaultVariants: {
    state: "progress",
  },
});

interface FileItemProps extends VariantProps<typeof fileItem> {
  name: string;
  size: number;
}

export const FileItem = ({ name, size, state }: FileItemProps) => {
  const { container, icon, deleteButton } = fileItem({ state });
  return (
    <div className={container()}>
      <div className={icon()}>
        <CloudArrowUp h-4 w-4 />
      </div>
      {state === "error" ? (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-error-700">
              Falha no upload, por favor tente novamente.
            </span>
            <span className="text-sm text-error-600">{name}</span>
          </div>

          <button
            type="button"
            className="text-sm font-bold text-error-700 hover:text-error-900"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-700">{name}</span>
            <span className="text-sm text-zinc-500">{formatBytes(size)}</span>
          </div>

          <div className="flex w-full items-center gap-3">
            <div className="h-2 flex-1 rounde-full bg-zinc-100">
              <div
                className="h-2 rounded-full bg-blueLagoon"
                style={{ width: state === "complete" ? "100%" : "80%" }}
              />
            </div>
            <span className="text-sm font-medium text-zinc-700">
              {state === "complete" ? "100%" : "80%"}
            </span>
          </div>
        </div>
      )}

      {state === "complete" ? (
        <CheckCircle className="h-5 w-5 fill-blueLagoon text-white" />
      ) : (
        <Button type="button" variant="ghost" className={deleteButton()}>
          <Trash className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
