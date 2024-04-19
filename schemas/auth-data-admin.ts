import { z } from "zod";
import { USER_ID_ADMIN } from "@/config";

export const schemaAuthDataAdmin = z.object({
  email: z.string().email(),
  id: z.literal(USER_ID_ADMIN),
});
