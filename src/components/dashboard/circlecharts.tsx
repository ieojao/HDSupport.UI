"use client"
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const loadGoogleCharts = () => {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/charts/loader.js";
            script.async = true;
            script.onload = () => {
                if (window.google) {
                    window.google.charts.load("current", { packages: ["corechart"] });
                    window.google.charts.setOnLoadCallback(drawChart);
                }
            };
            document.head.appendChild(script);
        };

        const drawChart = () => {
            const data = window.google.visualization.arrayToDataTable([
                ["Task", "Hours per Day"],
                ["Work", 11],
                ["Eat", 2],
                ["Commute", 2],
                ["Watch TV", 2],
            ]);

            const options = {
                title: "My Daily Activities",
                is3D: true,
                backgroundColor: "#171717",
                pieHole: 0,
                pieSliceText: "value",
                legend: { position: "right", textStyle: { color: "#333", fontSize: 14 } },
                titleTextStyle: { color: "#2563eb", fontSize: 22 },
                slices: {
                    0: { color: "#1e40af" },
                    1: { color: "#2563eb" },
                    2: { color: "#60a5fa" },
                    3: { color: "#bfdbfe" },
                },
                chartArea: { width: "80%", height: "60%" },
                tooltip: { text: "percentage" },
                animation: { startup: true, duration: 1000, easing: "out" },
            };

            const chart = new window.google.visualization.PieChart(
                document.getElementById("piechart_3d")
            );
            chart.draw(data, options);
        };

        loadGoogleCharts();
    }, []);
    return (
        <div className="w-96 h-64 bg-neutral-900 border-t-3 border-sky-400 rounded-2xl overflow-hidden">
            <div id="piechart_3d" className="w-full h-full"></div>
        </div>
    )
}