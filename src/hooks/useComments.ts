import { useCallback } from "react";
import { useToast } from "@ui/components/ui/use-toast";

import { Comments } from "@api/comments";
import { UpdateCommentsInput } from "@dtos/studentDTO";

export const useComments = () => {
  const { toast } = useToast();

  const updateComments = useCallback(async (data: UpdateCommentsInput) => {
    try {
      const response = await Comments.update(data);

      if (response.data) {
        toast({
          title: "Observações específicas atualizadas com sucesso.",
        });
      }

      return response;
    } catch (err) {
      toast({
        title: "Erro ao atualizar observações específicas.",
      });
    }
  }, []);

  return {
    updateComments,
  };
};
