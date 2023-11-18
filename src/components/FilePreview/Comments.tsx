import { useState, useId } from "react";

import { Button } from "@components/Button";
import { CommentItem } from "./CommentItem";
import * as Textarea from "@components/Textarea";

interface CommentProps {
  id: string;
  text: string;
}

export const Comments = () => {
  const id = useId();
  const [comments, setComments] = useState<CommentProps[]>([{
    id: id, text: "Ótimo plano pedagógico, parabéns!",
  }]);
  const [newCommentText, setNewCommentText] = useState("");

  const isNewCommentEmpty = newCommentText.length === 0;

  const handleNewCommentChange = (value: string) => {
    setNewCommentText(value);
  };

  const deleteComment = (commentId: string) => {
    const commentsWithoutDeletedOne = comments.filter(comment => comment.id !== commentId);

    setComments(commentsWithoutDeletedOne);
  };

  const handleCreateNewComment = () => {
    setComments([...comments, {
      id: id,
      text: newCommentText,
    }]);

    setNewCommentText("");
  };

  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-col gap-4">
        <h3 className="leading-relaxed font-medium text-lg text-zinc-900">Deixe seu feedback</h3>
        <Textarea.Root>
          <Textarea.Control
            value={newCommentText}
            placeholder="Deixe um comentário"
            onChange={(event) => handleNewCommentChange(event.target.value)}
          />
        </Textarea.Root>
        <footer>
          <Button
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Publicar
          </Button>
        </footer>
      </form>

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          content={comment}
          onDeleteComment={deleteComment}
        />
      ))}
    </div>
  );
};
