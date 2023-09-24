export interface AddressProps {
  id: string;
  cep: string;
  numero: string;
  rua: string;
  uf: string;
  bairro: string;
  cidade: string;
  referencia: string;
  telefone: string;
}

export interface CreateAddressInput {
  cep: string;
  numero: string;
  rua: string;
  uf: string;
  bairro: string;
  cidade: string;
  referencia: string;
  telefone: string;
}

export interface UpdateAddressInput {
  id: string;
  cep: string;
  numero: string;
  rua: string;
  uf: string;
  bairro: string;
  cidade: string;
  referencia: string;
  telefone: string;
}
