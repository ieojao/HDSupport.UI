"use client"
import { useState } from 'react';
import { Squad, Usuario } from '../../models/Squad';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TransferirUsuarioProps {
  squads: Squad[];
  onTransferir: (usuarioId: number, squadOrigemId: number, squadDestinoId: number) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function TransferirUsuario({ squads, onTransferir, onCancel, loading }: TransferirUsuarioProps) {
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [squadOrigemId, setSquadOrigemId] = useState<number>(0);
  const [squadDestinoId, setSquadDestinoId] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioId || !squadOrigemId || !squadDestinoId) {
      alert('Por favor, selecione todos os campos');
      return;
    }
    if (squadOrigemId === squadDestinoId) {
      alert('O squad de origem e destino devem ser diferentes');
      return;
    }
    await onTransferir(usuarioId, squadOrigemId, squadDestinoId);
  };

  const squadOrigem = squads.find(s => s.id === squadOrigemId);
  const usuariosDisponiveis = squadOrigem?.membros || [];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Transferir Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Squad de Origem *</label>
            <select
              value={squadOrigemId}
              onChange={(e) => {
                setSquadOrigemId(Number(e.target.value));
                setUsuarioId(0);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Selecione o squad de origem</option>
              {squads.map(squad => (
                <option key={squad.id} value={squad.id}>
                  {squad.nome} ({squad.membros.length} membros)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Usuário *</label>
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!squadOrigemId}
            >
              <option value={0}>Selecione o usuário</option>
              {usuariosDisponiveis.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nme_Usuario} - {usuario.cargo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Squad de Destino *</label>
            <select
              value={squadDestinoId}
              onChange={(e) => setSquadDestinoId(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Selecione o squad de destino</option>
              {squads
                .filter(squad => squad.id !== squadOrigemId)
                .map(squad => (
                  <option key={squad.id} value={squad.id}>
                    {squad.nome} ({squad.membros.length} membros)
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Transferindo...' : 'Transferir'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 