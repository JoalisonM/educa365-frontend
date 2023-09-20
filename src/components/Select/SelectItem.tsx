import { Check } from '@phosphor-icons/react'
import * as Select from '@radix-ui/react-select'

type SelectItemProps = Select.SelectItemProps & {
  text: string
}

export const SelectItem = ({ text, ...props }: SelectItemProps) => {
  return (
    <Select.Item
      className="flex items-center justify-between gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-zinc-50"
      {...props}
    >
      <Select.ItemText className="text-black">{text}</Select.ItemText>
      <Select.ItemIndicator>
        <Check className="h-4 w-4 text-blueLagoon" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}