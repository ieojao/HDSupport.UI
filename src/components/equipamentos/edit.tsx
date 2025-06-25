"use client"
import { Equipamentos } from "@/context/DataInterface";
import { EquipamentosSevice } from "@/service/ApiConnection";
import { useEffect, useState } from "react";

interface DetailsProps {
    equipamento: Equipamentos | null;
}

export default function Page({ equipamento }: DetailsProps) {
    const [newModelo, setNewModelo] = useState('');
    const [newTipo, setNewTipo] = useState('');
    const [newDetalhe, setNewDetalhe] = useState('');
    const [newStatus, setNewStatus] = useState(1);

    useEffect(() => {
        if (equipamento) {
            setNewModelo(equipamento.modelo_Equipamento || '');
            setNewTipo(equipamento.tpo_Equipamento || '');
            setNewDetalhe(equipamento.dtl_Equipamento || '');
            setNewStatus(equipamento.stt_Equipamento);
        }
    }, [equipamento]);

    const editEquipamento = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token || !equipamento) { return; }
            const response = await EquipamentosSevice.EditarEquipamento(
                token,
                equipamento.id,
                equipamento.idf_Patrimonio.toString(),
                newModelo,
                newTipo,
                newDetalhe,
                equipamento.dta_Emprestimo_Inicio,
                equipamento.dta_Emprestimo_Final,
                newStatus,
                equipamento.profissional_Hd
            );
            alert('sucesso');
            window.location.reload();
        }
        catch (error) {
            alert('Erro');
            console.log('erro ao tentar adicionar', error);
        }
    }

    return (
        <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50">
            <div className="w-lg px-8 py-6 rounded-2xl bg-neutral-900 border-l-3 border-blue-400">
                <h1 className="mb-4 text-blue-400 text-2xl">Editar Equipamento</h1>
                <form onSubmit={editEquipamento} className="space-y-1">
                    <div className="flex space-x-2">
                        <label htmlFor="" className="font-bold">Id:</label>
                        <p>{equipamento?.id}</p>
                    </div>
                    <div className="flex space-x-2">
                        <label htmlFor="" className="font-bold">Idf_Patrimonio:</label>
                        <p>{equipamento?.idf_Patrimonio}</p>
                    </div>
                    <div>
                        <label htmlFor="" className="font-bold">Modelo_Equipamento:</label>
                        <input
                            value={newModelo}
                            onChange={(e) => setNewModelo(e.target.value)}
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg"
                            placeholder="Digite"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="font-bold">Tipo_Equipamento:</label>
                        <input
                            value={newTipo}
                            onChange={(e) => setNewTipo(e.target.value)}
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg"
                            placeholder="Digite"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="font-bold">Detalhe_Equipamento</label>
                        <textarea
                            value={newDetalhe}
                            onChange={(e) => setNewDetalhe(e.target.value)}
                            className="max-w-full min-w-full min-h-20 py-2 px-4 bg-black rounded-lg"
                            placeholder="Digite"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="font-bold">Status:</label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(Number(e.target.value))}
                            className="w-full p-3 bg-black rounded-lg outline-0"
                        >
                            <option value={1}>Disponível</option>
                            <option value={2}>Emprestimo</option>
                            <option value={3}>Danificado</option>
                            <option value={4}>Concerto</option>
                        </select>
                    </div>
                    <button className="w-full p-2 mt-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-bold cursor-pointer">Confirmar</button>
                </form>
            </div>
        </div>
    )
}