import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const mensagensExemplo = [
  {
    id: 1,
    autor: "usuário",
    nome: "Bella Negoro",
    texto: "Olá, estou com problemas para fazer meu queijo funcionar corretamente. Alguém pode ajudar?",
    hora: "10:30 AM",
  },
  {
    id: 2,
    autor: "atendente",
    nome: "Atendente",
    texto: "Olá Bella! Poderia nos dar mais detalhes sobre o problema com seu queijo?",
    hora: "10:32 AM",
  },
];

export default function ChatArea({ chat }: any) {
  const [mensagem, setMensagem] = useState("");
  const [finalizado, setFinalizado] = useState(chat?.status === "SOLVED" || chat?.status === 2);

  const handleFinalizarChamado = () => {
    if (!chat) return;
    const token = localStorage.getItem('token');
    setFinalizado(true);
    fetch(`https://localhost:7299/api/Conversa/Atualizar-status-Conversa/${chat.id}?status=2`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar status no backend');
        return res.json();
      })
      .then(data => {
        console.log('Status atualizado no backend:', data);
      })
      .catch(err => {
        console.error('Erro ao atualizar status:', err);
        setFinalizado(false);
      });
  };

  if (!chat) {
    return (
      <div className="flex flex-1 items-center justify-center text-blue-200 text-lg">Selecione uma conversa para visualizar o chat.</div>
    );
  }
  return (
    <div className="flex flex-col h-full p-8 bg-neutral-950">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="font-bold text-white text-lg">{chat.usuario}</span>
          <span className="ml-2 text-blue-300 text-sm">{chat.titulo}</span>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2  bg-blue-700 hover:bg-blue-800 text-white font-bold transition rounded-2xl ${finalizado ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleFinalizarChamado}
          disabled={finalizado}
        >
          <CheckCircle size={18} />
          {finalizado ? 'Chamado finalizado' : 'Finalizar chamado'}
        </button>
      </div>
      <div className="bg-neutral-900 rounded p-4 mb-2 text-blue-200 text-sm">
        Caso deseje iniciar uma Conversa com o HelpDesk basta digitar a mensagem no campo abaixo e enviá-la, após enviar basta aguardar que um profissional irá atendê-lo<br/>
        Não carregou? ou apareceu um erro? tente recarregar a página, caso não resolva entre em contato com o fornecedor<br/>
        <span className="text-blue-400 font-bold">Aviso! Após encerrado, o chamado não poderá ser acessado novamente</span>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-4 bg-black bg-opacity-80 rounded p-4">
        {mensagensExemplo.map((msg) => (
          <div key={msg.id} className={`flex ${msg.autor === "usuário" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xl px-4 py-2 rounded-lg text-base ${msg.autor === "usuário" ? "bg-blue-900 text-white" : "bg-neutral-800 text-blue-200"}`}>
              <div>{msg.texto}</div>
              <div className="text-xs text-blue-300 mt-1 text-right">{msg.hora}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        <input
          className="flex-1 p-2 rounded bg-neutral-900 text-white border border-neutral-700"
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
        />
        <button className="bg-blue-900 hover:bg-blue-800 p-2 rounded text-white font-bold px-6">Enviar</button>
      </div>
    </div>
  );
} 