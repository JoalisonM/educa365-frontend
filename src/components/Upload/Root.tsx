import {
  useId,
  useState,
  useContext,
  createContext,
  ComponentProps,
} from 'react'

type RootProps = ComponentProps<'div'>

type UploadContextType = {
  id: string
  files: File[]
  onFilesSelected: (files: File[], multiple: boolean) => void
}

const UploadContext = createContext({} as UploadContextType)

export const Root = (props: RootProps) => {
  const id = useId()
  const [files, setFiles] = useState<File[]>([])

  const onFilesSelected = (files: File[], multiple: boolean) => {
    if (multiple) {
      setFiles((state) => [...state, ...files])
    } else {
      setFiles(files)
    }
  }

  return (
    <UploadContext.Provider value={{ id, files, onFilesSelected }}>
      <div {...props} />
    </UploadContext.Provider>
  )
}

export const useUpload = () => useContext(UploadContext)
