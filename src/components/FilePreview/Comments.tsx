import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@ui/components/ui/form";

import { CommentItem } from "./CommentItem";
import { Button } from "@components/Button";
import * as Textarea from "@components/Textarea";
import { useReportComments } from "@hooks/reportComments";
import { commentFormSchema } from "@schemas/commentFormSchema";
import { ReportCommentsProps } from "@dtos/reportCommentsDTO";
import { useAuth } from "@contexts/auth";

export type CommentFormInputs = z.infer<typeof commentFormSchema>;

type CommentProps = {
  reportId: string;
  comments: Array<ReportCommentsProps>;
}

export const Comments = ({ comments, reportId }: CommentProps) => {
  const { user } = useAuth();
  const { createComment, deleteComment } = useReportComments();
  const [newCommentText, setNewCommentText] = useState("");

  const isNewCommentEmpty = newCommentText.length === 0;

  const form = useForm<CommentFormInputs>({
    resolver: zodResolver(commentFormSchema),
  });
  const { reset } = form;

  const handleNewCommentChange = (value: string) => {
    setNewCommentText(value);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  };

  const handleCreateNewComment = (data: CommentFormInputs) => {
    if (user) {
      createComment({
        texto: data.texto,
        funcionario_id: user?.id,
        relatorio_id: reportId,
      });
    }

    reset();
    setNewCommentText("");
  };

  console.log("comments: ", comments);

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
            id={comment.id}
            text={comment.texto}
            author={comment.funcionario.nome}
            onDeleteComment={handleDeleteComment}
            publishedAt={new Date(comment.dataCriacao)}
          />
        ))}
      </div>
    </div>
  );
};
