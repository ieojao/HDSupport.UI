"use client"
import { EquipamentosSevice } from "@/service/ApiConnection";
import { useState } from "react";

export default function Page() {
    const [idf_Patrimonio, setIdf_Patrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [tipo, setTipo] = useState('');
    const [detalhe, setDetalhe] = useState('');
    const [status, setStatus] = useState(1);
    const [imagem, setImagem] = useState<string>(''); // base64

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result?.toString() || '';
            setImagem(base64String);
        };
        reader.readAsDataURL(file);
    };

    const addEquipamento = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await EquipamentosSevice.RegistroEquipamento(
                token,
                idf_Patrimonio,
                modelo,
                tipo,
                detalhe,
                status,
                imagem
            );

            console.log(response.data);
            alert('sucesso');
            window.location.reload();
        } catch (error) {
            alert('Erro');
            console.log('erro ao tentar adicionar', error);
        }
    };

    return (
        <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50">
            <div className="w-lg px-8 py-6 rounded-2xl bg-neutral-900 border-l-3 border-blue-400">
                <h1 className="mb-4 text-blue-400 text-2xl">Adicionar Equipamento</h1>
                <form onSubmit={addEquipamento}>
                    <div>
                        <label className="font-bold">Imagem do Equipamento:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full py-2 px-4 bg-black rounded-lg outline-0"
                            onChange={handleImagemChange}
                        />
                    </div>
                    <div>
                        <label className="font-bold">Idf_Patrimonio:</label>
                        <input
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg outline-0"
                            value={idf_Patrimonio}
                            onChange={(e) => setIdf_Patrimonio(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-bold">Modelo_Equipamento:</label>
                        <input
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg outline-0"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-bold">Tipo_Equipamento:</label>
                        <input
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg outline-0"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-bold">Detalhe_Equipamento</label>
                        <textarea
                            className="max-w-full min-w-full min-h-30 py-2 px-4 bg-black rounded-lg outline-0"
                            value={detalhe}
                            onChange={(e) => setDetalhe(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-bold">Status:</label>
                        <select
                            className="w-full p-3 bg-black rounded-lg outline-0"
                            value={status}
                            onChange={(e) => setStatus(Number(e.target.value))}
                        >
                            <option value={1}>Disponível</option>
                            <option value={2}>Emprestimo</option>
                            <option value={3}>Danificado</option>
                            <option value={4}>Concerto</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full p-2 mt-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-bold cursor-pointer">Confirmar</button>
                </form>
            </div>
        </div>
    );
}
