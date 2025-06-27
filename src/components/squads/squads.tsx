"use client"
import { useState } from 'react';
import { useSquads } from '../../hooks/useSquads';
import { Squad } from '../../models/Squad';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SquadForm from './SquadForm';
import TransferirUsuario from './TransferirUsuario';
import EstatisticasSquad from './EstatisticasSquad';
import GerenciarMembros from './GerenciarMembros';

type ViewMode = 'cards' | 'table' | 'stats';

export default function Squads() {
  const { 
    squads, 
    usuarios, 
    loading, 
    criarSquad, 
    editarSquad, 
    transferirUsuario, 
    alterarStatusSquad,
    adicionarMembro,
    removerMembro
  } = useSquads();

  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [showForm, setShowForm] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showGerenciarMembros, setShowGerenciarMembros] = useState(false);
  const [editingSquad, setEditingSquad] = useState<Squad | null>(null);
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [squadGerenciar, setSquadGerenciar] = useState<Squad | null>(null);

  const handleCriarSquad = async (dados: any) => {
    try {
      await criarSquad(dados);
      setShowForm(false);
      alert('Squad criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar squad');
    }
  };

  const handleEditarSquad = async (dados: any) => {
    if (!editingSquad) return;
    try {
      await editarSquad(editingSquad.id, dados);
      setShowForm(false);
      setEditingSquad(null);
      alert('Squad atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar squad');
    }
  };

  const handleTransferirUsuario = async (usuarioId: number, squadOrigemId: number, squadDestinoId: number) => {
    try {
      await transferirUsuario(usuarioId, squadOrigemId, squadDestinoId);
      setShowTransfer(false);
      alert('Usuário transferido com sucesso!');
    } catch (error) {
      alert('Erro ao transferir usuário');
    }
  };

  const handleAdicionarMembro = async (squadId: number, usuarioId: number) => {
    try {
      await adicionarMembro(squadId, usuarioId);
      alert('Membro adicionado com sucesso!');
    } catch (error) {
      alert('Erro ao adicionar membro');
    }
  };

  const handleRemoverMembro = async (squadId: number, usuarioId: number) => {
    try {
      await removerMembro(squadId, usuarioId);
      alert('Membro removido com sucesso!');
    } catch (error) {
      alert('Erro ao remover membro');
    }
  };

  const handleAlterarStatus = async (squad: Squad) => {
    const novoStatus = squad.status === 'ativo' ? 'inativo' : 'ativo';
    try {
      await alterarStatusSquad(squad.id, novoStatus);
      alert(`Squad ${novoStatus === 'ativo' ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (error) {
      alert('Erro ao alterar status do squad');
    }
  };

  const renderCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {squads.map(squad => (
        <Card key={squad.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: squad.cor }}
                />
                <CardTitle className="text-lg">{squad.nome}</CardTitle>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                squad.status === 'ativo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {squad.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </div>
            </div>
            <p className="text-sm text-gray-600">{squad.descricao}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Líder:</span>
              <span className="font-medium">{squad.lider.nme_Usuario}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Membros:</span>
              <span className="font-medium">{squad.membros.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Chamados:</span>
              <span className="font-medium">{squad.estatisticas.totalChamados}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Taxa Resolução:</span>
              <span className="font-medium">
                {squad.estatisticas.totalChamados > 0 
                  ? ((squad.estatisticas.chamadosResolvidos / squad.estatisticas.totalChamados) * 100).toFixed(1)
                  : '0'}%
              </span>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => {
                  setSelectedSquad(squad);
                  setViewMode('stats');
                }}
                className="flex-1 py-2 px-3 text-sm"
              >
                Ver Estatísticas
              </Button>
              <Button
                onClick={() => {
                  setSquadGerenciar(squad);
                  setShowGerenciarMembros(true);
                }}
                className="py-2 px-3 text-sm bg-green-100 text-green-700 hover:bg-green-200"
              >
                Gerenciar
              </Button>
              <Button
                onClick={() => {
                  setEditingSquad(squad);
                  setShowForm(true);
                }}
                className="py-2 px-3 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Editar
              </Button>
              <Button
                onClick={() => handleAlterarStatus(squad)}
                className={`py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 ${
                  squad.status === 'ativo' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {squad.status === 'ativo' ? 'Desativar' : 'Ativar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-2 text-left">Squad</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Líder</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Membros</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Chamados</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Taxa Resolução</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {squads.map(squad => (
            <tr key={squad.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: squad.cor }}
                  />
                  <div>
                    <div className="font-medium">{squad.nome}</div>
                    <div className="text-sm text-gray-600">{squad.descricao}</div>
                  </div>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div>
                  <div className="font-medium">{squad.lider.nme_Usuario}</div>
                  <div className="text-sm text-gray-600">{squad.lider.cargo}</div>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">{squad.membros.length}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  squad.status === 'ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {squad.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">{squad.estatisticas.totalChamados}</td>
              <td className="border border-gray-300 px-4 py-2">
                {squad.estatisticas.totalChamados > 0 
                  ? ((squad.estatisticas.chamadosResolvidos / squad.estatisticas.totalChamados) * 100).toFixed(1)
                  : '0'}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-1">
                  <Button
                    onClick={() => {
                      setSelectedSquad(squad);
                      setViewMode('stats');
                    }}
                    className="py-1 px-2 text-xs"
                  >
                    Stats
                  </Button>
                  <Button
                    onClick={() => {
                      setSquadGerenciar(squad);
                      setShowGerenciarMembros(true);
                    }}
                    className="py-1 px-2 text-xs bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Gerenciar
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingSquad(squad);
                      setShowForm(true);
                    }}
                    className="py-1 px-2 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Editar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStats = () => {
    if (!selectedSquad) return null;
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setViewMode('cards')}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Estatísticas do Squad</h1>
        </div>
        <EstatisticasSquad squad={selectedSquad} />
      </div>
    );
  };

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => {
              setShowForm(false);
              setEditingSquad(null);
            }}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">
            {editingSquad ? 'Editar Squad' : 'Criar Novo Squad'}
          </h1>
        </div>
        <SquadForm
          squad={editingSquad}
          usuarios={usuarios}
          onSubmit={editingSquad ? handleEditarSquad : handleCriarSquad}
          onCancel={() => {
            setShowForm(false);
            setEditingSquad(null);
          }}
          loading={loading}
        />
      </div>
    );
  }

  if (showTransfer) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setShowTransfer(false)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Transferir Usuário</h1>
        </div>
        <TransferirUsuario
          squads={squads}
          onTransferir={handleTransferirUsuario}
          onCancel={() => setShowTransfer(false)}
          loading={loading}
        />
      </div>
    );
  }

  if (showGerenciarMembros && squadGerenciar) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => {
              setShowGerenciarMembros(false);
              setSquadGerenciar(null);
            }}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Gerenciar Membros</h1>
        </div>
        <GerenciarMembros
          squad={squadGerenciar}
          usuarios={usuarios}
          onAdicionarMembro={handleAdicionarMembro}
          onRemoverMembro={handleRemoverMembro}
          onCancel={() => {
            setShowGerenciarMembros(false);
            setSquadGerenciar(null);
          }}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestão de Squads</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            + Novo Squad
          </Button>
          <Button
            onClick={() => setShowTransfer(true)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Transferir Usuário
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          className={viewMode === 'cards' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          onClick={() => setViewMode('cards')}
        >
          Cards
        </Button>
        <Button
          className={viewMode === 'table' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          onClick={() => setViewMode('table')}
        >
          Tabela
        </Button>
      </div>

      {viewMode === 'cards' && renderCards()}
      {viewMode === 'table' && renderTable()}
      {viewMode === 'stats' && renderStats()}
    </div>
  );
}
