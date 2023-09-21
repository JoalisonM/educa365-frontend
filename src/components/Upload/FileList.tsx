import { useAutoAnimate } from '@formkit/auto-animate/react'

import { useUpload } from './Root'
import { FileItem } from './FileItem'

export const FileList = () => {
  const { files } = useUpload()
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent} className="mt-4 flex flex-col gap-3">
      {files.map((file) => {
        return (
          <FileItem
            key={file.name}
            name={file.name}
            size={file.size}
            state="complete"
          />
        )
      })}
    </div>
  )
}
