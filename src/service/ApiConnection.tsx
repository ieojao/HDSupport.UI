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
        imagem: string = "string",
        status: number = 1,
        statusconversa: number = 1,
    ) {
        return axiosInstance.post(`/Usuario/Registro`, {
            nme_Usuario: nome,
            eml_Usuario: email,
            sen_Usuario: senha,
            tel_Usuario: telefone,
            cargo_Usuario: cargo,
            img_Usuario: imagem,
            status_Usuario: status,
            status_Conversa: statusconversa,
        });
    }
    static BuscarPorTokenJWT(token: string){
        return axiosInstance.get(`/Usuario/BuscarPorTokenJWT/${token}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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