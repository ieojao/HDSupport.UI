"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Register from "@/components/usuarios/formsignup";

export default function Page(){
    return(
        <div className="w-full flex justify-center items-center">
            <Register/>
        </div>
    )
}