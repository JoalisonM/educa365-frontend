import * as z from "zod";

export const conditionsFormSchema = z.object({
  condicoes: z.array(
    z.object({
      condicaoMoradia: z.object({
        id: z.string().nullable(),
        tipoCasa: z
          .string()
          .nonempty("O tipo da casa é obrigatório")
          .trim()
          .min(1, { message: "Deve ter mais de 1 caractere" }),
        posseCasa: z.string().nonempty("A posse da casa é obrigatória"),
        banheiroComFossa: z.boolean().default(false),
        aguaCagepa: z.boolean().default(false),
        poco: z.boolean().default(false),
        energia: z.boolean().default(false),
      }),
      condicaoVida: z.object({
        id: z.string(),
        trabalhoDaFamilia: z
          .string()
          .nonempty("O trabalho é obrigatório")
          .trim()
          .min(1, { message: "Deve ter mais de 1 caractere" }),
        rendaMensalFamilia: z.number().nonnegative("Não pode número negativo"),
        quantasPessoasTrabalhamNaCasa: z.number().nonnegative("Não pode número negativo"),
        programaGoverno: z
          .string()
          .nonempty("O programa é obrigatório")
          .trim()
          .min(1, { message: "Deve ter mais de 1 caractere" }),
        problemaEnfrentado: z.object({
          alcool: z.boolean().default(false),
          lazer: z.boolean().default(false),
          saude: z.boolean().default(false),
          fome: z.boolean().default(false),
          drogas: z.boolean().default(false),
          violencia: z.boolean().default(false),
          desemprego: z.boolean().default(false),
        }),
      }),
    }),
  ),
});
