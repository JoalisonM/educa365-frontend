import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface FileViewerProps {
  fileUrl: string;
  title: string;
}

export const FileViewer = ({ fileUrl, title }: FileViewerProps) => {
  const docs = [{
    uri: fileUrl,
    fileName: title,
  }];
  const tokenStorage = localStorage.getItem("access-token");
  const token = `Bearer ${tokenStorage}`;
  const headers = {
    "Authorization": token,
    "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  return (
    <DocViewer
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
          retainURLParams: false,
        },
        pdfVerticalScrollByDefault: true,
      }}
      language="pt"
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      style={{ height: 700, width: "100%", maxWidth: 750 }}
      className="rounded-lg border border-zinc-300 shadow-sm"
    />
  );
};
