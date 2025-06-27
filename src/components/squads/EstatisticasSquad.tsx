"use client"
import { Squad } from '../../models/Squad';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface EstatisticasSquadProps {
  squad: Squad;
}

export default function EstatisticasSquad({ squad }: EstatisticasSquadProps) {
  const taxaResolucao = squad.estatisticas.totalChamados > 0 
    ? ((squad.estatisticas.chamadosResolvidos / squad.estatisticas.totalChamados) * 100).toFixed(1)
    : '0';

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBg = (status: string) => {
    return status === 'ativo' ? 'bg-green-100' : 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Squad */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: squad.cor }}
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{squad.nome}</h2>
          <p className="text-gray-600">{squad.descricao}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(squad.status)} ${getStatusColor(squad.status)}`}>
          {squad.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </div>
      </div>

      {/* Informações Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Membros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{squad.membros.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Líder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-gray-900">{squad.lider.nme_Usuario}</div>
            <div className="text-xs text-gray-500">{squad.lider.cargo}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Data de Criação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-gray-900">
              {new Date(squad.dataCriacao).toLocaleDateString('pt-BR')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Dias Ativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Math.floor((new Date().getTime() - new Date(squad.dataCriacao).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{squad.estatisticas.totalChamados}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Chamados Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{squad.estatisticas.chamadosResolvidos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{taxaResolucao}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tempo Médio (dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{squad.estatisticas.tempoMedioResolucao}</div>
          </CardContent>
        </Card>
      </div>

      {/* Satisfação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Satisfação do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-yellow-600">
              {squad.estatisticas.satisfacaoMedia.toFixed(1)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= squad.estatisticas.satisfacaoMedia 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">Baseado em {squad.estatisticas.chamadosResolvidos} avaliações</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Membros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Membros da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {squad.membros.map(membro => (
              <div key={membro.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {membro.nme_Usuario.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{membro.nme_Usuario}</div>
                  <div className="text-sm text-gray-600">{membro.cargo}</div>
                </div>
                {membro.id === squad.lider.id && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Líder
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 