"use client"
import Header from "@/components/layout/header";
import CardChamados from "@/components/dashboard/cardschamados";
import CircleCharts from "@/components/dashboard/circlecharts";
import LineCharts from "@/components/dashboard/linecharts";
import History from "@/components/dashboard/history";
import { useEffect, useState } from "react";
import { ChamadosService } from "@/service/ApiConnection";

export default function Home() {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    const [chamados, setChamados] = useState([
        {
            title: 'Concluidos',
            dados: 0,
        },
        {
            title: 'Abertos',
            dados: 0,
        },
        {
            title: 'Pendentes',
            dados: 0,
        },
    ]);

    useEffect(() => {
        ChamadosService.DadosChamadosDashboard(token)
            .then((response) => {
                console.log(response.data);
                setChamados([
                    {
                        title: 'Concluidos',
                        dados: response.data[2] || 0,
                    },
                    {
                        title: 'Abertos',
                        dados: response.data[0] || 0,
                    },
                    {
                        title: 'Pendentes',
                        dados: response.data[1] || 0,
                    },
                ]);
            })
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-start">
            <Header />
            <div className="w-full my-8 flex flex-col justify-center items-center">
                <div className="w-full flex justify-center items-center space-x-3">
                    {chamados.map((item) => (
                        <div className="flex justify-center">
                            <CardChamados key={item.title} title={item.title} dados={item.dados} />
                        </div>
                    ))}
                </div>
                <div className="m-4 mx-auto space-x-2 space-y-2 flex flex-wrap">
                    <LineCharts />
                    <CircleCharts />
                </div>
                <History />
            </div>
        </div>
    )
}