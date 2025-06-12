import { useChamados } from '../hooks/useChamados';
import { useEffect } from 'react';

export default function ListaChamados() {
  // Defina o tipo conforme sua regra de negócio
  const { chamados, loading } = useChamados(1, false);

  useEffect(() => {
    console.log('Chamados retornados da API:', chamados);
  }, [chamados]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="w-full">
      {chamados.map(chamado => (
        <div
          key={chamado.id}
          className="flex items-center gap-3 p-3 mb-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          <img
            src={chamado.cliente.img_Usuario}
            alt={chamado.cliente.nme_Usuario}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="font-semibold text-white">{chamado.cliente.nme_Usuario}</div>
            <div className="text-gray-400 text-xs">
              {new Date(chamado.dta_Inicio_Conversa).toLocaleString('pt-BR')}
            </div>
          </div>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              chamado.stt_Conversa === 1
                ? 'bg-yellow-500 text-black'
                : 'bg-green-500 text-white'
            }`}
          >
            {chamado.stt_Conversa === 1 ? 'OPEN' : 'SOLVED'}
          </span>
        </div>
      ))}
    </div>
  );
} 