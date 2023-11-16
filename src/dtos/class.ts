export interface ClassProps {
  id: string;
  nome: string;
  turno: string;
  instituicao: {
    id: string;
    nome: string;
    cnpj: string;
  };
  professor: {
    id: string;
    nome: string;
    sexo: string;
    rg: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    cargo: string;
    endereco: {
      id: string;
      rua: string;
      bairro: string;
      numero: string;
      uf: string;
      cidade: string;
      cep: string;
      telefone: string;
      referencia: string;
    };
  };
}

export interface RequestTeacher {
  teacher_id: string;
}
