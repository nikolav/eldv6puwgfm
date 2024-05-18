import { z } from "zod";

export const schemaAuthData = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  company: z.optional(z.boolean()),
  is_approved: z.boolean(),
});
