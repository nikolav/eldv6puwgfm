import { z } from "zod";

export const schemaAuthData = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  approved: z.boolean(),
  admin: z.boolean(),
  archived: z.boolean(),
  email_verified: z.boolean(),
});
