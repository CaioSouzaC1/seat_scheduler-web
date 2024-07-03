import { IApiRoot } from "../Api";

export interface IUserLogin extends IApiRoot {
  data: {
    user: IUser;
    token: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  addressId: string;
  lastLogin: string;
  loginCount: number;
}
