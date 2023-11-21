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
import { DotsThreeVertical } from "@phosphor-icons/react";

import { Button } from "@components/Button";
import { Tooltip } from "@components/Tooltip";
import { EmployeeProps } from "@dtos/employeeDTO";
import { FilePreview } from "@components/FilePreview";
import { DropdownMenu } from "@components/DropdownMenu";

export interface ReportDataProps {
  id: string;
  tipo: string;
  titulo: string;
  fileUrl: string;
  dataCriacao: string;
  funcionario: EmployeeProps;
}

interface CardFileProps {
  report: ReportDataProps;
  imgUrl: string;
}

export const CardFile = ({ report, imgUrl }: CardFileProps) => {
  const { titulo, funcionario, fileUrl } = report;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-base text-ellipsis overflow-hidden whitespace-nowrap text-zinc-700">
              {titulo}
            </CardTitle>

            <DropdownMenu id="">
              <Button type="button" variant="ghost">
                <Tooltip content="Mais opções">
                  <DotsThreeVertical weight="bold" className="h-5 w-5" />
                </Tooltip>
              </Button>
            </DropdownMenu>
          </CardHeader>

          <CardContent>
            <img
              alt=""
              src={imgUrl}
              className="rounded-md"
            />
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <FilePreview
          fileUrl={fileUrl}
          title={titulo}
          author={funcionario.nome}
        />
      </DialogContent>
    </Dialog>
  );
};
