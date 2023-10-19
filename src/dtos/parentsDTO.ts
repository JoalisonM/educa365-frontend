export interface ParentsProps {
  id: string;
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
  ufRg: string;
  dataExpedicaoCpf: string;
  profissao: string;
  nomeMae: string;
  bolsaFamilia?: {
    nis: string | undefined;
  };
  condicaoVida: LivingConditionsProps;
  condicaoMoradia: HousingConditionsProps;
  familiaresCasa: number;
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

export interface UpdateParentsInput {
  id: string;
  nome: string;
  sexo: boolean;
  rg: string;
  cpf: string;
  dataNascimento: string;
  parentesco: string;
  escolaridade: string;
  apelido: string;
  dataExpedicaoRg: string;
  dataExpedicaoCpf: string;
  profissao: string;
  nomeMae: string;
  ufRg: string;
  emissorRg: string;
  familiaresCasa: number;
  bolsaFamilia?: {
    nis?: string | null;
  };
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

export interface UpdateHousingConditionsInput {
  id?: string | undefined;
  tipoCasa: string;
  posseCasa: string;
  banheiroComFossa: boolean;
  aguaCagepa: boolean;
  poco: boolean;
  energia: boolean;
}

export interface UpdateLivingConditionsInput {
  id?: string | undefined;
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

export interface UpdateConditionsInput {
  condicaoMoradia: UpdateHousingConditionsInput;
  condicaoVida: UpdateLivingConditionsInput;
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
