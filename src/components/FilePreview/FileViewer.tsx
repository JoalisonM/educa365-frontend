import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import file from "../../assets/custom.pdf";

const docs = [{ uri: file }];

interface FileViewerProps {
  doc: string;
}

export const FileViewer = ({ doc }: FileViewerProps) => {
  return (
    <DocViewer
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
          retainURLParams: false,
        },
      }}
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      style={{ height: 700, width: "100%", maxWidth: 750 }}
      className="rounded-lg border border-zinc-300 shadow-sm"
    />
  );
};
