import { requiredErrorMessage } from "@/lib/utils";
import { z } from "zod";

export const editTableSchema = z.object({
  observation: z.string().optional(),
  status: z.string({
    required_error: requiredErrorMessage,
  }),
  numberOfChairs: z
    .number({
      required_error: requiredErrorMessage,
    })
    .max(16, "Número máximo de 16 cadeiras"),
});

export const newTableSchema = z.object({
  number: z.number({
    required_error: requiredErrorMessage,
  }),
  numberOfChairs: z
    .number({
      required_error: requiredErrorMessage,
    })
    .max(16, "Número máximo de 16 cadeiras"),
  observation: z.string().optional(),
});

export const newTablesInBulkSchema = z.object({
  numberOfChairs: z
    .number({
      required_error: requiredErrorMessage,
    })
    .max(16, "Número máximo de 16 cadeiras"),
  observation: z.string().optional(),
  numberOfTables: z
    .number({
      required_error: requiredErrorMessage,
    })
    .min(2, "Número mínimo de 2 mesas")
    .max(299, "Número máximo de 299 mesas"),
});

export const deleteTablesInBulkSchema = z.object({
  tables: z.array(z.string()),
});