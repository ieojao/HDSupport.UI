"use client"
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://localhost:7299/api/",
    headers: {
        "Content-Type": "application/json",
    }
});


export class UsuarioService {
    static Login(email: string, senha: string) {
        return axiosInstance.post(`/Usuario/Login?email=${email}&senha=${senha}`)
    }
    static Register(
        nome: string,
        email: string,
        senha: string,
        telefone: string,
        cargo: string,
        imagem: string,
        status: number,
        statusconversa: number
    ) {
        return axiosInstance.post(`/Usuario/Registro`, {
            nome,
            email,
            senha,
            telefone,
            cargo,
            imagem,
            status,
            statusconversa,
        })
    }
}

export class ChamadosService {
    static DadosChamadosDashboard(token: string) {
        return axiosInstance.get(`/Conversa/Dados-Chamados-Dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}