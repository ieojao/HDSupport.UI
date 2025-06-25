"use client"
import {
    ChevronsLeft,
    ChevronsRight,
    Command,
    DoorOpen,
    Laptop,
    LayoutDashboard,
    MessagesSquareIcon,
    Package,
    User2,
    UserCircle,
    UserIcon,
    Users,
    UsersIcon,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Loading from "@/components/layout/loading"
import { UsuarioService } from "@/service/ApiConnection"
import { Usuario } from "@/context/DataInterface"

export default function Page() {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [targetPath, setTargetPath] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        UsuarioService.BuscarPorTokenJWT(token).then((response) => {
            setUsuario(response.data)
        })
    }, [])

    useEffect(() => {
        if (targetPath && pathname !== targetPath) {
            setLoading(true)
            router.push(targetPath)
        }
    }, [targetPath])

    useEffect(() => {
        setLoading(false)
    }, [pathname])

    const handleNavigation = (path: string) => {
        if (pathname === path) return
        setTargetPath(path)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setTargetPath("/login")
    }

    if (pathname === "/login" || pathname === "/register") return null

    return (
        <div className="h-screen p-2">
            <div
                className={`${open ? "w-15" : "w-72"
                    } h-full relative pt-1 bg-neutral-900 rounded-2xl flex flex-col justify-between transition-all ease-in-out duration-300`}
            >
                <button
                    onClick={() => setOpen(!open)}
                    className="px-1 py-0 bg-blue-400 rounded-full text-lg text-black font-bold absolute top-5/12 -right-3 cursor-pointer z-40"
                >
                    <ChevronsLeft className={`${open ? "hidden" : ""}`} />
                    <ChevronsRight className={`${open ? "" : "hidden"}`} />
                </button>
                <div className="overflow-hidden">
                    <h1 className="w-full my-5 flex justify-center items-center text-3xl">
                        <b
                            className={`mr-1.5 text-blue-400 ${open ? "mr-0 mx-auto" : ""
                                }`}
                        >
                            HD
                        </b>{" "}
                        <p className={`${open ? "hidden" : ""}`}>Support</p>
                    </h1>
                    <button
                        onClick={() => handleNavigation("/")}
                        className={`py-4 ${open ? "px-4.5 space-x-10" : "w-full px-10"
                            } flex space-x-2 hover:bg-sky-800 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200 ${pathname === "/" ? "bg-sky-800 text-slate-300" : "text-slate-500"}`}
                    >
                        <LayoutDashboard />
                        <p className={`${open ? "hidden" : ""}`}>DashBoard</p>
                    </button>
                    <button
                        onClick={() => handleNavigation("/chamados")}
                        className={`py-4 ${open ? "px-4.5 space-x-10" : "w-full px-10"
                            } flex space-x-2 hover:bg-sky-800 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200 ${pathname === "/chamados" ? "bg-sky-800 text-slate-300" : "text-slate-500"}`}
                    >
                        <MessagesSquareIcon />
                        <p className={`${open ? "hidden" : ""}`}>Chamados</p>
                    </button>
                    <button
                        onClick={() => handleNavigation("/squads")}
                        className={`py-4 ${open ? "px-4.5 space-x-10" : "w-full px-10"
                            } flex space-x-2 hover:bg-sky-800 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200 ${pathname === "/squads" ? "bg-sky-800 text-slate-300" : "text-slate-500"}`}
                    >
                        <Command />
                        <p className={`${open ? "hidden" : ""}`}>Squads</p>
                    </button>
                    <button
                        onClick={() => handleNavigation("/usuarios")}
                        className={`py-4 ${open ? "px-4.5 space-x-10" : "w-full px-10"
                            } flex space-x-2 hover:bg-sky-800 hover:text-slate-300 cursor-pointer transition-all ease-in-out ${pathname === "/usuarios" ? "bg-sky-800 text-slate-300" : "text-slate-500"} duration-200`}
                    >
                        <User2 />
                        <p className={`${open ? "hidden" : ""}`}>Usuarios</p>
                    </button>
                    <button
                        onClick={() => handleNavigation("/emprestimos")}
                        className={`py-4 ${open ? "px-4.5 space-x-10" : "w-full px-10"
                            } flex space-x-2 hover:bg-sky-800 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200 ${pathname === "/emprestimos" ? "bg-sky-800 text-slate-300" : "text-slate-500"}`}
                    >
                        <Package />
                        <p className={`${open ? "hidden" : ""}`}>Emprestimos</p>
                    </button>
                    <button
                        onClick={() => handleNavigation("/equipamentos")}
                        className={`py-4 ${open ? "px-4.5 space-x-10" : "w-full px-10"
                            } flex space-x-2 hover:bg-sky-800 hover:text-slate-300 cursor-pointer transition-all ease-in-out duration-200 ${pathname === "/equipamentos" ? "bg-sky-800 text-slate-300" : "text-slate-500"}`}
                    >
                        <Laptop />
                        <p className={`${open ? "hidden" : ""}`}>Equipamentos</p>
                    </button>
                </div>
                <div className="my-4 mx-6 py-4 space-x-1 text-slate-500 font-bold flex justify-center items-center flex-wrap">
                    <button
                        onClick={() => handleNavigation("/profile")}
                        className="flex justify-center items-center cursor-pointer hover:text-slate-300 transition-all ease-in-out duration-200 space-x-1"
                    >
                        {usuario?.img_Usuario ? (
                            <img
                                src={usuario?.img_Usuario}
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <UserCircle />
                        )}
                        <p className={`${open ? "hidden" : ""}`}>
                            {usuario?.nme_Usuario}
                        </p>
                    </button>
                    <button
                        onClick={logout}
                        className="my-auto flex justify-center items-center cursor-pointer hover:text-slate-300 transition-all ease-in-out duration-200"
                    >
                        <DoorOpen />
                        <p className={`${open ? "hidden" : ""}`}>Sair</p>
                    </button>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    )
}