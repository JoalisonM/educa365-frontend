import { Comments } from "./Comments";
import { FileViewer } from "./FileViewer";

interface FilePreviewProps {
  doc: string;
  title: string;
}

export const FilePreview = ({ title }: FilePreviewProps) => {
  return (
    <div>
      <header className="w-[750px]">
        <h2 className="font-bold text-xl text-ellipsis overflow-hidden whitespace-nowrap text-zinc-900">{title}</h2>
      </header>

      <div className="flex justify-between w-full py-8">
        <FileViewer doc="" />

        <Comments />
      </div>
    </div>
  );
};
