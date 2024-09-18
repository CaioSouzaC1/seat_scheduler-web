import { z } from "zod";
import {
  IPaginate,
  IPaginateRoot,
  IQueryPaginateRoot,
  ITimestamps,
} from "../Api";
import { storeMenuItemSchema } from "@/schemas/menu-items";

export interface IMenuItem extends ITimestamps {
  name: string;
  price: number;
  description: string;
  storeId: string;
}

export interface IGetMenuItems extends IPaginateRoot {
  data: IPaginate & {
    data: IMenuItem[];
  };
}

export interface IGetMenuItemProps extends IQueryPaginateRoot {
  storeId: string;
}

export type StoreMenuItemSchema = z.infer<typeof storeMenuItemSchema>;
