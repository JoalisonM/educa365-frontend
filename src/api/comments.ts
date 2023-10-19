import { api } from "../lib/axios";
import { UpdateCommentsInput } from "../dtos";

const uriComments = "observacoes";

export const Comments = {
  update(comments: UpdateCommentsInput) {
    const { id, ...newComments } = comments;

    return api.put(`${uriComments}/${id}`, newComments);
  },
};
