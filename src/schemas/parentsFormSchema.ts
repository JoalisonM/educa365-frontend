import * as z from "zod";

export const parentFormSchema = z.object({
  responsaveis: z.array(z.object({
    nome: z
    .string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
    parentesco: z
    .string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O parentesco não pode conter números nem caracteres especiais",
    })
    .nonempty("O parentesco é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
    escolaridade: z
      .string()
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
        message: "O parentesco não pode conter números nem caracteres especiais",
      })
      .nonempty("O parentesco é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    apelido: z
      .string()
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
        message: "O parentesco não pode conter números nem caracteres especiais",
      })
      .nonempty("O parentesco é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    profissao: z
      .string()
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
        message: "A profissão não pode conter números nem caracteres especiais",
      })
      .nonempty("A profissão é obrigatória")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    nome_mae: z
      .string()
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
        message: "O nome não pode conter números nem caracteres especiais",
      })
      .nonempty("O nome é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    data_nascimento: z.date().max(new Date("2010-01-01"), {
      message: "Novo demais para ser pai",
    }),
    bolsa_familia: z
      .object({
        nis: z
          .string(),
      }).optional()
      .optional(),
    emissor_rg: z
      .string()
      .nonempty("O emissor do rg é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    rg: z
      .string()
      .regex(/^\d{1}\.\d{3}\.\d{3}$/, { message: "RG inválido" })
      .nonempty("O rg é obrigatório"),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" })
      .nonempty("O cpf é obrigatório"),
    sexo: z.string().nonempty("O sexo é obrigatório"),
    data_expedicao_rg: z.date().max(new Date(), {
      message: "Novo demais",
    }),
    data_expedicao_cpf: z.date().max(new Date(), {
      message: "Novo demais",
    }),
    uf_rg: z.string().nonempty("A UF do RG é obrigatório").trim().min(2).max(2),
    familiares_casa: z.number().nonnegative("Não pode número negativo"),
  })),
});
