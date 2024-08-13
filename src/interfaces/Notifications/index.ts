import { IPaginate, IPaginateRoot, ITimestamps } from "../Api";

export interface INotification extends ITimestamps {
  userId: string;
  title: string;
  type: string;
  message: string;
  data: any;
  read: boolean;
}

export interface IGetNotifications extends IPaginateRoot {
  data: IPaginate & {
    data: INotification[];
  };
}
