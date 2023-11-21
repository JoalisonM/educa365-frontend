import * as z from "zod";

export const commentFormSchema = z.object({
  texto: z.string().min(1, { message: "Deve ter mais de 1 caractere" }).trim(),
});
