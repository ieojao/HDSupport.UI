"use client";

import { useState } from "react";
import ChatModal from "./ChatModal";

type ChamadoItemProps = {
  chamado: any;
  onFinalizarChamado: (chamado: any) => void;
};

export default function ChamadoItem({ chamado, onFinalizarChamado }: ChamadoItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center bg-blue-800 hover:bg-blue-700 transition-colors text-white p-5 rounded-lg mb-4 shadow-lg">
        <div>
          <div className="font-bold text-lg">{chamado.titulo}</div>
          <div className="text-sm text-blue-200">Usuário: {chamado.usuario}</div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded shadow transition-all"
          onClick={() => setOpen(true)}
        >
          Chat
        </button>
      </div>
      {open && <ChatModal chamado={chamado} onClose={() => setOpen(false)} onFinalizarChamado={onFinalizarChamado} />}
    </>
  );
}