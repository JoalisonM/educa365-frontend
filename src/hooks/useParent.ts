import { useCallback, useState } from "react";
import { useToast } from "@ui/components/ui/use-toast";

import { Parent } from "@api/parent";
import { ParentsProps, UpdateParentsInput } from "@dtos/parentsDTO";

export const useParent = () => {
  const { toast } = useToast();
  const [parents, setParents] = useState();

  const fetchParents = useCallback(async () => {
    const response = await Parent.getAll();

    setParents(response.data);

    return response;
  }, []);

  const getParent = useCallback(async (id: string): Promise<ParentsProps> => {
    const response = await Parent.get(id);

    return response.data;
  }, []);

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
    parents,
    getParent,
    fetchParents,
    updateParent,
  };
};
