"use client"
import { Equipamentos } from "@/context/DataInterface";
import { useState } from "react";

interface DetailsProps {
    equipamento: Equipamentos | null;
}

export default function Page({ equipamento }: DetailsProps) {
    return (
        <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50">
            <div className="w-lg px-8 py-6 rounded-2xl bg-neutral-900 border-l-3 border-blue-400">
                <h1 className="mb-4 text-blue-400 text-2xl">Editar Equipamento</h1>
                <form action="" className="space-y-1">
                    <div className="flex space-x-2">
                        <label htmlFor="">Id:</label>
                        <p>{equipamento?.id}</p>
                    </div>
                    <div className="flex space-x-2">
                        <label htmlFor="">Idf_Patrimonio:</label>
                        <p>{equipamento?.idf_Patrimonio}</p>
                    </div>
                    <div>
                        <label htmlFor="">Modelo_Equipamento:</label>
                        <input
                            value={equipamento?.modelo_Equipamento}
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg"
                            placeholder="Digite"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Tipo_Equipamento:</label>
                        <input
                            value={equipamento?.tpo_Equipamento}
                            type="text"
                            className="w-full py-2 px-4 bg-black rounded-lg"
                            placeholder="Digite"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Detalhe_Equipamento</label>
                        <textarea
                            value={equipamento?.dtl_Equipamento}
                            className="max-w-full min-w-full min-h-20 py-2 px-4 bg-black rounded-lg"
                            placeholder="Digite"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Status:</label>
                        <select>
                            <option value="">Ocupado</option>
                            <option value="">Concerto</option>
                            <option value="">Estragado</option>
                            <option value="">Disponivel</option>
                        </select>
                    </div>
                    <button className="w-full p-2 mt-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-bold cursor-pointer">Confirmar</button>
                </form>
            </div>
        </div>
    )
}