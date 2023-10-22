import axios from "axios";

export interface CepProps {
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

export const ViaCep = {
  get(cep: string) {
    return axios.get<CepProps>(`https://viacep.com.br/ws/${cep}/json/`);
  },
};
