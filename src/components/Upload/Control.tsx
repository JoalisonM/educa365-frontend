import { ChangeEvent, ComponentProps } from 'react'

import { useUpload } from './Root'

type ControlProps = ComponentProps<'input'>

export const Control = ({ multiple = false, ...props }: ControlProps) => {
  const { id, onFilesSelected } = useUpload()

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files, multiple)
  }

  return (
    <input
      id={id}
      {...props}
      type="file"
      className="sr-only"
      multiple={multiple}
      onChange={handleFilesSelected}
    />
  )
}
