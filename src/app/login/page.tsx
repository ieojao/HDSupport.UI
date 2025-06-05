"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/usuarios/formlogin";

export default function Page(){
    return(
        <div className="w-full flex justify-center items-center">
            <Login/>
        </div>
    )
}