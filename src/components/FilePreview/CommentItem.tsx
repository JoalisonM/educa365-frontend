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
  id: string;
  text: string;
  author: string;
  publishedAt: Date;
  onDeleteComment: (id: string) => void;
}

export const CommentItem = ({ id, text, publishedAt, author, onDeleteComment }: CommentItemProps) => {
  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleDeleteComment = () => {
    onDeleteComment(id);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="rounded-lg p-4 bg-gray-50">
          <header className="flex items-start justify-between">
            <div>
              <strong className="block text-sm leading-relaxed text-zinc-700">
                {author}
              </strong>
              <time
                title={publishedDateFormat}
                dateTime={publishedAt.toISOString()}
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

          <p className="mt-4 text-zinc-800">{text}</p>
        </div>
      </div>
    </div>
  );
};
