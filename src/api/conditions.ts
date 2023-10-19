import { api } from "../lib/axios";
import { UpdateHousingConditionsInput, UpdateLivingConditionsInput } from "../dtos";

const uriLivingCondition = "condicaoVida";
const uriHousingCondition = "condicaoMoradia";

export const Conditions = {
  updateHousingCondition(condition: UpdateHousingConditionsInput) {
    const { id, ...newCondition } = condition;

    return api.put(`${uriHousingCondition}/${id}`, newCondition);
  },

  updateLivingCondition(condition: UpdateLivingConditionsInput) {
    const { id, ...newCondition } = condition;

    return api.put(`${uriLivingCondition}/${id}`, newCondition);
  },
};
