export interface ParentsProps {
  id: string;
  id_educando: string;
  nome: string;
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  ssp: string;
  data_expedicao_rg: string;
  emissor_rg: string;
  uf_rg: string;
  data_expedicao_cpf: string;
  profissao: string;
  nome_mae: string;
  bolsaFamilia?: {
    nis: string;
  };
  condicoes_vida: string;
  condicoes_moradia: string;
}

export interface CreateParentsInput {
  nome: string;
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  data_expedicao_rg: string;
  emissor_rg: string;
  uf_rg: string;
  data_expedicao_cpf: string;
  profissao: string;
  nome_mae: string;
  bolsa_familia?: {
    nis: string;
  };
  familiares_casa: number;
}

export interface CreateParentsInputProps {
  nome: string;
  data_nascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  data_expedicao_rg: string;
  emissor_rg: string;
  uf_rg: string;
  data_expedicao_cpf: string;
  profissao: string;
  nome_mae: string;
  bolsa_familia?: {
    nis: string;
  };
  condicoes_vida: CreateLivingConditionsInput;
  condicoes_moradia: CreateHousingConditionsInput;
  familiares_casa: number;
}

export interface CreateHousingConditionsInput {
  tipo_casa: string;
  posse_casa: string;
  banheiro_com_fossa: boolean;
  agua_cagepa: boolean;
  poco: boolean;
  energia: boolean;
}

export interface CreateLivingConditionsInput {
  trabalho_familia: string;
  renda_mensal_familia: string;
  quantas_pessoas_trabalham_casa: number;
  programa_governo: string;
  problema_enfrentado: ProblemFacedProps;
}

export interface ProblemFacedProps {
  alcool: boolean;
  lazer: boolean;
  saude: boolean;
  fome: boolean;
  drogas: boolean;
  violencia: boolean;
  desemprego: boolean;
}
