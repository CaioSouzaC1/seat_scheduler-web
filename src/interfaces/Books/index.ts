import { IPaginate, IPaginateRoot } from "../Api";
import { ITable } from "../Tables";

export interface IBook {
  id: string
  status: string
  observation: string
  storeId: string
  reservedDate: string
  tableId: string
  userId: string
  table: ITable
}

export interface IGetBooks extends IPaginateRoot {
  data: IPaginate & {
    data: IBook[];
  };

}
