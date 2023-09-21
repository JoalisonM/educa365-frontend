import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown } from '@phosphor-icons/react'
import React, { ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface SelectProps extends UseFormRegisterReturn {
  children: ReactNode
  placeholder: string
}

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    { children, name, onChange, placeholder, ...props }: SelectProps,
    // eslint-disable-next-line prettier/prettier
    forwardedRef
  ) => {
    return (
      <SelectPrimitive.Root
        {...props}
        onValueChange={(value) => onChange({ target: { name, value } })}
      >
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
            ref={forwardedRef}
            className="z-10 w-[--radix-select-trigger-width] animate-slideDownAndFade rounded-lg border border-zinc-200 bg-white overflow-hidden"
          >
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
    // eslint-disable-next-line prettier/prettier
  }
)
