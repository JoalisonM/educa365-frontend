import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface FileViewerProps {
  fileUrl: string;
}

export const FileViewer = ({ fileUrl }: FileViewerProps) => {
  const docs = [{ uri: fileUrl }];

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
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      style={{ height: 700, width: "100%", maxWidth: 750 }}
      className="rounded-lg border border-zinc-300 shadow-sm"
    />
  );
};
