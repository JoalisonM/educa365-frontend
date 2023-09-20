import { User } from '@phosphor-icons/react'

import { useUpload } from './Root'
import { useMemo } from 'react'

export const ImagePreview = () => {
  const { files } = useUpload()

  const previewURL = useMemo(() => {
    if (files.length === 0) {
      return null
    }

    return URL.createObjectURL(files[0])
  }, [files])

  if (previewURL === null) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <User className="h-8 w-8 text-blueLagoon" />
      </div>
    )
  } else {
    return (
      <img
        src={previewURL}
        alt=""
        className="h-16 w-16 rounded-full object-cover"
      />
    )
  }
}
