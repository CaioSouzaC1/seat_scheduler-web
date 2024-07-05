export interface IViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IUseViaCepReturn {
  data: IViaCepAddress | null;
  error: string | null;
  loading: boolean;
}
