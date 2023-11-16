import {
  useId,
  useState,
  useContext,
  createContext,
  ComponentProps,
  useEffect,
} from "react";

type RootType = {
  setFilesInfo?: (files: any) => void;
}

type RootProps = ComponentProps<"div"> & RootType;

type UploadContextType = {
  id: string;
  files: File[];
  onFilesSelected: (files: File[], multiple: boolean) => void;
};

const UploadContext = createContext({} as UploadContextType);

export const Root = ({ setFilesInfo, ...rest }: RootProps) => {
  const id = useId();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (setFilesInfo) {
      setFilesInfo(files);
    }
  }, [files]);

  const onFilesSelected = (files: File[], multiple: boolean) => {
    if (multiple) {
      setFiles((state) => [...state, ...files]);
    } else {
      setFiles(files);
    }
  };

  return (
    <UploadContext.Provider value={{ id, files, onFilesSelected }}>
      <div {...rest} />
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
