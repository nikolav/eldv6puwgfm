import { z } from "zod";
import { DOC_ID_USER_DEFAULT } from "@/config";

export const schemaUsersIsDefault = z.coerce
  .number()
  .refine((num) => num == DOC_ID_USER_DEFAULT);
