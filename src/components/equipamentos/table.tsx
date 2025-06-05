"use client"
import { Equipamentos } from "@/context/DataInterface";
import { EquipamentosSevice } from "@/service/ApiConnection";
import { Edit, Info, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Add from "@/components/equipamentos/add";
import Details from "@/components/equipamentos/detail";
import Editar from "@/components/equipamentos/edit";
import Remove from "@/components/equipamentos/delete";

export default function Page() {
    const router = useRouter();
    const [equipamentos, setEquipamentos] = useState<Equipamentos[]>([])
    const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamentos | null>(null)
    const [details, setDetails] = useState(false);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { return; }
        EquipamentosSevice.ListarEquipamentos(token)
            .then((response) => {
                console.log(response.data);
                setEquipamentos(response.data);
            })
            .catch((error) => {
                console.log("erro ao tentar listar os equipamentos", error);
            })
    }, [])

    const detailEquipamento = (equipamento: Equipamentos) => {
        setDetails(true);
        setSelectedEquipamento(equipamento);
    }
    const editEquipamento = (equipamento: Equipamentos) => {
        setEdit(true);
        setSelectedEquipamento(equipamento);
    }
    const removeEquipamento = (equipamento: Equipamentos) => {
        setRemove(true);
        setSelectedEquipamento(equipamento);
    }

    return (
        <div className="w-full mx-5 my-10 flex justify-center items-start">
            <div className="w-10/12  min-w-4xl">
                <div className="w-full py-3 px-5 bg-neutral-800 flex justify-between rounded-t-2xl">
                    <div className="w-full pt-3 px-5 bg-neutral-800 flex justify-between">
                        <input type="text" className="min-w-md py-2 px-4 bg-neutral-900 rounded-lg outline-0" placeholder="Pesquisar" />
                        <div className="flex space-x-5">
                            <div className="flex justify-center items-center">
                                <select name="" id="" className="bg-neutral-800 ">
                                    <option value="">Todos</option>
                                    <option value="">Notebook</option>
                                    <option value="">Desktop</option>
                                    <option value="">headset</option>
                                    <option value="">Mouse</option>
                                </select>
                            </div>
                            <div className="flex justify-center items-center">
                                <select name="" id="" className="bg-neutral-800 ">
                                    <option value="">Todos</option>
                                    <option value="" className="text-red-400">Indisponivel</option>
                                    <option value="" className="text-yellow-500">Concerto</option>
                                    <option value="" className="text-blue-500">Defeito</option>
                                    <option value="" className="text-emerald-500">Disponivel</option>
                                </select>
                            </div>
                            <button onClick={() => setAdd(true)} className="py-2 px-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg font-bold cursor-pointer">Adicionar</button>
                        </div>
                    </div>
                </div>
                <table className="w-full p-4 bg-neutral-900 rounded-b-2xl overflow-hidden">
                    <thead className="bg-neutral-800 border-b-3 border-slate-700">
                        <tr>
                            <th className="min-w-16 py-2">Id</th>
                            <th className="py-2">Idf_Patrimonio</th>
                            <th className="py-2">Modelo</th>
                            <th className="py-2">Tipo</th>
                            <th className="py-2">Detalhes</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipamentos.length !== 0 ? (
                            equipamentos.map((equip, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-3">{equip.id}</td>
                                    <td className="py-2 px-3">{equip.idf_Patrimonio}</td>
                                    <td className="py-2 px-3">{equip.modelo_Equipamento}</td>
                                    <td className="py-2 px-3">{equip.tpo_Equipamento}</td>
                                    <td className="py-2 px-3">{equip.dtl_Equipamento}</td>
                                    <td className="py-2 px-3">{equip.stt_Equipamento}</td>
                                    <td className="w-30 mx-auto py-2 px-3 flex justify-around space-x-2">
                                        <button onClick={() => detailEquipamento(equip)} className="text-emerald-400 cursor-pointer"><Info /></button>
                                        <button onClick={() => editEquipamento(equip)} className="text-blue-400 cursor-pointer"><Edit /></button>
                                        <button onClick={() => removeEquipamento(equip)} className="text-red-400 cursor-pointer"><Trash /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-4 text-red-400 text-center">Nenhum Equipamento Encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {add && (
                <div>
                    <Add />
                    <button onClick={() => setAdd(false)} className="cursor-pointer fixed top-10 right-10 z-60"><X className="animate-pulse" size={40} /></button>
                </div>
            )}

            {details && (
                <div>
                    <Details equipamento={selectedEquipamento} />
                    <button onClick={() => setDetails(false)} className="cursor-pointer fixed top-10 right-10 z-60"><X className="animate-pulse" size={40} /></button>
                </div>
            )}

            {edit && (
                <div>
                    <Editar equipamento={selectedEquipamento} />
                    <button onClick={() => setEdit(false)} className="cursor-pointer fixed top-10 right-10 z-60"><X className="animate-pulse" size={40} /></button>
                </div>
            )}

            {remove && (
                <div>
                    <Remove equipamento={selectedEquipamento} setRemove={setRemove} />
                    <button onClick={() => setRemove(false)} className="cursor-pointer fixed top-10 right-10 z-60"><X className="animate-pulse" size={40} /></button>
                </div>
            )}
        </div>
    )
}