"use client"
import { Equipamentos } from "@/context/DataInterface";
import { useState } from "react";

interface DetailsProps {
  equipamento: Equipamentos | null;
}

const status = [
    "N/A",
    "Disponivel",
    "Emprestado",
    "Danificado",
    "Concerto",
]

export default function Details({ equipamento }: DetailsProps) {
    if(!equipamento) return;
    return (
        <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50 overflow-auto">
            <div className="h-screen">
                <div className="w-lg px-8 py-6 my-10 rounded-2xl bg-neutral-900 border-l-3 border-emerald-500">
                <h1 className="mb-4 text-emerald-500 text-2xl flex">Detalhes do Equipamento</h1>
                <img src={equipamento.img_Equipamento} className="w-full"/>
                <div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Id:</h1>
                        <p>{equipamento?.id}</p>
                    </div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Idf_Patrimonio:</h1>
                        <p>{equipamento?.idf_Patrimonio}</p>
                    </div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Modelo:</h1>
                        <p>{equipamento?.modelo_Equipamento}</p>
                    </div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Tipo:</h1>
                        <p>{equipamento?.tpo_Equipamento}</p>
                    </div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Status Equipamento:</h1>
                        <p>{status[equipamento.stt_Equipamento]}</p>
                    </div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Inicio do Emprestimo:</h1>
                        <p>{equipamento?.dta_Emprestimo_Inicio}</p>
                    </div>
                    <div className="py-2 border-b border-y-neutral-700 flex">
                        <h1 className="w-1/2 mr-4 font-bold">Final do Emprestimo:</h1>
                        <p>{equipamento?.dta_Emprestimo_Final}</p>
                    </div>
                    <div className="py-2 flex flex-col">
                        <h1 className="w-1/2 mr-4 font-bold">Detalhes:</h1>
                        <p className="px-2">{equipamento?.dtl_Equipamento}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}