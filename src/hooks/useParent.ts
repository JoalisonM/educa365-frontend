import { useCallback } from "react";
import { useToast } from "@ui/components/ui/use-toast";

import { Parent } from "@api/parent";
import { UpdateParentsInput } from "@dtos/parentsDTO";

export const useParent = () => {
  const { toast } = useToast();

  const updateParent = useCallback(async (data: UpdateParentsInput) => {
    try {
      const response = await Parent.update(data);

      if (response.data) {
        toast({
          title: "Responsáveis atualizados com sucesso.",
        });
      }

      return response;
    } catch (err) {
      toast({
        title: "Erro ao atualizar responsáveis.",
      });
    }
  }, []);

  return {
    updateParent,
  };
};
