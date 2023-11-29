import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@ui/components/ui/form";

import { Button } from "@components/Button";
import { CommentItem } from "./CommentItem";
import * as Textarea from "@components/Textarea";
import { commentFormSchema } from "@schemas/commentFormSchema";

export type CommentFormInputs = z.infer<typeof commentFormSchema>;

interface CommentProps {
  id: number;
  text: string;
  publishedAt: Date;
}

export const Comments = () => {
  const [commentId, setCommentId] = useState(2);
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState<CommentProps[]>([{
    id: 1,
    text: "Ótimo plano pedagógico, parabéns!",
    publishedAt: new Date("2023-11-18 16:10:00"),
  }]);

  const isNewCommentEmpty = newCommentText.length === 0;

  const form = useForm<CommentFormInputs>({
    resolver: zodResolver(commentFormSchema),
  });
  const { reset } = form;

  const handleNewCommentChange = (value: string) => {
    setNewCommentText(value);
  };

  const deleteComment = (commentId: number) => {
    const commentsWithoutDeletedOne = comments.filter(comment => comment.id !== commentId);

    setComments(commentsWithoutDeletedOne);
  };

  const handleCreateNewComment = (data: CommentFormInputs) => {
    setComments([{
      id: commentId,
      text: newCommentText,
      publishedAt: new Date(),
    }, ...comments]);

    setNewCommentText("");
    setCommentId(commentId + 1);
    reset();
  };

  return (
    <div className="flex flex-col gap-8 px-2 max-h-[700px]">
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleCreateNewComment)}>
          <h3 className="leading-relaxed font-medium text-lg text-zinc-900">Deixe seu feedback</h3>
          <FormField
            name="texto"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea.Root>
                    <Textarea.Control
                      placeholder="Deixe um comentário"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event);
                        handleNewCommentChange(event.target.value);
                      }}
                    />
                </Textarea.Root>
                </FormControl>
              </FormItem>
            )}
          />
          <footer>
            <Button
              type="submit"
              disabled={isNewCommentEmpty}
            >
              Publicar
            </Button>
          </footer>
        </form>
      </Form>

      <div className="flex flex-col gap-4 overflow-y-auto">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};
