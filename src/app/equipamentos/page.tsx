"use client"
import Header from "@/components/layout/header";
import Table from "@/components/equipamentos/table";
import BarCharts from "@/components/dashboard/barcharts";
import CircleCharts from "@/components/dashboard/circlecharts";

export default function Page(){
    return(
        <div className="mx-5 my-10 flex flex-col">
            <div className="flex space-x-2">
                 <BarCharts />
                 <CircleCharts />
            </div>
            <Table/>
        </div>
    )
}