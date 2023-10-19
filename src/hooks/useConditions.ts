import { useCallback } from "react";
import { useToast } from "@ui/components/ui/use-toast";

import { Conditions } from "@api/conditions";
import { UpdateConditionsInput } from "@dtos/parentsDTO";

export const useConditions = () => {
  const { toast } = useToast();

  const updateCondition = useCallback((data: UpdateConditionsInput) => {
    try {
      Conditions.updateLivingCondition(data.condicaoVida);
      Conditions.updateHousingCondition(data.condicaoMoradia);

      toast({
        title: "Condições de moradia e vida atualizadas com sucesso.",
      });
    } catch (err) {
      toast({
        title: "Erro ao atualizar as condições.",
      });
    }
  }, []);

  return {
    updateCondition,
  };
};
