import * as z from "zod";

export const addressFormSchema = z.object({
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
});
