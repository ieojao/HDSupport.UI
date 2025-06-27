"use client"
import { useState } from 'react';
import { Squad, Usuario } from '../../models/Squad';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface GerenciarMembrosProps {
  squad: Squad;
  usuarios: Usuario[];
  onAdicionarMembro: (squadId: number, usuarioId: number) => Promise<void>;
  onRemoverMembro: (squadId: number, usuarioId: number) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function GerenciarMembros({ 
  squad, 
  usuarios, 
  onAdicionarMembro, 
  onRemoverMembro, 
  onCancel, 
  loading 
}: GerenciarMembrosProps) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<number>(0);

  const usuariosDisponiveis = usuarios.filter(u => 
    !squad.membros.find(m => m.id === u.id)
  );

  const handleAdicionarMembro = async () => {
    if (!usuarioSelecionado) {
      alert('Por favor, selecione um usuário');
      return;
    }
    await onAdicionarMembro(squad.id, usuarioSelecionado);
    setUsuarioSelecionado(0);
  };

  const handleRemoverMembro = async (usuarioId: number) => {
    if (usuarioId === squad.lider.id) {
      alert('Não é possível remover o líder da equipe');
      return;
    }
    if (confirm('Tem certeza que deseja remover este membro?')) {
      await onRemoverMembro(squad.id, usuarioId);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Gerenciar Membros - {squad.nome}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Adicionar Membro */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Adicionar Novo Membro</h3>
          <div className="flex gap-3">
            <select
              value={usuarioSelecionado}
              onChange={(e) => setUsuarioSelecionado(Number(e.target.value))}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Selecione um usuário</option>
              {usuariosDisponiveis.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nme_Usuario} - {usuario.cargo}
                </option>
              ))}
            </select>
            <Button
              onClick={handleAdicionarMembro}
              disabled={loading || !usuarioSelecionado}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </div>
        </div>

        {/* Lista de Membros Atuais */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Membros Atuais ({squad.membros.length})</h3>
          <div className="space-y-3">
            {squad.membros.map(membro => (
              <div key={membro.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {membro.nme_Usuario.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{membro.nme_Usuario}</div>
                    <div className="text-sm text-gray-600">{membro.cargo}</div>
                    <div className="text-xs text-gray-500">{membro.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {membro.id === squad.lider.id && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Líder
                    </span>
                  )}
                  {membro.id !== squad.lider.id && (
                    <Button
                      onClick={() => handleRemoverMembro(membro.id)}
                      disabled={loading}
                      className="py-1 px-2 text-xs bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Remover
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {squad.membros.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum membro encontrado
              </div>
            )}
          </div>
        </div>

        {/* Usuários Disponíveis */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Usuários Disponíveis ({usuariosDisponiveis.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {usuariosDisponiveis.map(usuario => (
              <div key={usuario.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {usuario.nme_Usuario.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{usuario.nme_Usuario}</div>
                  <div className="text-xs text-gray-600">{usuario.cargo}</div>
                </div>
                <Button
                  onClick={() => {
                    setUsuarioSelecionado(usuario.id);
                    handleAdicionarMembro();
                  }}
                  disabled={loading}
                  className="py-1 px-2 text-xs bg-green-600 hover:bg-green-700"
                >
                  +
                </Button>
              </div>
            ))}
            {usuariosDisponiveis.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Todos os usuários já estão em squads
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Fechar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 