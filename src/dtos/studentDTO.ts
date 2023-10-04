import { AddressProps, CreateAddressInput } from "./addressDTO";
import { CreateParentsInputProps } from "./parentsDTO";

export interface StudentProps {
  id: string;
  nome: string;
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  endereco: AddressProps;
  id_turma: string;
  id_instituicao_ensino: string;
  nis: string;
  sus: string;
  cidade_nascenca: string;
  cidade_cartorio: string;
  numero_registro_nascimento: string;
  data_emissao_certidao: string;
  uf_cartorio: string;
  etnia: string;
  nome_mae: string;
  nome_pai: string;
  observacao: CommentsProps;
}

export interface CreateStudentInput {
  nome: string;
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  id_turma: string;
  id_instituicao_ensino: string;
  nis: string;
  sus: string;
  cidade_nascenca: string;
  cidade_cartorio: string;
  numero_registro_nascimento: string;
  data_emissao_certidao: string;
  uf_cartorio: string;
  etnia: string;
  nome_mae: string;
  nome_pai: string;
  nome_cartorio: string;
  endereco: CreateAddressInput;
  observacao: CommentsProps;
  responsaveis: CreateParentsInputProps[];
}

export interface UpdateStudentInput {
  id: string;
  nome: string;
  nome_cartorio: string;
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  endereco: AddressProps;
  id_turma: string;
  id_instituicao_ensino: string;
  nis: string;
  sus: string;
  cidade_nascenca: string;
  cidade_cartorio: string;
  numero_registro_nascimento: string;
  data_emissao_certidao: string;
  uf_cartorio: string;
  etnia: string;
  nome_mae: string;
  nome_pai: string;
  observacao: CommentsProps;
}

export interface CommentsProps {
  alimentacao: string;
  alergia: string;
  medicacao: string;
  produto_higiene_corporal: string;
  tipo_sangue: string;
  medicacao_deficiencia: string;
  laudo_medico: string;
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
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  id_turma: string;
  id_instituicao_ensino: string;
  nis: string;
  sus: string;
  cidade_nascenca: string;
  cidade_cartorio: string;
  numero_registro_nascimento: string;
  data_emissao_certidao: string;
  uf_cartorio: string;
  etnia: string;
  nome_mae: string;
  nome_pai: string;
}
