"use client"
import Header from "@/components/layout/header";
import CardChamados from "@/components/dashboard/cardschamados";
import CircleCharts from "@/components/dashboard/circlecharts";
import LineCharts from "@/components/dashboard/linecharts";
import BarCharts from "@/components/dashboard/barcharts";
import History from "@/components/dashboard/history";
import { useEffect, useState } from "react";
import { ChamadosService } from "@/service/ApiConnection";
import Loading from "@/components/layout/loading";

export default function Home() {
    const [loading, setLoading] = useState(false);
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
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado no localStorage');
            setLoading(false);
            return;
        }

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
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full h-screen flex items-start overflow-hidden">
            <Header />
            <div className="w-full h-screen flex flex-col items-center overflow-auto space-y-7">
                <div className="flex w-10/12 pt-20 space-x-3">
                    <div className="flex flex-col justify-center items-center space-y-3">
                        {chamados.map((item) => (
                            <div className="flex justify-center">
                                <CardChamados key={item.title} title={item.title} dados={item.dados} />
                            </div>
                        ))}
                    </div>
                    <BarCharts />
                </div>
                <div className="w-10/12 space-x-2 space-y-2 flex">
                    <LineCharts />
                    <CircleCharts />
                </div>
                <History />
            </div>
            {loading && (
                <Loading />
            )}
        </div>
    )
}