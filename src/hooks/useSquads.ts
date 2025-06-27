import { useState, useEffect } from 'react';
import { Squad, SquadFormData, Usuario } from '../models/Squad';

// Dados mockados para demonstração
const mockUsuarios: Usuario[] = [
  { id: 1, nme_Usuario: 'João Silva', img_Usuario: '/avatar1.jpg', email: 'joao@empresa.com', cargo: 'Desenvolvedor' },
  { id: 2, nme_Usuario: 'Maria Santos', img_Usuario: '/avatar2.jpg', email: 'maria@empresa.com', cargo: 'Analista' },
  { id: 3, nme_Usuario: 'Pedro Costa', img_Usuario: '/avatar3.jpg', email: 'pedro@empresa.com', cargo: 'Tech Lead' },
  { id: 4, nme_Usuario: 'Ana Oliveira', img_Usuario: '/avatar4.jpg', email: 'ana@empresa.com', cargo: 'Desenvolvedor' },
  { id: 5, nme_Usuario: 'Carlos Lima', img_Usuario: '/avatar5.jpg', email: 'carlos@empresa.com', cargo: 'Analista' },
];

const mockSquads: Squad[] = [
  {
    id: 1,
    nome: 'Squad Frontend',
    descricao: 'Equipe responsável pelo desenvolvimento frontend',
    lider: mockUsuarios[2],
    membros: [mockUsuarios[0], mockUsuarios[3]],
    dataCriacao: '2024-01-15',
    status: 'ativo',
    cor: '#3B82F6',
    estatisticas: {
      totalChamados: 45,
      chamadosResolvidos: 42,
      tempoMedioResolucao: 2.5,
      satisfacaoMedia: 4.2
    }
  },
  {
    id: 2,
    nome: 'Squad Backend',
    descricao: 'Equipe responsável pelo desenvolvimento backend',
    lider: mockUsuarios[1],
    membros: [mockUsuarios[4]],
    dataCriacao: '2024-02-01',
    status: 'ativo',
    cor: '#10B981',
    estatisticas: {
      totalChamados: 38,
      chamadosResolvidos: 35,
      tempoMedioResolucao: 3.1,
      satisfacaoMedia: 4.0
    }
  }
];

export const useSquads = () => {
  const [squads, setSquads] = useState<Squad[]>(mockSquads);
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [loading, setLoading] = useState(false);

  const criarSquad = async (dados: SquadFormData) => {
    setLoading(true);
    try {
      const novoLider = usuarios.find(u => u.id === dados.liderId);
      if (!novoLider) throw new Error('Líder não encontrado');

      const novoSquad: Squad = {
        id: Date.now(),
        nome: dados.nome,
        descricao: dados.descricao,
        lider: novoLider,
        membros: [novoLider],
        dataCriacao: new Date().toISOString().split('T')[0],
        status: 'ativo',
        cor: dados.cor,
        estatisticas: {
          totalChamados: 0,
          chamadosResolvidos: 0,
          tempoMedioResolucao: 0,
          satisfacaoMedia: 0
        }
      };

      setSquads(prev => [...prev, novoSquad]);
      return novoSquad;
    } catch (error) {
      console.error('Erro ao criar squad:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editarSquad = async (id: number, dados: Partial<SquadFormData>) => {
    setLoading(true);
    try {
      setSquads(prev => prev.map(squad => {
        if (squad.id === id) {
          const novoLider = dados.liderId ? usuarios.find(u => u.id === dados.liderId) : squad.lider;
          return {
            ...squad,
            nome: dados.nome || squad.nome,
            descricao: dados.descricao || squad.descricao,
            lider: novoLider || squad.lider,
            cor: dados.cor || squad.cor
          };
        }
        return squad;
      }));
    } catch (error) {
      console.error('Erro ao editar squad:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const transferirUsuario = async (usuarioId: number, squadOrigemId: number, squadDestinoId: number) => {
    setLoading(true);
    try {
      const usuario = usuarios.find(u => u.id === usuarioId);
      if (!usuario) throw new Error('Usuário não encontrado');

      setSquads(prev => prev.map(squad => {
        if (squad.id === squadOrigemId) {
          return {
            ...squad,
            membros: squad.membros.filter(m => m.id !== usuarioId)
          };
        }
        if (squad.id === squadDestinoId) {
          return {
            ...squad,
            membros: [...squad.membros, usuario]
          };
        }
        return squad;
      }));
    } catch (error) {
      console.error('Erro ao transferir usuário:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adicionarMembro = async (squadId: number, usuarioId: number) => {
    setLoading(true);
    try {
      const usuario = usuarios.find(u => u.id === usuarioId);
      if (!usuario) throw new Error('Usuário não encontrado');

      setSquads(prev => prev.map(squad => {
        if (squad.id === squadId && !squad.membros.find(m => m.id === usuarioId)) {
          return {
            ...squad,
            membros: [...squad.membros, usuario]
          };
        }
        return squad;
      }));
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removerMembro = async (squadId: number, usuarioId: number) => {
    setLoading(true);
    try {
      setSquads(prev => prev.map(squad => {
        if (squad.id === squadId) {
          return {
            ...squad,
            membros: squad.membros.filter(m => m.id !== usuarioId)
          };
        }
        return squad;
      }));
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const alterarStatusSquad = async (squadId: number, status: 'ativo' | 'inativo') => {
    setLoading(true);
    try {
      setSquads(prev => prev.map(squad => {
        if (squad.id === squadId) {
          return { ...squad, status };
        }
        return squad;
      }));
    } catch (error) {
      console.error('Erro ao alterar status do squad:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUsuariosDisponiveis = (squadId?: number) => {
    if (!squadId) return usuarios;
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return usuarios;
    return usuarios.filter(u => !squad.membros.find(m => m.id === u.id));
  };

  return {
    squads,
    usuarios,
    loading,
    criarSquad,
    editarSquad,
    transferirUsuario,
    adicionarMembro,
    removerMembro,
    alterarStatusSquad,
    getUsuariosDisponiveis
  };
}; 