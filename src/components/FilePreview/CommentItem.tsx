import { Button } from "@components/Button";
import { Trash } from "@phosphor-icons/react";

interface CommentProps {
  id: string;
  text: string;
}

interface CommentItemProps {
  content: CommentProps;
  onDeleteComment: (id: string) => void;
}

export const CommentItem = ({ content, onDeleteComment }: CommentItemProps) => {
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
                title="25 de Julho às 09:31h"
                dateTime="2022-07-25 09:31:30"
                className="block text-xs leading-relaxed text-zinc-500"
              >
                Cerca de 1hr atrás
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
