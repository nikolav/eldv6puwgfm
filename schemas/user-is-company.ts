import { z } from "zod";

const LITERAL_IS_COMPANY = true;

export const schemaUserIsCompany = z.object({
  email: z.string().email(),
  id: z.coerce.number(),
  company: z.literal(LITERAL_IS_COMPANY),
});
