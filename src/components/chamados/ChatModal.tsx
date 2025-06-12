export default function ChatModal({ chamado, onClose }: { chamado: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-blue-950 text-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-lg font-bold mb-4">Chat do chamado: {chamado.titulo}</h2>
        <div className="h-40 bg-black rounded mb-4 p-2 overflow-y-auto">
          {/* Aqui vão as mensagens do chat */}
          <div className="text-blue-200">[Usuário]: Olá, preciso de ajuda!</div>
        </div>
        <input
          className="w-full p-2 rounded bg-blue-800 text-white"
          placeholder="Digite sua mensagem..."
        />
        <button className="mt-2 w-full bg-blue-700 hover:bg-blue-800 p-2 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}