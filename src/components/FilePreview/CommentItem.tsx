import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Button } from "@components/Button";
import { Trash } from "@phosphor-icons/react";

interface CommentProps {
  id: number;
  text: string;
  publishedAt: Date;
}

interface CommentItemProps {
  content: CommentProps;
  onDeleteComment: (id: number) => void;
}

export const CommentItem = ({ content, onDeleteComment }: CommentItemProps) => {
  const publishedDateFormat = format(content.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(content.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleDeleteComment = () => {
    onDeleteComment(content.id);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="rounded-lg p-4 bg-gray-50">
          <header className="flex items-start justify-between">
            <div>
              <strong className="block text-sm leading-relaxed text-zinc-700">
                Joalison Matheus
              </strong>
              <time
                title={publishedDateFormat}
                dateTime={content.publishedAt.toISOString()}
                className="block text-xs leading-relaxed text-zinc-500"
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <Button
              variant="none"
              title="Deletar comentário"
              onClick={handleDeleteComment}
            >
              <Trash className="h-5 w-5" />
            </Button>
          </header>

          <p className="mt-4 text-zinc-800">{content.text}</p>
        </div>
      </div>
    </div>
  );
};
