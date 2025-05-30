"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UsuarioService } from "@/service/ApiConnection";
import { User ,AtSign, Eye, EyeOff, Image, Phone } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [base64, setBase64] = useState<string | undefined>(undefined);
    const [cargo, setCargo] = useState("funcionario");
    const [status, setStatus] = useState(1);
    const [statusConversa, setStatusConversa] = useState(1);

    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setSenha(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        if (!regex.test(password)) {
            setPasswordError(
                "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número, com no mínimo 8 caracteres."
            );
        } else {
            setPasswordError("");
        }
    };

    const handleEmailChange = (e: any) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            setEmailError("Insira um endereço de e-mail válido.");
        } else {
            setEmailError("");
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64String = await convertToBase64(file);
            setBase64(base64String as string);
        }
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    const handleRegister = async (e: any) => {
        e.preventDefault();
        let base64Imagem = (base64?.split(',')[1]) || "";
        try {
            const response = await UsuarioService.Register(nome, email, senha, telefone, cargo, base64Imagem, status, statusConversa)
            setOpen(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            console.error("Erro ao fazer um cadastro:", error);
            setOpenErro(true);
            setTimeout(() => {
                router.push("/register");
            }, 2000);
        }
    };

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);

        const newMode = !darkMode;

        setDarkMode(newMode);

        localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
    };

    useEffect(() => {
        const storedMode = localStorage.getItem("darkMode");
        if (storedMode === "enabled") {
            setDarkMode(true);
        }
    }, []);

    const handleNavigation = () => {
        router.push("/login");
    };

    return (
        <div className="bg-neutral-950">
            <div className="min-h-screen xl:flex-row xl:h-screen  bg-black flex-col overflow-x-hidden flex justify-center items-center ">
                <div className="text-white px-6 xl:px-0 flex flex-col max-sm:items-center justify-center">
                    <h1 className="font-bold text-5xl xl:w-[500px] mt-4 xl:mt-0 relative max-sm:left-[50px] max-sm:text-3xl max-sm:w-[380px] text-white">
                        Comece agora com{" "}
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-800 inline-block text-transparent bg-clip-text">
                            HD support
                        </span>
                    </h1>
                    <p className="xl:w-[500px] px-4 xl:px-0 relative max-sm:w-[380px] mt-4 text-white">
                        A equipe de aprendizes do BNE tem o prazer de apresentar um projeto
                        inovador e eficiente desenvolvido para aprimorar o funcionamento do
                        Help Desk.
                    </p>
                    <ul className="flex flex-row justify-center xl:justify-start space-x-5 mb-6 xl:mb-0">
                        <li className="mt-3 flex space-x-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="url(#gradiente1)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-rocket"
                            >
                                <defs>
                                    <linearGradient
                                        id="gradiente1"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="rgb(6,182,212)"
                                            stopOpacity="1"
                                        />
                                        <stop offset="100%" stopColor="blue" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                            </svg>{" "}
                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-800 font-bold">
                                {" "}
                                Rápido
                            </p>
                        </li>
                        <li className="mt-3 space-x-1 flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="url(#gradiente2)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-shield-check"
                            >
                                <defs>
                                    <linearGradient
                                        id="gradiente2"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="rgb(6,182,212)"
                                            stopOpacity="1"
                                        />
                                        <stop offset="100%" stopColor="blue" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-800 font-bold">
                                {" "}
                                Seguro
                            </p>
                        </li>
                        <li className="mt-3 space-x-1 flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="url(#gradiente3)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-circle-gauge"
                            >
                                <defs>
                                    <linearGradient
                                        id="gradiente3"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="rgb(6,182,212)"
                                            stopOpacity="1"
                                        />
                                        <stop offset="100%" stopColor="blue" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                                <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M13.4 10.6 19 5" />
                            </svg>
                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-800 font-bold">
                                {" "}
                                Eficiente
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="w-full xl:w-[500px] px-6 xl:px-0 flex flex-col relative max-sm:top-[10px] justify-center items-center">
                    <div className="text-white text-center text-3xl font-bold mb-3">
                        Crie sua conta!
                    </div>

                    <form
                        action="post"
                        className="w-full flex flex-col items-center"
                        onSubmit={handleRegister}
                    >
                        <div className="w-full p-2 mt-5 rounded-md flex items-center justify-center text-neutral-300 bg-neutral-950 text-lg">
                            <Input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite seu nome de usuário"
                                className="h-12"
                                required
                            />
                            <User className="mr-4"/>
                        </div>

                        <div className="w-full p-2 mt-5 rounded-md flex items-center justify-center text-neutral-300 bg-neutral-950 text-lg">
                            <Input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Digite seu E-mail"
                                className="h-12"
                                required
                            />

                            <AtSign className="mr-4"/>
                        </div>
                        {emailError && (
                            <div className="w-full p-4 mt-4 bg-red-600/20 border border-red-700 rounded-xl text-red-400">
                                {emailError}
                            </div>
                        )}

                        <div className="w-full p-2 mt-5 rounded-md flex items-center justify-center text-neutral-300 bg-neutral-950 text-lg">
                            <Input
                                type="password"
                                value={senha}
                                onChange={handlePasswordChange}
                                placeholder="Informe sua senha"
                                className="h-12"
                                required
                            />

                            <Eye className="mr-4"/><EyeOff className="mr-4"/>
                        </div>
                        <div className="w-full p-2 mt-5 rounded-md flex items-center justify-center text-neutral-300 bg-neutral-950 text-lg">
                            <Input
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                placeholder="seu telefone"
                                className="h-12"
                                required
                            />

                            <Phone className="mr-4"/>
                        </div>
                        <div className="w-full p-2 mt-5 rounded-md flex items-center justify-center text-neutral-300 bg-neutral-950 text-lg">
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                placeholder="Anexe sua nova foto de Perfil"
                                className="border-none h-60px pl-7"
                                required
                            />

                            <Image className="mr-4"/>
                        </div>

                        {passwordError && (
                            <div className="w-full p-4 mt-4 bg-red-600/20 border border-red-700 rounded-xl text-red-400">
                                {passwordError}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="mt-6"
                        >
                            Criar conta
                        </Button>
                        <div className="text-white relative max-sm:bottom-[20px] text-center mt-3">
                            <span className="text-blue-200 font-bold">
                                Já possui conta?{" "}
                                <a
                                    onClick={handleNavigation}
                                    className="text-sky-400 font-bold cursor-pointer hover:underline"
                                >
                                    Faça login
                                </a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            {open && (
                <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0">
                    <div className="w-96 h-64 bg-neutral-950 rounded-xl flex flex-col justify-center items-center">
                        <div className="main-container">
                            <div className="check-container">
                                <div className="check-background">
                                    <svg
                                        viewBox="0 0 65 51"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 25L27.3077 44L58.5 7"
                                            stroke="white"
                                            stroke-width="13"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="check-shadow"></div>
                            </div>
                        </div>
                        <h1 className="text-green-500 text-xl">
                            Cadastro realizado com sucesso!
                        </h1>
                    </div>
                </div>
            )}

            {openErro && (
                <div className="w-full h-screen bg-black/50 flex justify-center items-center fixed inset-0">
                    <div className="w-96 h-64 bg-white rounded-xl flex flex-col justify-center items-center">
                        <div className="failure-container">
                            <div className="failure-container">
                                <div className="failure-background">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="200"
                                        height="200"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-circle-x"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m15 9-6 6" />
                                        <path d="m9 9 6 6" />
                                    </svg>
                                </div>
                                <div className="failure-shadow"></div>
                            </div>
                        </div>
                        <h1 className="text-red-500 text-xl">Erro ao realizar cadastro</h1>
                    </div>
                </div>
            )}
        </div>
    );
}
