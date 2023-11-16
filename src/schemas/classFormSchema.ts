import * as z from "zod";

export const classFormSchema = z.object({
  professor_id: z.string(),
});
