"use client"
import { Command, LayoutDashboard, Table2, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen p-2">
            <div className={`${open === true ? "w-15" : "w-72"} h-full pt-1 bg-neutral-900 rounded-2xl overflow-hidden transition-all ease-in-out duration-300`}>
                <h1 className="w-full my-5 flex justify-center items-center text-3xl"><b className={`mr-1.5 text-blue-400 ${open === true ? "mr-0 mx-auto" : ""}`}>HD</b> <p className={`${open === true ? "hidden" : ""}`}>Support</p></h1>
                <button className={`py-4 ${open === true ? "px-4.5 space-x-10" : "px-10"} flex space-x-2 text-slate-500`}>
                    <LayoutDashboard/>
                    <p className={`${open === true ? "hidden" : ""}`}>DashBoard</p>
                </button>
                <button className={`py-4 ${open === true ? "px-4.5 space-x-10" : "px-10"} flex space-x-2 text-slate-500`}>
                    <Command/>
                    <p className={`${open === true ? "hidden" : ""}`}>Local 1</p>
                </button>
                <button className={`py-4 ${open === true ? "px-4.5 space-x-10" : "px-10"} flex space-x-2 text-slate-500`}>
                    <Table2/>
                    <p className={`${open === true ? "hidden" : ""}`}>Local 2</p>
                </button>
                <button className={`py-4 ${open === true ? "px-4.5 space-x-10" : "px-10"} flex space-x-2 text-slate-500`}>
                    <Ticket/>
                    <p className={`${open === true ? "hidden" : ""}`}>Local 3</p>
                </button>
            </div>
        </div>
    )
}