import * as z from "zod";

export const conditionsFormSchema = z.object({
  housing: z.object({
    tipo_casa: z.string().nonempty("O tipo da casa é obrigatório").trim().min(1, { message: "Deve ter mais de 1 caractere" }),
    posse_casa: z.string().nonempty("A posse da casa é obrigatória"),
    banheiro_com_fossa: z.boolean().default(false),
    agua_cagepa: z.boolean().default(false),
    poco: z.boolean().default(false),
    energia: z.boolean().default(false),
  }),
  living: z.object({
    trabalho_familia: z.string().nonempty("O trabalho é obrigatório").trim().min(1, { message: "Deve ter mais de 1 caractere" }),
    renda_mensal_familia: z.number().nonnegative("Não pode número negativo"),
    quantas_pessoas_trabalham_casa: z.number().nonnegative("Não pode número negativo"),
    programa_governo: z.string().nonempty("O programa é obrigatório").trim().min(1, { message: "Deve ter mais de 1 caractere" }),
    problema_enfrentado: z.object({
      alcool: z.boolean().default(false),
      lazer: z.boolean().default(false),
      saude: z.boolean().default(false),
      fome: z.boolean().default(false),
      drogas: z.boolean().default(false),
      violencia: z.boolean().default(false),
      desemprego: z.boolean().default(false),
    }),
  }),
});
