import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { DotsThreeVertical, File } from "@phosphor-icons/react";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { Button } from "@components/Button";
import { Tooltip } from "@components/Tooltip";
import { EmployeeProps } from "@dtos/employeeDTO";
import { FilePreview } from "@components/FilePreview";
import { DropdownMenu } from "@components/DropdownMenu";
import { ReportCommentsProps } from "@dtos/reportCommentsDTO";

export interface ReportDataProps {
  id: string;
  tipo: string;
  titulo: string;
  fileUrl: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
  comentarios: Array<ReportCommentsProps>;
}

interface CardFileProps {
  report: ReportDataProps;
}

export const CardFile = ({ report }: CardFileProps) => {
  const { titulo, funcionario, fileUrl, comentarios, id } = report;

  return (
    <Dialog>
      <Card className="shadow-md hover:bg-emerald-25">
        <CardHeader className="pb-0 flex flex-row items-center justify-between">
          <CardTitle className="text-base text-ellipsis overflow-hidden whitespace-nowrap text-zinc-700">
            {titulo}
          </CardTitle>

          <DropdownMenu id={id} fileUrl={fileUrl}>
            <Button type="button" variant="ghost">
              <Tooltip content="Mais opções">
                <DotsThreeVertical weight="bold" className="h-5 w-5" />
              </Tooltip>
            </Button>
          </DropdownMenu>
        </CardHeader>

        <DialogTrigger asChild>
          <CardContent className="flex justify-center cursor-pointer">
            <File weight="thin" className="h-32 w-32 text-zinc-200 leading-none" />
          </CardContent>
        </DialogTrigger>
      </Card>

      <DialogContent>
        <FilePreview
          reportId={id}
          fileUrl={fileUrl}
          title={titulo}
          comments={comentarios}
          author={funcionario.nome}
        />
      </DialogContent>
    </Dialog>
  );
};
