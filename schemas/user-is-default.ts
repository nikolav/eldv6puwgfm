import { z } from "zod";
import { USER_ID_DEFAULT } from "@/config";

export const schemaUsersIsDefault = z.coerce
  .number()
  .refine((num) => num == USER_ID_DEFAULT);
