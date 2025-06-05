"use client"
import { Equipamentos } from "@/context/DataInterface";
import { EquipamentosSevice } from "@/service/ApiConnection";
import { useEffect, useState } from "react";

interface DetailsProps {
    equipamento: Equipamentos | null;
    setRemove: (value: boolean) => void;
}

export default function Details({ equipamento, setRemove }: DetailsProps) {

    const deleteEquipamento = () => {
        const token = localStorage.getItem('token');
        if (!token || !equipamento || equipamento.id === undefined) {
            alert("Dados inválidos para exclusão!");
            return;
        }

        EquipamentosSevice.ExcluirEquipamento(token, equipamento.id)
            .then((response) => {
                alert(`Sucesso ao Deletar: ${response.data}`);
                window.location.reload();
            })
            .catch((error) => {
                alert(`Erro ao Deletar: ${error}`);
            });
    };


    return (
        <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50">
            <div className="w-lg px-8 py-6 rounded-2xl bg-neutral-900 border-l-3 border-red-400">
                <h1 className="mb-4 text-red-400 text-2xl">Excluir Equipamento</h1>
                <div className="w-full mt-10 flex justify-around items-center">
                    <button onClick={() => setRemove(false)} className="py-4 px-10 bg-red-600 rounded-lg font-bold cursor-pointer">Cancelar</button>
                    <button onClick={deleteEquipamento} className="py-4 px-10 bg-sky-600 rounded-lg font-bold cursor-pointer">Confirmar</button>
                </div>
            </div>
        </div>
    )
}