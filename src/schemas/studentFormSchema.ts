import * as z from "zod";

export const studentFormSchema = z.object({
  nome: z
    .string({ required_error: "O nome é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  nomeCartorio: z
    .string({ required_error: "O nome do cartório é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  nomeMae: z
    .string({ required_error: "O nome da mãe é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  nomePai: z
    .string({ required_error: "O nome do pai é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  dataNascimento: z.date().max(new Date(), {
    message: "Novo demais para trabalhar",
  }),
  nis: z
    .string({ required_error: "O nis é obrigatório" })
    .nonempty("O nis é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  numeroRegistroNascimento: z
    .string({ required_error: "O número é obrigatório" })
    .nonempty("O número do registro é obrigatório"),
  rg: z
    .string({ required_error: "O rg é obrigatório" })
    .regex(/^\d{1}\.\d{3}\.\d{3}$/, { message: "RG inválido" })
    .nonempty("O rg é obrigatório"),
  cpf: z
    .string({ required_error: "O cpf é obrigatório" })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" })
    .nonempty("O cpf é obrigatório"),
  sus: z.string({ required_error: "O sus é obrigatório" }).nonempty("O sus é obrigatório"),
  sexo: z
    .enum(["0", "1", "true", "false"])
    .catch("false")
    .transform((value) => value === "true" || value === "1"),
  etnia: z.string({ required_error: "a etnia é obrigatória" }).nonempty("A etnia é obrigatória"),
  cidadeCartorio: z
    .string({ required_error: "A cidade é obrigatória" })
    .nonempty("A cidade é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  dataEmissaoCertidao: z.date({ required_error: "A data é obrigatória" }).max(new Date(), {
    message: "Novo demais",
  }),
  ufCartorio: z
    .string({ required_error: "A uf é obrigatória" })
    .nonempty("A uf é obrigatória")
    .trim()
    .min(2)
    .max(2),
});
