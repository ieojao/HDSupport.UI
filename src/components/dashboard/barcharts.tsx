"use client";

import { EquipamentosSevice } from "@/service/ApiConnection";
import { useEffect, useState } from "react";

export default function Page() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        EquipamentosSevice.Graficobarras(token)
            .then((response) => {
                console.log("Dados do gráfico de barras", response.data);
                setDados(response.data);
            })
            .catch((error) => {
                console.log("Erro ao listar os dados do gráfico de barras", error);
            });
    }, [])

    useEffect(() => {
        const loadGoogleCharts = () => {
            if (document.getElementById("google-charts-script")) {
                if (window.google) {
                    window.google.charts.load("current", { packages: ["corechart"] });
                    window.google.charts.setOnLoadCallback(drawChart);
                }
                return;
            }

            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/charts/loader.js";
            script.async = true;
            script.id = "google-charts-script";
            script.onload = () => {
                if (window.google) {
                    window.google.charts.load("current", { packages: ["corechart"] });
                    window.google.charts.setOnLoadCallback(drawChart);
                }
            };
            script.onerror = () => {
                console.error("Erro ao carregar script do Google Charts.");
            };
            document.head.appendChild(script);
        };

        const drawChart = () => {
            if (!window.google || !window.google.visualization) {
                console.error("Google Visualization API não carregada.");
                return;
            }

            const chartData = window.google.visualization.arrayToDataTable([
                ['Status', 'Ocupado', 'Danificado', 'Em Reparo', 'Disponivel', { role: 'annotation' }],
                ['Desktop', dados[0]?.[1] || 0, dados[0]?.[2] || 0, dados[0]?.[3] || 0, dados[0]?.[0] || 0, ''],
                ['Notebook', dados[1]?.[1] || 0, dados[1]?.[2] || 0, dados[1]?.[3] || 0, dados[1]?.[0] || 0, ''],
                ['Monitor', dados[2]?.[1] || 0, dados[2]?.[2] || 0, dados[2]?.[3] || 0, dados[2]?.[0] || 0, ''],
                ['Headset', dados[3]?.[1] || 0, dados[3]?.[2] || 0, dados[3]?.[3] || 0, dados[3]?.[0] || 0, ''],
                ['Webcam', dados[4]?.[1] || 0, dados[4]?.[2] || 0, dados[4]?.[3] || 0, dados[4]?.[0] || 0, ''],
                ['Teclado', dados[5]?.[1] || 0, dados[5]?.[2] || 0, dados[5]?.[3] || 0, dados[5]?.[0] || 0, ''],
                ['Mouse', dados[6]?.[1] || 0, dados[6]?.[2] || 0, dados[6]?.[3] || 0, dados[6]?.[0] || 0, '']
            ]);

            const chartNull = window.google.visualization.arrayToDataTable([
                ['Status', 'Ocupado', 'Danificado', 'Em Reparo', 'Disponivel', { role: 'annotation' }],
                ['Desktop', 0, 0, 0, 0, ''],
                ['Notebook', 0, 0, 0, 0, ''],
                ['Monitor', 0, 0, 0, 0, ''],
                ['Headset', 0, 0, 0, 0, ''],
                ['Webcam', 0, 0, 0, 0, ''],
                ['Teclado', 0, 0, 0, 0, ''],
                ['Mouse', 0, 0, 0, 0, '']
            ]);

            const options = {
                title: "Gráfico de Colunas Empilhadas - Status dos Equipamentos",
                isStacked: true,
                backgroundColor: "#171717",
                legend: { position: "top", maxLines: 3, textStyle: { color: "#fff" } },
                bar: { groupWidth: "75%" },
                titleTextStyle: { color: "#60a5fa", fontSize: 20 },
                hAxis: {
                    title: "Equipamentos",
                    textStyle: { color: "#fff" },
                    titleTextStyle: { color: "#ffffff" },
                },
                vAxis: {
                    title: "Quantidade",
                    textStyle: { color: "#fff" },
                    titleTextStyle: { color: "#ffffff" },
                },
                chartArea: { left: 80, top: 50, width: "70%", height: "70%" },
                animation: { startup: true, duration: 1000, easing: "out" },
            };

            const chartContainer = document.getElementById("barchart_metals");
            if (chartContainer) {
                const chart = new window.google.visualization.ColumnChart(chartContainer);

                if (!dados || !dados.length) {
                    chart.draw(chartNull, options);
                } else {
                    chart.draw(chartData, options);
                }
            } else {
                console.error("Elemento #barchart_metals não encontrado.");
            }
        };
        loadGoogleCharts();
    }, [dados]);


    return (
        <div className="w-1/2 h-80 bg-neutral-900 border-t-3 border-sky-400 rounded-2xl overflow-hidden p-2">
            <div id="barchart_metals" className="w-full h-full"></div>
        </div>
    );
}
