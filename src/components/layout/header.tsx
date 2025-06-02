"use client"
import { ChevronsLeft, ChevronsRight, Command, DoorOpen, Laptop, LayoutDashboard, Package, Table2, Ticket, User, UserCircle, UsersIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/components/layout/loading";
import path from "path";
import { UsuarioService } from "@/service/ApiConnection";

export default function Page() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        UsuarioService.BuscarPorTokenJWT(token)
            .then((response) => {
                console.log(response.data);
                setUsuario(response.data);
            })
    }, [])

    const navigationDashBoard = () => {
        if(pathname == "/"){
            return;
        }
        router.push("/")
        setLoading(true)
    }
    const navigationChamados = () => {
        if(pathname == "/chamados"){
            return;
        }
        router.push("/chamados")
        setLoading(true)
    }
    const navigationEmprestimos = () => {
        if(pathname == "/emprestimos"){
            return;
        }
        router.push("/emprestimos")
        setLoading(true)
    }
    const navigationEquipamentos = () => {
        if(pathname == "/equipamentos"){
            return;
        }
        router.push("/equipamentos")
        setLoading(true)
    }
    const navigationUsuarios = () => {
        if(pathname == "/usuarios"){
            return;
        }
        router.push("/usuarios")
        setLoading(true)
    }
    const navigationProfile = () => {
        if(pathname == "/profile"){
            return;
        }
        router.push("/profile")
        setLoading(true)
    }
    const logout = () => {
        router.push("/login")
        localStorage.removeItem('token');
        setLoading(true)
    }

    return (
        <div className="h-screen p-2">
            <div className={`${open === true ? "w-15" : "w-72"} h-full relative pt-1 bg-neutral-900 rounded-2xl flex flex-col justify-between transition-all ease-in-out duration-300`}>
                <button onClick={() => setOpen(!open)} className="px-1 py-0 bg-blue-400 rounded-full text-lg text-black font-bold absolute top-5/12 -right-3 cursor-pointer z-40">
                    <ChevronsLeft className={`${open === true ? "hidden" : ""}`} />
                    <ChevronsRight className={`${open === true ? "" : "hidden"}`} />
                </button>
                <div className="overflow-hidden">
                    <h1 className="w-full my-5 flex justify-center items-center text-3xl"><b className={`mr-1.5 text-blue-400 ${open === true ? "mr-0 mx-auto" : ""}`}>HD</b> <p className={`${open === true ? "hidden" : ""}`}>Support</p></h1>
                    <button onClick={navigationDashBoard} className={`py-4 ${open === true ? "px-4.5 space-x-10" : "w-full px-10"} flex space-x-2 text-slate-500 hover:bg-sky-950 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200`}>
                        <LayoutDashboard />
                        <p className={`${open === true ? "hidden" : ""}`}>DashBoard</p>
                    </button>
                    <button onClick={navigationChamados} className={`py-4 ${open === true ? "px-4.5 space-x-10" : "w-full px-10"} flex space-x-2 text-slate-500 hover:bg-sky-950 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200`}>
                        <Command />
                        <p className={`${open === true ? "hidden" : ""}`}>Chamados</p>
                    </button>
                    <button onClick={navigationEmprestimos} className={`py-4 ${open === true ? "px-4.5 space-x-10" : "w-full px-10"} flex space-x-2 text-slate-500 hover:bg-sky-950 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200`}>
                        <Package />
                        <p className={`${open === true ? "hidden" : ""}`}>Emprestimos</p>
                    </button>
                    <button onClick={navigationEquipamentos} className={`py-4 ${open === true ? "px-4.5 space-x-10" : "w-full px-10"} flex space-x-2 text-slate-500 hover:bg-sky-950 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200`}>
                        <Laptop />
                        <p className={`${open === true ? "hidden" : ""}`}>Equipamentos</p>
                    </button>
                    <button onClick={navigationUsuarios} className={`py-4 ${open === true ? "px-4.5 space-x-10" : "w-full px-10"} flex space-x-2 text-slate-500 hover:bg-sky-950 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200`}>
                        <UsersIcon />
                        <p className={`${open === true ? "hidden" : ""}`}>Usuarios</p>
                    </button>
                </div>
                <div className="my-4 mx-6 py-4 space-x-1 space-y-2 text-slate-500 font-bold flex justify-center flex-wrap">
                    <button onClick={navigationProfile} className="flex cursor-pointer hover:text-slate-300 transition-all ease-in-out duration-200 space-x-1"><UserCircle /><p className={`${open === true ? "hidden" : ""}`}>{usuario.nme_Usuario}</p></button>
                    <button onClick={logout} className="flex cursor-pointer hover:text-slate-300 transition-all ease-in-out duration-200"><DoorOpen /><p className={`${open === true ? "hidden" : ""}`}>Sair</p></button>
                </div>
            </div>
            {loading && (
                <Loading/>
            )}
        </div>
    )
}