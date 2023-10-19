import { api } from "../lib/axios";
import { UpdateParentsInput } from "../dtos";

const uriParent = "responsaveis";

export const Parent = {
  update(parent: UpdateParentsInput) {
    const { id, ...newParent } = parent;

    return api.put(`${uriParent}/${id}`, newParent);
  },
};
