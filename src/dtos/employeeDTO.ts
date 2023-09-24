import { AddressProps, CreateAddressInput } from './addressDTO'

export interface EmployeeProps {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  cargo: string;
  senha?: string;
  endereco: AddressProps
}

export interface CreateEmployeeInput {
  nome: string;
  email: string;
  dataNascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  cargo: string;
  senha?: string;
  endereco: CreateAddressInput;
}

export interface UpdateEmployeeInput {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  cargo: string;
  senha?: string;
  endereco: CreateAddressInput;
}
