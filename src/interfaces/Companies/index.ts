import { IAddress } from "../Adresses";
import { IApiRoot, IPaginate, IPaginateRoot } from "../Api";
import { IAttachement } from "../Attachement";

export interface IGetCompanies extends IPaginateRoot {
  data: IPaginate & {
    data: ICompany[];
  };
}

export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
  addressId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  address: IAddress;
  attachement: ICompanyAttachement[];
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

export interface ICompanyAttachement extends IAttachement {
  companyId: string;
}
