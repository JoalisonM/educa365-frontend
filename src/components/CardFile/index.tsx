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
import { FilePreview } from "@components/FilePreview";
import { DropdownMenu } from "@components/DropdownMenu";

interface CardFileProps {
  title: string;
  imgUrl: string;
}

export const CardFile = ({ title, imgUrl }: CardFileProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-base text-ellipsis overflow-hidden whitespace-nowrap text-zinc-700">
              {title}
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
              className="rounded-md"
              src={imgUrl}
            />
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <FilePreview title={title} doc="" />
      </DialogContent>
    </Dialog>
  );
};
