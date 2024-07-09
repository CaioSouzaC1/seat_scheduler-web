import { IApiRoot } from "../Api";

export interface IGetCompanies extends IApiRoot {
  data: ICompany[];
}

export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
  addressId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCompany {}