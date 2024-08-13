import { IAddress } from "../Adresses";
import { IApiRoot, IPaginate, IPaginateRoot, ITimestamps } from "../Api";
import { IAttachement } from "../Attachement";

export interface ICompany extends ITimestamps {
  name: string;
  cnpj: string;
  addressId: string;
  userId: string;
  address: IAddress;
  attachement: ICompanyAttachement[];
}

export interface ICompanyAttachement extends IAttachement {
  companyId: string;
}

export interface IGetCompanies extends IPaginateRoot {
  data: IPaginate & {
    data: ICompany[];
  };
}

export interface ICreateCompany {
  name: string;
  cnpj: string;
  cep: string;
  country: string;
  state: string;
  number: string;
  city: string;
  neighborhood: string;
  street: string;
  complement?: string;
  image?: any;
}

export interface ICreatedCompany extends IApiRoot {
  data: {
    name: string;
    phone: string;
    companyId: string;
    description: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    addressId: string;
  };
}

export interface IUpdateCompany extends ICreateCompany {
  id: string;
}