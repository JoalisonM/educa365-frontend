import * as z from "zod";

export const reportFormSchema = z.object({
  relatorio: z.any(),
});
