import { AddressProps, CreateAddressInput } from "./addressDTO";
import { CreateParentsInputProps, ParentsProps } from "./parentsDTO";

export interface StudentProps {
  id: string;
  nome: string;
  sexo: boolean;
  dataNascimento: string;
  rg: string;
  cpf: string;
  nis: string;
  sus: string;
  nomeCartorio: string;
  cidadeCartorio: string;
  numeroRegistroNascimento: string;
  dataEmissaoCertidao: string;
  ufCartorio: string;
  etnia: string;
  nomeMae: string;
  nomePai: string;
  ano: number;
  endereco: AddressProps;
  turma: {
    id: string;
    nome: string;
  };
  instituicao: {
    id: string;
    nome: string;
    cnpj: string;
  };
  observacoesEducando: CommentsProps;
  responsaveis: Array<ParentsProps>;
}

export interface CreateStudentInput {
  nome: string;
  sexo: boolean;
  dataNascimento: string;
  rg: string;
  cpf: string;
  nis: string;
  sus: string;
  nomeCartorio: string;
  cidadeCartorio: string;
  numeroRegistroNascimento: string;
  dataEmissaoCertidao: string;
  ufCartorio: string;
  etnia: string;
  nomeMae: string;
  nomePai: string;
  ano: number;
  endereco: CreateAddressInput;
  turma_id: string;
  instituicao_id: string;
  observacoesEducando: CreateCommentsProps;
  responsaveis: CreateParentsInputProps[];
}

export interface UpdateStudentInput {
  id: string;
  nome: string;
  sexo: boolean;
  dataNascimento: string;
  rg: string;
  cpf: string;
  nis: string;
  sus: string;
  nomeCartorio: string;
  cidadeCartorio: string;
  numeroRegistroNascimento: string;
  dataEmissaoCertidao: string;
  ufCartorio: string;
  etnia: string;
  nomeMae: string;
  nomePai: string;
  ano: number;
  endereco: CreateAddressInput;
  turma_id: string;
  instituicao_id: string;
  observacoesEducando: CommentsProps;
  responsaveis: CreateParentsInputProps[];
}

export interface CreateCommentsProps {
  alimentacao: string;
  alergia: string;
  medicacao: string;
  produtoHigienePessoal: string;
  tipoSangue: string;
  medicacaoDeficiencia: string;
  laudoMedico: boolean;
  deficiencia: DeficienciaProps;
}
export interface CommentsProps {
  id: string;
  alimentacao: string;
  alergia: string;
  medicacao: string;
  produtoHigienePessoal: string;
  tipoSangue: string;
  medicacaoDeficiencia: string;
  laudoMedico: boolean;
  deficiencia: DeficienciaProps;
}

export interface DeficienciaProps {
  intelectual: boolean;
  visual: boolean;
  auditiva: boolean;
  fisica: boolean;
  multipla: boolean;
}

export interface Student {
  nome: string;
  dataNascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  turma_id: string;
  instituicao_id: string;
  nis: string;
  sus: string;
  cidadeCartorio: string;
  numeroRegistroNascimento: string;
  dataEmissaoCertidao: string;
  ufCartorio: string;
  etnia: string;
  nomeMae: string;
  nomePai: string;
}
