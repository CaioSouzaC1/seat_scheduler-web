import { IApiRoot, IPaginate, IPaginateRoot } from "../Api";
import { IBook } from "../Books";
import { IUser } from "../User";

export interface IGetDashBoardCards extends IApiRoot {
  data: {
    loginCount: number;
    totalStores: number;
    totalTables: number;
    totalBookings: number;
  };
}

export interface IRecentBooking extends IBook {
  user: IUser;
}
export interface IGetDashboardRecentBookings extends IPaginateRoot {
  data: IPaginate & {
    data: IRecentBooking[];
  };
}
