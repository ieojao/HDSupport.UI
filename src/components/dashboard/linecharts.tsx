"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

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
        ["Year", "Sales", "Expenses"],
        ["2013", Math.floor(Math.random() * 2000), Math.floor(Math.random() * 1000)],
        ["2014", Math.floor(Math.random() * 2000), Math.floor(Math.random() * 1000)],
        ["2015", Math.floor(Math.random() * 2000), Math.floor(Math.random() * 1000)],
        ["2016", Math.floor(Math.random() * 2000), Math.floor(Math.random() * 1000)],
      ]);

      const options = {
        title: "Grafico de Linhas",
        subtitle: "Sales and Expenses",
        titleTextStyle: { fontSize: 24, color: "#2563eb" },
        subtitleTextStyle: { fontSize: 16, color: "#555" },
        hAxis: {
          title: "Year",
          titleTextStyle: { color: "#333" },
          textStyle: { color: "#202020" },
          gridlines: { color: "transparent" },
        },
        vAxis: {
          title: "Amount",
          minValue: 0,
          maxValue: 2000,
          gridlines: { count: 8, color: "#242424" },
          textStyle: { color: "#606060" },
        },
        colors: ["#4f46e5", "#06b6d4"],
        legend: { position: "bottom", textStyle: { color: "#333", fontSize: 14 } },
        backgroundColor: "transparent",
        chartArea: { width: "70%", height: "60%" },
        areaOpacity: 0.3,
        animation: { startup: true, duration: 1000, easing: "out" },
        pointSize: 4,
        lineWidth: 2,
        isStacked: false,
      };

      const chart = new window.google.visualization.AreaChart(
        document.getElementById("chart_div")
      );
      chart.draw(data, options);
    };

    loadGoogleCharts();
  }, []);

  return (
    <div className="w-1/2 h-64 border-t-3 border-blue-400 rounded-2xl overflow-hidden">
      <div id="chart_div" className="w-full h-full bg-neutral-900"></div>
    </div>
  );
}
