"use client"
import { Chamados } from "@/context/DataInterface";
import { ChamadosService } from "@/service/ApiConnection";
import { AlertCircle, Check, Clock, Clock1, MonitorCog, Speech } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/*const history = [
    "Lorem ipsum dolor sit Animi commodi, nihil ut aperiam",
    "Animi commodi, nihil ut aperiam",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Animi commodi, nihil ut aperiam consectetur adipisicing elit.",
]*/

export default function Page() {
    const router = useRouter();
    const [history, setHistory] = useState<Chamados[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        ChamadosService.TodosChamados(token)
            .then((response) => {
                console.log(response.data);
                setHistory(response.data);
            })
            .catch((error) => {
                console.log("erro ao listar os chamados concluidos", error);
            })
    }, [])

    return (
        <div className="w-full px-10 py-4 mb-20 bg-neutral-900 border-t-3 border-green-400 rounded-2xl">
            <h1 className="w-full text-2xl font-bold text-emerald-400">History</h1>
            <div>
                {history.map((chamado) => (
                    <div key={chamado.id} className={`p-4 my-2 bg-neutral-950 rounded-lg border-l-4 ${chamado.tipo_Conversa == 2 ? "border-blue-500" : "border-green-400"}  flex justify-between items-center`}>
                        <div className="flex">
                            {chamado.tipo_Conversa == 2 && (//HelpDesk
                                <MonitorCog size={50} className="p-2 mr-3 bg-blue-600/10 text-blue-600 border border-blue-700 rounded-lg" />
                            )}
                            {chamado.tipo_Conversa == 3 && (//Atendimento
                                <Speech size={50} className="p-2 mr-3 bg-emerald-600/10 text-emerald-600 border border-emerald-700 rounded-lg" />
                            )}
                            <div>
                                <p>Chamado iniciado por <b>{chamado.cliente.nme_Usuario}</b></p>
                                <p>{new Date(chamado.dta_Inicio_Conversa).toLocaleString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}</p>
                            </div>
                        </div>
                        <div>
                            {chamado.stt_Conversa == 2 && (
                                <div className="flex flex-col items-end">
                                    <div className="px-2 py-1 bg-emerald-600/30 border border-emerald-800 rounded-full text-emerald-500 flex"><Check className="mr-2" />Concluido</div>
                                    <p>{new Date(chamado.dta_Conclusao_Conversa).toLocaleString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</p>
                                </div>
                            )}
                            {chamado.stt_Conversa == 1 && (
                                <div className="flex flex-col items-end">
                                    <div className="px-2 py-1 bg-blue-600/30 border border-blue-800 rounded-full text-blue-500 flex"><Clock className="mr-2" />Em Andamento</div>
                                    <p>{new Date(chamado.dta_Conclusao_Conversa).toLocaleString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</p>
                                </div>
                            )}
                            {chamado.stt_Conversa == 3 && (
                                <div className="flex flex-col items-end">
                                    <div className="px-2 py-1 bg-amber-600/30 border border-amber-800 rounded-full text-amber-500 flex"><AlertCircle className="mr-2" />Pendente</div>
                                    <p>{new Date(chamado.dta_Conclusao_Conversa).toLocaleString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}