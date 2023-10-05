export interface ParentsProps {
  id: string;
  id_educando: string;
  nome: string;
  dataNascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  ssp: string;
  dataExpedicaoRg: string;
  emissorRg: string;
  uf_rg: string;
  dataExpedicaoCpf: string;
  profissao: string;
  nome_mae: string;
  bolsaFamilia?: {
    nis: string | undefined;
  };
  condicoesVida: LivingConditionsProps;
  condicoesMoradia: HousingConditionsProps;
}

export interface CreateParentsInput {
  nome: string;
  dataNascimento: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  dataExpedicaoRg: string;
  emissorRg: string;
  ufRg: string;
  dataExpedicaoCpf: string;
  profissao: string;
  nomeMae: string;
  bolsaFamilia?: {
    nis: string | undefined;
  };
  familiaresCasa: number;
}

export interface CreateParentsInputProps {
  nome: string;
  sexo: boolean;
  dataNascimento: string;
  rg: string;
  cpf: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  dataExpedicaoRg: string;
  emissorRg: string;
  ufRg: string;
  dataExpedicaoCpf: string;
  profissao: string;
  nomeMae: string;
  bolsaFamilia?: {
    nis: string | undefined;
  };
  condicaoVida: CreateLivingConditionsInput;
  condicaoMoradia: CreateHousingConditionsInput;
  familiaresCasa: number;
}

export interface LivingConditionsProps {
  id: string;
  trabalhoDaFamilia: string;
  rendaMensalFamilia: number;
  quantasPessoasTrabalhamNaCasa: number;
  programaGoverno: string;
  problemaEnfrentado: ProblemFacedProps;
}

export interface HousingConditionsProps {
  id: string;
  tipoCasa: string;
  posseCasa: string;
  banheiroComFossa: boolean;
  aguaCagepa: boolean;
  poco: boolean;
  energia: boolean;
}
export interface CreateHousingConditionsInput {
  tipoCasa: string;
  posseCasa: string;
  banheiroComFossa: boolean;
  aguaCagepa: boolean;
  poco: boolean;
  energia: boolean;
}

export interface CreateLivingConditionsInput {
  trabalhoDaFamilia: string;
  rendaMensalFamilia: number;
  quantasPessoasTrabalhamNaCasa: number;
  programaGoverno: string;
  problemaEnfrentado: CreateProblemFacedProps;
}

export interface CreateConditionsInput {
  condicaoMoradia: CreateHousingConditionsInput;
  condicaoVida: CreateLivingConditionsInput;
}

export interface ProblemFacedProps {
  id: string;
  alcool: boolean;
  lazer: boolean;
  saude: boolean;
  fome: boolean;
  drogas: boolean;
  violencia: boolean;
  desemprego: boolean;
}

export interface CreateProblemFacedProps {
  alcool: boolean;
  lazer: boolean;
  saude: boolean;
  fome: boolean;
  drogas: boolean;
  violencia: boolean;
  desemprego: boolean;
}
