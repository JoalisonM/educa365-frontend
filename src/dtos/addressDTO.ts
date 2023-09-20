export interface AddressProps {
  id: number
  cep: string
  numero: number
  rua: string
  uf: string
  bairro: string
  cidade: string
  referencia: string
  telefone: string
}

export interface CreateAddressInput {
  cep: string
  numero: number
  rua: string
  uf: string
  bairro: string
  cidade: string
  referencia: string
  telefone: string
}

export interface UpdateAddressInput {
  id: number
  cep: string
  numero: number
  rua: string
  uf: string
  bairro: string
  cidade: string
  referencia: string
  telefone: string
}
