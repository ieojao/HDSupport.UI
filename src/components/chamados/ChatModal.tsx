import ChatArea from "./ChatArea";

export default function ChatModal({ chamado, onClose, onFinalizarChamado }: { chamado: any; onClose: () => void; onFinalizarChamado: (id: number) => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-blue-950 text-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          X
        </button>
        <ChatArea chat={chamado} onFinalizarChamado={onFinalizarChamado} />
      </div>
    </div>
  );
}