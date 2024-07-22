export interface IAddress {
  id: string;
  cep: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
  createdAt: string;
  updatedAt: string;
}
