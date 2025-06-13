"use client"
import { useState } from 'react';

interface Equipamento {
    nome: string;
    dataEmprestimo: string;
    dataDevolucao: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    cargo: string;
    squad: string;
    status: boolean;
    equipamentos?: Equipamento[];
}

export default function UserTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCargo, setSelectedCargo] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = 1; // Ajuste conforme a quantidade de usuários reais

    // Dados de exemplo - você deve substituir isso com dados reais da sua API
    const users: User[] = [
        {
            id: 1,
            name: "Jhuan Soja",
            email: "soja909@gmail.com",
            cargo: "Lider",
            squad: "Escolinha de TI",
            status: true,
            equipamentos: [
                { nome: 'Teclado', dataEmprestimo: '2024-05-01', dataDevolucao: '2024-06-01' },
                { nome: 'Mouse', dataEmprestimo: '2024-05-03', dataDevolucao: '2024-06-03' }
            ]
        },
        {
            id: 2,
            name: "Lucas Couto",
            email: "lucas123@gmail.com",
            cargo: "Fúncionário",
            squad: "Help Desk",
            status: false,
            equipamentos: [
                { nome: 'Monitor', dataEmprestimo: '2024-04-20', dataDevolucao: '2024-05-20' }
            ]
        },
        {
            id: 3,
            name: "Camargo da Silva",
            email: "Camargo.silva@gmail.com",
            cargo: "Fúncionário",
            squad: "Financeiro",
            status: true,
            equipamentos: []
        },
        {
            id: 4,
            name: "Evenildo",
            email: "nildinho@gmail.com",
            cargo: "Gerente",
            squad: "Atendimento",
            status: false,
            equipamentos: [
                { nome: 'Notebook', dataEmprestimo: '2024-03-15', dataDevolucao: '2024-04-15' },
                { nome: 'Headset', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' }
            ]
        }
    ];

    const openProfile = (user: User) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeProfile = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="p-5 w-full h-full flex flex-col">
            <div className="w-full bg-[#23272b] rounded-xl shadow-lg p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-white">Usuários</h1>
                </div>

                <div className="flex justify-between items-center mb-4 gap-2.5">
                    <div className="flex gap-2.5">
                        <input
                            type="text"
                            placeholder="Buscar usuários..."
                            className="bg-[#23272b] border border-[#444] text-[#f1f1f1] px-4 py-2 rounded-lg min-w-[220px] outline-none focus:border-[#6c63ff] transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="bg-[#23272b] border border-[#444] text-[#f1f1f1] px-4 py-2 rounded-lg outline-none"
                            value={selectedCargo}
                            onChange={(e) => setSelectedCargo(e.target.value)}
                        >
                            <option value="">Todos os cargos</option>
                            <option value="Desenvolvedor">Desenvolvedor</option>
                            <option value="Designer">Designer</option>
                            <option value="Gerente">Gerente</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead className="bg-[#181a1b]">
                            <tr>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">ID</th>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">Nome</th>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">Email</th>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">Cargo</th>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">Squad</th>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">Status</th>
                                <th className="px-4 py-3 text-left text-[#6c63ff] font-semibold border-b-2 border-[#6c63ff]">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#23243a]">
                                    <td className="px-4 py-3 text-[#b0b0b0] font-medium">{user.id}</td>
                                    <td className="px-4 py-3 text-white">{user.name}</td>
                                    <td className="px-4 py-3 text-white">{user.email}</td>
                                    <td className="px-4 py-3 text-white">{user.cargo}</td>
                                    <td className="px-4 py-3 text-white">{user.squad}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-block w-11 h-6">
                                            <input
                                                type="checkbox"
                                                className="opacity-0 w-0 h-0"
                                                checked={user.status}
                                                onChange={() => {}}
                                            />
                                            <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                                                user.status ? 'bg-[#6c63ff]' : 'bg-[#444]'
                                            }`}>
                                                <span className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-transform ${
                                                    user.status ? 'translate-x-5' : ''
                                                }`}></span>
                                            </span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-[#6c63ff] hover:text-white transition-colors" onClick={() => openProfile(user)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center mt-6 pt-4 gap-2 pagination">
                    <button
                        className="min-w-[38px] text-center text-white font-medium py-2 px-3 rounded-lg bg-[#23243a] border border-[#6c63ff] transition-colors hover:bg-[#6c63ff] hover:text-white"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Anterior
                    </button>
                    <span className="min-w-[38px] text-center text-white font-medium py-2 px-3 rounded-lg bg-[#6c63ff] border border-[#6c63ff]">{currentPage}</span>
                    <button
                        className="min-w-[38px] text-center text-white font-medium py-2 px-3 rounded-lg bg-[#23243a] border border-[#6c63ff] transition-colors hover:bg-[#6c63ff] hover:text-white"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        Próxima
                    </button>
                </div>
            </div>

            {modalOpen && selectedUser && (
                <div className="modal-perfil fixed inset-0 z-50 flex items-center justify-center">
                    <div className="modal-content bg-[#23272b] rounded-[18px_18px_16px_16px] shadow-2xl w-full max-w-[600px] p-0 overflow-hidden border-t-4 border-[#2196f3]">
                        <div className="modal-header bg-[#111] text-white flex items-center px-7 pt-[18px] pb-3.5 border-b-2 border-[#23272b] relative rounded-t-[18px]">
                            <span className="modal-icon mr-2.5">
                                <svg width="28" height="28" fill="#2196f3" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
                            </span>
                            <span className="modal-title flex-1 text-[1.3rem] font-semibold"><b>Dados do <span className="text-[#2196f3]">Usuário</span></b></span>
                            <button onClick={closeProfile} className="modal-close text-[#2196f3] hover:text-white text-2xl font-bold ml-2 transition-colors absolute right-6 top-3">&times;</button>
                        </div>
                        <div className="modal-body p-[28px_32px_32px_32px] bg-[#23272b]">
                            <div className="perfil-info flex items-center mb-[18px]">
                                <div className="perfil-avatar mr-[18px]">
                                    <svg width="48" height="48" fill="#2196f3" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
                                </div>
                                <div className="perfil-dados flex flex-col gap-[2px]">
                                    <div className="perfil-nome text-[1.3rem] font-semibold text-white">{selectedUser.name}</div>
                                    <div className="perfil-cargo text-[1rem] text-[#b0b0b0]">{selectedUser.cargo} - {selectedUser.squad}</div>
                                    <div className="perfil-email text-[0.98rem] text-[#b0b0b0]">{selectedUser.email}</div>
                                </div>
                            </div>
                            <div className="equipamentos-area mt-[18px]">
                                <div className="equipamentos-titulo text-[1.1rem] text-[#2196f3] font-semibold mb-2">Equipamentos emprestados</div>
                                <ul className="equipamentos-lista list-none p-0 m-0">
                                    {selectedUser.equipamentos && selectedUser.equipamentos.length > 0 ? (
                                        selectedUser.equipamentos.map((eq, idx) => (
                                            <li key={idx} className="bg-[#181a1b] text-white rounded-[7px] p-[14px_20px] mb-[12px] text-[1rem] flex flex-col gap-[6px] shadow-sm border-l-4 border-[#2196f3]">
                                                <span className="equip-nome font-semibold text-[1.08rem] text-white flex items-center gap-2">
                                                    <span className="text-[#2196f3]">🔹</span> {eq.nome}
                                                </span>
                                                <span className="equip-data text-[#b0b0b0] text-[0.98rem] flex items-center gap-2 mt-1">
                                                    <svg width="18" height="18" fill="#2196f3" viewBox="0 0 24 24" style={{verticalAlign:'middle'}}><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1zm-7 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                                    Emprestado em: {eq.dataEmprestimo.split('-').reverse().join('/')}
                                                </span>
                                                <span className="equip-data text-[#b0b0b0] text-[0.98rem] flex items-center gap-2 mt-1">
                                                    <svg width="18" height="18" fill="#2196f3" viewBox="0 0 24 24" style={{verticalAlign:'middle'}}><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1zm-7 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                                    Devolução prevista: {eq.dataDevolucao.split('-').reverse().join('/')}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-[#b0b0b0]">Nenhum equipamento emprestado.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        .modal-perfil { background: rgba(0,0,0,0.7); z-index: 9999; }
                        .modal-content { border-radius: 18px 18px 16px 16px; box-shadow: 0 4px 32px rgba(0,0,0,0.5); }
                        .modal-header { border-radius: 18px 18px 0 0; }
                    `}</style>
                </div>
            )}
        </div>
    );
} 