import { IApiRoot, IPaginate, IPaginateRoot } from "../Api"
import { IAttachement } from "../Attachement"

export interface ICreateStore {
  name: string
  phone: string
  description: string
  companyId: string
  image?: any
}

export interface IStoreAttachement extends IAttachement {
  storeId: string;
}

export interface IStore {
  id: string
  name: string
  phone: string
  description: string
  companyId: string
  image?: any
  createdAt: string;
  updatedAt: string;
  addressId: string;
  attachement: IStoreAttachement[];
}

export interface ICreatedStore extends IApiRoot {
  data: {
    id: string
    name: string
    phone: string
    description: string
    companyId: string
    image?: any
    createdAt: string;
    updatedAt: string;
    addressId: string;
  }
}


export interface IGetStores extends IPaginateRoot {
  data: IPaginate & {
    data: IStore[];
  }
}
