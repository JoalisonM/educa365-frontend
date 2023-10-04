import * as z from "zod";

export const housingFormSchema = z.object({
  tipo_casa: z.string().nonempty("O tipo da casa é obrigatório").trim().min(1, { message: "Deve ter mais de 1 caractere" }),
  posse_casa: z.string().nonempty("A posse da casa é obrigatória"),
  banheiro_com_fossa: z.boolean().default(false),
  agua_cagepa: z.boolean().default(false),
  poco: z.boolean().default(false),
  energia: z.boolean().default(false),
});
