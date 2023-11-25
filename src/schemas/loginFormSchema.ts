import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string({ required_error: "O e-mail é obrigatório" })
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  senha: z.string({ required_error: "A senha é obrigatória" })
    .trim()
    .min(5, "A senha precisa de no mínimo 5 caracteres"),
});
