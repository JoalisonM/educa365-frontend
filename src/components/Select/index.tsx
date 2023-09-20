import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown } from '@phosphor-icons/react'
import { ReactNode } from 'react'

interface SelectProps {
  children: ReactNode
  placeholder: string
}

export const Select = ({ children, placeholder }: SelectProps) => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm data-[placeholder]:text-zinc-500 outline-none focus:border-blueLagoon focus:ring-4 focus:ring-emerald-100">
        <SelectPrimitive.Value
          placeholder={placeholder}
          className="text-black"
        />
        <SelectPrimitive.Icon>
          <CaretDown className="h-5 w-5 tex-zinc-500" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          side="bottom"
          position="popper"
          sideOffset={8}
          className="z-10 w-[--radix-select-trigger-width] animate-slideDownAndFade rounded-lg border border-zinc-200 bg-white overflow-hidden"
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
