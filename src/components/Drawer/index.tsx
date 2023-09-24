import { ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";

interface DrawerProps {
  title: string;
  children: ReactNode;
}

export const Drawer = (props: DrawerProps) => {
  const { title, children } = props;

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed bg-black bg-opacity-60 inset-0" />
      <Dialog.Content className="fixed top-0 right-0 h-screen min-w-[40vw] max-w-3xl overflow-y-auto bg-white p-6 data-[state=open]:animate-slideRightIn data-[state=closed]:animate-slideRightOut focus:outline-none">
        <Dialog.Title className="font-bold text-2xl pb-4 border-b border-gray-200">
          {title}
        </Dialog.Title>

        {children}

        <Dialog.Close asChild>
          <button
            className="text-zinc-500 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <X weight="bold" className="h-5 w-5" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
