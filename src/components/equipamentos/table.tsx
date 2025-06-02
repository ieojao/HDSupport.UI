"use client"
import { Edit, Info, Trash } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Page() {
    const router = useRouter();

    return (
        <div className="w-full mx-5 my-10">
            <table className="w-5xl p-4 bg-neutral-900 rounded-2xl overflow-hidden">
                <thead className="bg-slate-800 border-b-3 border-slate-700">
                    <th className="py-2">Id</th>
                    <th className="py-2">Idf_Patrimonio</th>
                    <th className="py-2">Modelo</th>
                    <th className="py-2">Tipo</th>
                    <th className="py-2">Detalhes</th>
                    <th className="py-2">Inicio</th>
                    <th className="py-2">Final</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Ações</th>
                </thead>
                <tbody className="">
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className={`py-2`}>dados</td>
                    <td className="w-3{`py-2`}space-x-2">
                        <button><Info/></button>
                        <button><Edit/></button>
                        <button><Trash/></button>
                    </td>
                </tbody>
            </table>
        </div>
    )
}