import * as z from "zod";

export const commentsFormSchema = z.object({
  alimentacao: z.string({ required_error: "A alimentação é obrigatória" }).nonempty("A alimentação é obrigatória").trim(),
  alergia: z.string({ required_error: "A alergia é obrigatória" }).nonempty("A alergia é obrigatória").trim(),
  medicacao: z.string({ required_error: "A medicação é obrigatória" }).nonempty("A medicação é obrigatória").trim(),
  produto_higiene_corporal: z
    .string({ required_error: "O produto é obrigatório" })
    .nonempty("O produto de higiene é obrigatório")
    .trim(),
  tipo_sangue: z.string({ required_error: "O tipo de sangue é obrigatório" }).nonempty("O tipo de sangue é obrigatório").trim(),
  medicacao_deficiencia: z
    .string({ required_error: "A medicação é obrigatória" })
    .nonempty("A medicação é obrigatória")
    .trim(),
  laudo_medico: z.string({ required_error: "O laudo é obrigatório" }).nonempty("O laudo médico é obrigatório").trim(),
  deficiencia: z.object({
    intelectual: z.boolean().default(false),
    visual: z.boolean().default(false),
    auditiva: z.boolean().default(false),
    fisica: z.boolean().default(false),
    multipla: z.boolean().default(false),
  }),
});
