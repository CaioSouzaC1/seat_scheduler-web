import { z } from "zod";

export const deleteMenuItemsInBulkSchema = z.object({
  menuItems: z.array(z.string()),
});

export const storeMenuItemSchema = z.object({
  name: z.string().min(1, "Insira um nome válido"),
  price: z.number().min(1, "Insira um preço válido"),
  description: z.string().optional(),
  storeId: z.string(),
});
