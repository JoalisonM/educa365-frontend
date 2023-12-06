import { api } from "../lib/axios";
import { UpdateParentsInput } from "../dtos";

const uriParent = "responsaveis";

export const Parent = {
  get(id: string) {
    return api.get(`${uriParent}/${id}`);
  },

  getAll() {
    return api.get(uriParent);
  },

  update(parent: UpdateParentsInput) {
    const { id, ...newParent } = parent;

    return api.put(`${uriParent}/${id}`, newParent);
  },
};
