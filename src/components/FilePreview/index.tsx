import { Comments } from "./Comments";
// import { FileViewer } from "./FileViewer";

interface FilePreviewProps {
  title: string;
  author: string;
  fileUrl: string;
}

export const FilePreview = ({ title, author, fileUrl }: FilePreviewProps) => {
  return (
    <div>
      <header className="w-[750px]">
        <h2 className="font-bold text-xl text-ellipsis overflow-hidden whitespace-nowrap text-zinc-900">{title}</h2>
        <span className="leading-relaxed text-sm text-zinc-500">{author}</span>
      </header>

      <div className="flex justify-between w-full py-8">
        <iframe
          src={fileUrl}
          className="rounded-lg border border-zinc-300 shadow-sm h-[700px] w-full max-w-[750px]"
        ></iframe>
        {/* <FileViewer fileUrl={fileUrl} title={title} /> */}

        <Comments />
      </div>
    </div>
  );
};
