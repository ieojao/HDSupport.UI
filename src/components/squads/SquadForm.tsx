"use client"
import { useState, useEffect } from 'react';
import { SquadFormData, Usuario } from '../../models/Squad';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SquadFormProps {
  squad?: any;
  usuarios: Usuario[];
  onSubmit: (dados: SquadFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const coresDisponiveis = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
];

export default function SquadForm({ squad, usuarios, onSubmit, onCancel, loading }: SquadFormProps) {
  const [formData, setFormData] = useState<SquadFormData>({
    nome: '',
    descricao: '',
    liderId: 0,
    cor: '#3B82F6'
  });

  useEffect(() => {
    if (squad) {
      setFormData({
        nome: squad.nome,
        descricao: squad.descricao,
        liderId: squad.lider.id,
        cor: squad.cor
      });
    }
  }, [squad]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.descricao || !formData.liderId) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {squad ? 'Editar Squad' : 'Criar Novo Squad'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome do Squad *</label>
            <Input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Ex: Squad Frontend"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição *</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descreva as responsabilidades da equipe"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Líder da Equipe *</label>
            <select
              value={formData.liderId}
              onChange={(e) => setFormData(prev => ({ ...prev, liderId: Number(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Selecione um líder</option>
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nme_Usuario} - {usuario.cargo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cor da Equipe</label>
            <div className="flex gap-2 flex-wrap">
              {coresDisponiveis.map(cor => (
                <button
                  key={cor}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, cor }))}
                  className={`w-8 h-8 rounded-full border-2 ${
                    formData.cor === cor ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Salvando...' : (squad ? 'Atualizar' : 'Criar')}
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