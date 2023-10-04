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
  nome_cartorio: z
    .string({ required_error: "O nome do cartório é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  nome_mae: z
    .string({ required_error: "O nome da mãe é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  nome_pai: z
    .string({ required_error: "O nome do pai é obrigatório" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  data_nascimento: z.date().max(new Date(), {
    message: "Novo demais para trabalhar",
  }),
  nis: z
    .string({ required_error: "O nis é obrigatório" })
    .nonempty("O nis é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  numero_registro_nascimento: z
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
  sexo: z.string({ required_error: "O sexo é obrigatório" }).nonempty("O sexo é obrigatório"),
  etnia: z.string({ required_error: "a etnia é obrigatória" }).nonempty("A etnia é obrigatória"),
  cidade_nascenca: z
    .string({ required_error: "A cidade é obrigatória" })
    .nonempty("A cidade é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  cidade_cartorio: z
    .string({ required_error: "A cidade é obrigatória" })
    .nonempty("A cidade é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  data_emissao_certidao: z.date({ required_error: "A data é obrigatória" }).max(new Date(), {
    message: "Novo demais",
  }),
  uf_cartorio: z.string({ required_error: "A uf é obrigatória" }).nonempty("A uf é obrigatória").trim().min(2).max(2),
});
