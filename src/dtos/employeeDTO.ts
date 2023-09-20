import {
  AddressProps,
  CreateAddressInput,
  UpdateAddressInput,
} from './addressDTO'

export interface EmployeeProps {
  id: number
  nome: string
  email: string
  nascimento: string
  sexo: boolean
  rg: string
  cpf: string
  cargo: string
  endereco: AddressProps
}

export interface CreateEmployeeInput {
  nome: string
  email: string
  nascimento: string
  sexo: boolean
  rg: string
  cpf: string
  cargo: string
  endereco: CreateAddressInput
}

export interface UpdateEmployeeInput {
  id: number
  nome: string
  email: string
  nascimento: string
  sexo: boolean
  rg: string
  cpf: string
  cargo: string
  endereco: CreateAddressInput
}
