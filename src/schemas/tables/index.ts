import { requiredErrorMessage } from "@/lib/utils";
import { z } from "zod";

export const editTableSchema = z.object({
  id: z.string({
    required_error: requiredErrorMessage,
  }),
  number: z.string({
    required_error: requiredErrorMessage,
  }),
  observation: z.string().optional(),
  status: z.string({
    required_error: requiredErrorMessage,
  }),
  numberOfChairs: z.number({
    required_error: requiredErrorMessage,
  }),
  storeId: z.string({
    required_error: requiredErrorMessage,
  }),
});
