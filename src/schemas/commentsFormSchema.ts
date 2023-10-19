import * as z from "zod";

export const commentsFormSchema = z.object({
  alimentacao: z
    .string({ required_error: "A alimentação é obrigatória" })
    .nonempty("A alimentação é obrigatória")
    .trim(),
  medicacao: z
    .string({ required_error: "A medicação é obrigatória" })
    .nonempty("A medicação é obrigatória")
    .trim(),
  produtoHigienePessoal: z
    .string({ required_error: "O produto é obrigatório" })
    .nonempty("O produto de higiene é obrigatório")
    .trim(),
  tipoSangue: z
    .string({ required_error: "O tipo de sangue é obrigatório" })
    .nonempty("O tipo de sangue é obrigatório")
    .trim(),
  medicacaoDeficiencia: z
    .string({ required_error: "A medicação é obrigatória" })
    .nonempty("A medicação é obrigatória")
    .trim(),
  laudoMedico: z
    .string({ required_error: "O laudo é obrigatório" })
    .nonempty("O laudo médico é obrigatório")
    .trim(),
  deficiencia: z.object({
    intelectual: z.boolean().default(false),
    visual: z.boolean().default(false),
    auditiva: z.boolean().default(false),
    fisica: z.boolean().default(false),
    multipla: z.boolean().default(false),
  }),
});
