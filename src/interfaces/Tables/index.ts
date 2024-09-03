import {
  IPaginate,
  IPaginateRoot,
  IQueryPaginateRoot,
  ITimestamps,
} from "../Api";

export interface ITableStatus {
  status: "available" | "scheduled" | "busy";
}

export interface ITable extends ITimestamps, ITableStatus {
  id: string;
  number: number;
  observation?: string;
  storeId: string;
  numberOfChairs: number;
  booking: any[];
}

export interface IGetTables extends IPaginateRoot {
  data: IPaginate & {
    data: ITable[];
  };
}

export interface IGetTablesQuery extends IQueryPaginateRoot {
  storeId: string;
}

export interface IUpdateTable {
  id: string;
  observation?: string;
  status: string;
  storeId: string;
  number: number;
  numberOfChairs: number;
}

export interface ICreateTable {
  number: number;
  numberOfChairs: number;
  observation?: string;
  storeId: string;
}

export interface ICreateTablesInBulk {
  numberOfTables: number;
  numberOfChairs: number;
  observation?: string;
  storeId: string;
}