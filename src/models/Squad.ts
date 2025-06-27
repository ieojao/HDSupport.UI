export interface Usuario {
  id: number;
  nme_Usuario: string;
  img_Usuario: string;
  email: string;
  cargo: string;
}

export interface Squad {
  id: number;
  nome: string;
  descricao: string;
  lider: Usuario;
  membros: Usuario[];
  dataCriacao: string;
  status: 'ativo' | 'inativo';
  cor: string;
  estatisticas: {
    totalChamados: number;
    chamadosResolvidos: number;
    tempoMedioResolucao: number;
    satisfacaoMedia: number;
  };
}

export interface SquadFormData {
  nome: string;
  descricao: string;
  liderId: number;
  cor: string;
} 