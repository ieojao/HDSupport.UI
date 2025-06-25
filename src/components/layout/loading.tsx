"use client"
import { Dot, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Page() {
    return (
        <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0 z-50">
            <div className="space-y-3 flex flex-col justify-center items-center">
                <div className=" w-20 h-30 rounded-xl border-3 border-blue-400 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <Dot />
                        <Dot />
                    </div>
                    <div className="relative flex justify-center items-center">
                        <div className="w-14 h-14 rounded-full border-4 border-white flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full border-4 border-black/0 border-t-blue-400 flex justify-center items-center animate-spin">
                                <div className="w-3 h-3 rounded-full border-4"></div>
                            </div>
                        </div>
                        <div className="w-0 h-0 rounded-b-full absolute right-4 -bottom-1 border-l-5 border-r-5 border-b-32 border-l-transparent border-r-transparent border-b-blue-500 triangle-animation"
                        ></div>
                    </div>
                    <div className="flex justify-between">
                        <Dot />
                        <Dot />
                    </div>
                </div>
                <p className="font-bold flex items-end">
                    Reparando
                    <span className="flex items-end h-6 space-x-1">
                        <span className="animate-[bounce_1s_infinite_100ms]">.</span>
                        <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                        <span className="animate-[bounce_1s_infinite_300ms]">.</span>
                    </span>
                </p>
            </div>
        </div>
    )
}