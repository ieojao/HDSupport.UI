"use client"
import { Users } from "lucide-react";
import { useState } from "react";

export default function Page() {
    return (
        <div className="w-full flex flex-wrap justify-center gap-4">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="flex-grow sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1rem)] bg-neutral-900 border-t-4 border-purple-600 rounded-2xl items-center justify-center overflow-hidden"
                >
                    <div className="w-full p-3 bg-slate-700">
                        <h1 className="flex"><Users className="mr-2"/>Escolinha de TI</h1>
                    </div>
                    <div className="p-6 w-full">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi tenetur voluptas suscipit tempore soluta ex dicta ipsa amet. Porro, sapiente. Amet voluptatum necessitatibus saepe sapiente laborum quaerat nulla corporis?</p>
                        <p className="p-1 bg-green-500/30">Status</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
