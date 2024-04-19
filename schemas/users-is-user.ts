import { z } from "zod";
import { USER_ID_ADMIN, USER_ID_DEFAULT } from "@/config";

const userIdReserved = [USER_ID_ADMIN, USER_ID_DEFAULT];

export const schemaUsersNotReserved = z.coerce
  .number()
  .refine((num) => !userIdReserved.includes(num));
