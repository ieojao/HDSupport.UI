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

const status = [
    "N/A",
    "Disponivel",
    "Emprestado",
    "Danificado",
    "Concerto",
]

export default function Page() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchTerm, setSearchTerm] = useState("");
    const [filterTipo, setFilterTipo] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filteredEquipamentos, setFilteredEquipamentos] = useState<Equipamentos[]>([]);

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

    useEffect(() => {
        let tempEquipamentos = equipamentos;

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            tempEquipamentos = tempEquipamentos.filter(equip =>
                equip.idf_Patrimonio.toString().toLowerCase().includes(lowerSearch) ||
                equip.modelo_Equipamento.toLowerCase().includes(lowerSearch) ||
                (equip.dtl_Equipamento && equip.dtl_Equipamento.toLowerCase().includes(lowerSearch))
            );
        }

        if (filterTipo) {
            tempEquipamentos = tempEquipamentos.filter(equip =>
                equip.tpo_Equipamento.toString().toLowerCase() === filterTipo.toLowerCase()
            );
        }

        if (filterStatus) {
            tempEquipamentos = tempEquipamentos.filter(equip =>
                equip.stt_Equipamento.toString().toLowerCase() === filterStatus.toLowerCase()
            );
        }

        setFilteredEquipamentos(tempEquipamentos);
        setCurrentPage(1);
    }, [searchTerm, filterTipo, filterStatus, equipamentos]);


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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEquipamentos = filteredEquipamentos.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="w-full my-5 flex justify-center items-start">
            <div className="w-full  min-w-4xl">
                <div className="w-full py-3 px-5 bg-neutral-800 flex justify-between rounded-t-2xl">
                    <div className="w-full pt-3 px-5 bg-neutral-800 flex justify-between">
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            className="min-w-md py-2 px-4 bg-neutral-900 rounded-lg outline-0"
                            placeholder="Pesquisar"
                        />
                        <div className="flex space-x-5">
                            <select
                                value={filterTipo}
                                onChange={(e) => setFilterTipo(e.target.value)}
                                className="bg-neutral-800 py-2 px-3 rounded outline-0"
                            >
                                <option value="">Todos Tipos</option>
                                <option value="Notebook">Notebook</option>
                                <option value="Desktop">Desktop</option>
                                <option value="Headset">Headset</option>
                                <option value="Mouse">Mouse</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-neutral-800 py-2 px-3 rounded outline-0"
                            >
                                <option value="">Todos Status</option>
                                <option value={1}>Disponivel</option>
                                <option value={2}>Emprestimo</option>
                                <option value={3}>Danificado</option>
                                <option value={4}>Concerto</option>
                            </select>
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
                        {currentEquipamentos.length !== 0 ? (
                            currentEquipamentos.map((equip, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-3">{equip.id}</td>
                                    <td className="py-2 px-3">{equip.idf_Patrimonio}</td>
                                    <td className="py-2 px-3">
                                        {equip.modelo_Equipamento && equip.modelo_Equipamento.length > 20
                                            ? equip.modelo_Equipamento.slice(0, 20) + "..."
                                            : equip.modelo_Equipamento}
                                    </td>
                                    <td className="py-2 px-3">{equip.tpo_Equipamento}</td>
                                    <td className="py-2 px-3">
                                        {equip.dtl_Equipamento && equip.dtl_Equipamento.length > 20
                                            ? equip.dtl_Equipamento.slice(0, 20) + "..."
                                            : equip.dtl_Equipamento}
                                    </td>
                                    <td className="py-2 px-3">{status[equip.stt_Equipamento]}</td>
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
                {filteredEquipamentos.length !== 0 && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-blue-500 rounded cursor-pointer disabled:bg-neutral-800 disabled:cursor-default"
                        >
                            Anterior
                        </button>

                        {Array.from({ length: Math.ceil(filteredEquipamentos.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-3 py-1 rounded cursor-pointer ${currentPage === number
                                    ? "bg-blue-500 text-white"
                                    : "bg-neutral-800 hover:bg-blue-500 text-white"
                                    }`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => (indexOfLastItem < filteredEquipamentos.length ? prev + 1 : prev))}
                            disabled={indexOfLastItem >= filteredEquipamentos.length}
                            className="px-3 py-1 bg-blue-500 rounded cursor-pointer disabled:bg-neutral-800 disabled:cursor-default"
                        >
                            Próxima
                        </button>
                    </div>
                )}
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