import * as z from "zod";

export const employeeFormSchema = z.object({
  nome: z
    .string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, {
      message: "O nome não pode conter números nem caracteres especiais",
    })
    .nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.date().max(new Date("2005-01-01"), {
    message: "Novo demais para trabalhar",
  }),
  rg: z
    .string()
    .regex(/^\d{1}\.\d{3}\.\d{3}$/, { message: "RG inválido" })
    .nonempty("O rg é obrigatório"),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" })
    .nonempty("O cpf é obrigatório"),
  cargo: z
    .string()
    .nonempty("O cargo é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  sexo: z
    .string()
    .nonempty("O sexo é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  endereco: z.object({
    cep: z
      .string()
      .regex(/^\d{5}-\d{3}$/, { message: "CEP inválido" })
      .nonempty("O UF é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    uf: z
      .string()
      .nonempty("A uf é obrigatória")
      .trim()
      .min(2, { message: "Deve ter 2 caracteres" })
      .max(2, { message: "Deve ter apenas 2 caracteres" }),
    cidade: z
      .string()
      .nonempty("A cidade é obrigatória")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    rua: z
      .string()
      .nonempty("A rua é obrigatória")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    bairro: z
      .string()
      .nonempty("O bairro é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    numero: z
      .string()
      .regex(/^\d+$/, { message: "Número inválido" })
      .nonempty("O número é obrigatória")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    referencia: z
      .string()
      .nonempty("O referência é obrigatória")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere" }),
    telefone: z
      .string()
      .regex(/^\d{11}$/, { message: "Número de telefone inválido" })
      .nonempty("O telefone é obrigatório")
      .trim()
      .min(11, { message: "Deve ter mais de 1 caractere" }),
  }),
});
