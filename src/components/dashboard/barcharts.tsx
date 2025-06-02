"use client";

import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const loadGoogleCharts = () => {
            // Verifica se o script já foi adicionado para evitar duplicidade
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
            script.id = "google-charts-script"; // Adiciona um ID para verificação
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

            const data = window.google.visualization.arrayToDataTable([
                ['Element', 'Density', { role: 'style' }],
                ['Copper', 8.94, '#00BCD4'], 
                ['Silver', 10.49, '#00ACC1'],
                ['Gold', 19.30, '#00838F'],      
                ['Platinum', 21.45, '#006064'], 
            ]);

            const options = {
                title: "Density of Precious Metals (g/cm³)", 
                width: "100%",
                height: 300,
                backgroundColor: "#171717",
                bar: { groupWidth: "85%" },
                legend: { position: "none" }, 
                titleTextStyle: { color: "#60a5fa", fontSize: 20 },
                annotations: {
                    textStyle: {
                        fontSize: 12,
                        color: "#ffffff",
                        auraColor: "none",
                    },
                },
                hAxis: {
                    title: 'Density (g/cm³)',
                    minValue: 0,
                    textStyle: { color: "#ffffff" },
                    titleTextStyle: { color: "#ffffff" },
                },
                vAxis: {
                    title: 'Element',
                    textStyle: { color: "#ffffff" },
                    titleTextStyle: { color: "#ffffff" },
                },
                chartArea: { left: 80, top: 50, width: "70%", height: "70%" },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: "out",
                },
            };

            const chartContainer = document.getElementById("barchart_metals");
            if (chartContainer) {
                const chart = new window.google.visualization.BarChart(chartContainer);
                chart.draw(data, options);
            } else {
                console.error("Elemento #barchart_metals não encontrado.");
            }
        };

        loadGoogleCharts();
    }, []);

    return (
        <div className="w-full bg-neutral-900 border-t-4 border-sky-400 rounded-2xl overflow-hidden p-2">
            <div id="barchart_metals" className="w-full h-full"></div>
        </div>
    );
}