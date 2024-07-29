import {
  IPaginate,
  IPaginateRoot,
  IQueryPaginateRoot,
  ITimestamps,
} from "../Api";

export interface ITable extends ITimestamps {
  id: string;
  number: string;
  observation?: string;
  status: string;
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
