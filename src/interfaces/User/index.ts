import { IAddress } from "../Adresses";
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
  address: IAddress;
}

export interface ICreateUser {
  email: string;
  name: string;
  phone: string;
  password: string;
  cep: string;
  country: string;
  state: string;
  number: string;
  city: string;
  neighborhood: string;
  street: string;
  complement?: string;
}
