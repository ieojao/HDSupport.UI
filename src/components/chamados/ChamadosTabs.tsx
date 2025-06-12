"use client";

import { useState } from "react";
import ChamadoItem from "./ChamadoItem";
import { useRouter } from "next/navigation";

const chamadosAbertos = [
  { id: 1, titulo: "Erro ao acessar o sistema", usuario: "João Silva", status: "aberto" },
  { id: 2, titulo: "Impressora não imprime", usuario: "Maria Souza", status: "aberto" },
  { id: 3, titulo: "Problema com e-mail", usuario: "Carlos Lima", status: "aberto" },
];

const chamadosConcluidos = [
  { id: 4, titulo: "Solicitação de acesso à rede", usuario: "Ana Paula", status: "concluido" },
  { id: 5, titulo: "Troca de monitor", usuario: "Pedro Henrique", status: "concluido" },
];

type ChamadosTabsProps = {
  router: ReturnType<typeof useRouter>;
};

export default function ChamadosTabs({ router }: ChamadosTabsProps) {
  const [tab, setTab] = useState<"abertos" | "concluidos">("abertos");
  const [chamados, setChamados] = useState({
    abertos: chamadosAbertos,
    concluidos: chamadosConcluidos
  });

  const handleFinalizarChamado = (id: number) => {
    setChamados(prev => {
      const chamadoFinalizado = prev.abertos.find((c: any) => c.id === id);
      if (!chamadoFinalizado) return prev;
      return {
        abertos: prev.abertos.filter((c: any) => c.id !== id),
        concluidos: [...prev.concluidos, { ...chamadoFinalizado, status: "concluido" }]
      };
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 rounded-t-lg ${tab === "abertos" ? "bg-blue-700 text-white" : "bg-black text-white"}`}
          onClick={() => setTab("abertos")}
        >
          Abertos
        </button>
        <button
          className={`flex-1 py-2 rounded-t-lg ${tab === "concluidos" ? "bg-blue-700 text-white" : "bg-black text-white"}`}
          onClick={() => setTab("concluidos")}
        >
          Concluídos
        </button>
      </div>
      <div className="bg-black rounded-b-lg p-4">
        {(tab === "abertos" ? chamados.abertos : chamados.concluidos).map((c: any) => (
          <ChamadoItem
            key={c.id}
            chamado={{
              ...c,
              status: c.status === 'aberto' ? 'OPEN' : c.status === 'concluido' ? 'SOLVED' : c.status
            }}
            onFinalizarChamado={handleFinalizarChamado}
          />
        ))}
      </div>
    </div>
  );
}