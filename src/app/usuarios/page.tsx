"use client"
import Header from "@/components/layout/header";
import UserTable from "@/components/usuarios/UserTable";

export default function Page(){
    return(
        <div className="flex min-h-screen w-full">
            <Header/>
            <div className="flex-1 flex flex-col w-full">
                <UserTable/>
            </div>
        </div>
    )
}