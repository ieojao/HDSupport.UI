"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page(){
    const router = useRouter();

    return(
        <div className="w-11/12 px-10 py-4 bg-neutral-900 border-t-3 border-green-400 rounded-2xl">
            <h1 className="w-full text-2xl font-bold text-emerald-400">History</h1>
            <div>
                <div className="p-4 my-2 bg-slate-950 rounded-xl">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi commodi, nihil ut aperiam </p>
            </div>
            <div className="p-4 my-2 bg-slate-950 rounded-xl">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi commodi, nihil ut aperiam </p>
            </div>
            <div className="p-4 my-2 bg-slate-950 rounded-xl">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi commodi, nihil ut aperiam </p>
            </div>
            </div>
        </div>
    )
}