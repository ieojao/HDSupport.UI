"use client"
import { useState } from 'react';
import { UsuarioService } from "@/service/ApiConnection";

interface Equipamento {
    nome: string;
    dataEmprestimo: string;
    dataDevolucao: string;
    status?: 'ativo' | 'expirado' | 'devolvido';
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
    const [selectedSquad, setSelectedSquad] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: "Jhuan Soja",
            email: "sojinha@gmail.com",
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
                { nome: 'Headset', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Mouse', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Teclado', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Monitor', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo HDMI', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo VGA', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo USB', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo Ethernet', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo VGA', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo HDMI', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo VGA', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo HDMI', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo VGA', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo HDMI', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo VGA', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo HDMI', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                { nome: 'Cabo VGA', dataEmprestimo: '2024-03-18', dataDevolucao: '2025-07-18' },
                { nome: 'Cabo HDMI', dataEmprestimo: '2024-03-18', dataDevolucao: '2024-04-18' },
                

            ]
        }
    ]);
    const itemsPerPage = 10;
    const totalPages = 1; // Ajuste conforme a quantidade de usuários reais

    // Função para calcular o status do empréstimo
    const calcularStatusEmprestimo = (dataDevolucao: string): 'ativo' | 'expirado' | 'devolvido' => {
        const hoje = new Date();
        const dataDevolucaoObj = new Date(dataDevolucao);
        
        // Se a data de devolução já passou, está expirado
        if (hoje > dataDevolucaoObj) {
            return 'expirado';
        }
        
        // Se ainda não chegou a data de devolução, está ativo
        return 'ativo';
    };

    // Função para obter a cor do status
    const getStatusColor = (status: 'ativo' | 'expirado' | 'devolvido') => {
        switch (status) {
            case 'ativo':
                return 'bg-green-500';
            case 'expirado':
                return 'bg-red-500';
            case 'devolvido':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Função para obter a cor do texto do status
    const getStatusTextColor = (status: 'ativo' | 'expirado' | 'devolvido') => {
        switch (status) {
            case 'ativo':
                return 'text-green-400';
            case 'expirado':
                return 'text-red-400';
            case 'devolvido':
                return 'text-gray-400';
            default:
                return 'text-gray-400';
        }
    };

    // Função para obter o texto do status
    const getStatusText = (status: 'ativo' | 'expirado' | 'devolvido') => {
        switch (status) {
            case 'ativo':
                return 'Ativo';
            case 'expirado':
                return 'Expirado';
            case 'devolvido':
                return 'Devolvido';
            default:
                return 'Desconhecido';
        }
    };

    // Obter squads únicos dos dados
    const uniqueSquads = [...new Set(users.map(user => user.squad))];

    // Filtrar usuários baseado nos critérios de busca
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCargo = selectedCargo === '' || user.cargo === selectedCargo;
        const matchesSquad = selectedSquad === '' || user.squad === selectedSquad;
        
        return matchesSearch && matchesCargo && matchesSquad;
    });

    const handleStatusChange = async (userId: number, newStatus: boolean) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token não encontrado. Faça login novamente.');
                return;
            }

            // Atualizar o estado local imediatamente para feedback visual
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, status: newStatus } : user
                )
            );

            // Chamar a API para atualizar no backend
            await UsuarioService.AtualizarStatusUsuario(token, userId, newStatus);
            
            console.log(`Usuário ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
        } catch (error) {
            console.error('Erro ao atualizar status do usuário:', error);
            
            // Reverter o estado local em caso de erro
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, status: !newStatus } : user
                )
            );
            
            alert(`Erro ao ${newStatus ? 'ativar' : 'desativar'} usuário. Tente novamente.`);
        }
    };

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
                            <option value="Lider">Lider</option>
                            <option value="Fúncionário">Fúncionário</option>
                        </select>
                        <select
                            className="bg-[#23272b] border border-[#444] text-[#f1f1f1] px-4 py-2 rounded-lg outline-none"
                            value={selectedSquad}
                            onChange={(e) => setSelectedSquad(e.target.value)}
                        >
                            <option value="">Todas as squads</option>
                            {uniqueSquads.map((squad) => (
                                <option key={squad} value={squad}>{squad}</option>
                            ))}
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
                            {filteredUsers.map((user) => (
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
                                                onChange={(e) => handleStatusChange(user.id, e.target.checked)}
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
                <div className="modal-perfil fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="modal-content bg-[#23272b] rounded-[18px] shadow-2xl w-full max-w-[900px] max-h-[95vh] overflow-hidden border-t-4 border-[#2196f3] flex flex-col">
                        {/* Header */}
                        <div className="modal-header bg-[#111] text-white flex items-center px-6 py-4 border-b-2 border-[#23272b] relative rounded-t-[18px] flex-shrink-0">
                            <span className="modal-icon mr-3">
                                <svg width="28" height="28" fill="#2196f3" viewBox="0 0 24 24">
                                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                                </svg>
                            </span>
                            <span className="modal-title flex-1 text-[1.3rem] font-semibold">
                                <b>Dados do <span className="text-[#2196f3]">Usuário</span></b>
                            </span>
                            <button 
                                onClick={closeProfile} 
                                className="modal-close text-[#2196f3] hover:text-white text-2xl font-bold transition-colors"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Body */}
                        <div className="modal-body flex-1 overflow-y-auto p-6 bg-[#23272b]">
                            {/* Informações do usuário */}
                            <div className="perfil-info flex flex-col sm:flex-row items-start sm:items-center mb-6 p-4 bg-[#181a1b] rounded-lg">
                                <div className="perfil-avatar mb-4 sm:mb-0 sm:mr-6">
                                    <div className="w-16 h-16 bg-[#2196f3] rounded-full flex items-center justify-center">
                                        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="perfil-dados flex flex-col gap-2 flex-1">
                                    <div className="perfil-nome text-[1.4rem] font-bold text-white">{selectedUser.name}</div>
                                    <div className="perfil-cargo text-[1rem] text-[#b0b0b0] flex items-center gap-2">
                                        <span className="bg-[#2196f3] text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {selectedUser.cargo}
                                        </span>
                                        <span className="text-[#6c63ff]">•</span>
                                        <span>{selectedUser.squad}</span>
                                    </div>
                                    <div className="perfil-email text-[0.98rem] text-[#b0b0b0] flex items-center gap-2">
                                        <svg width="16" height="16" fill="#2196f3" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        {selectedUser.email}
                                    </div>
                                    <div className="perfil-status flex items-center gap-2 mt-2">
                                        <div className={`w-3 h-3 rounded-full ${selectedUser.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className={`text-sm font-medium ${selectedUser.status ? 'text-green-400' : 'text-red-400'}`}>
                                            {selectedUser.status ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Seção de equipamentos */}
                            <div className="equipamentos-area">
                                <div className="equipamentos-header flex items-center justify-between mb-4">
                                    <div className="equipamentos-titulo text-[1.2rem] text-[#2196f3] font-semibold flex items-center gap-2">
                                        <svg width="24" height="24" fill="#2196f3" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
                                        </svg>
                                        Equipamentos emprestados
                                        <span className="bg-[#2196f3] text-white px-2 py-1 rounded-full text-sm font-medium">
                                            {selectedUser.equipamentos?.length || 0}
                                        </span>
                                    </div>
                                </div>

                                {/* Contadores de status */}
                                {selectedUser.equipamentos && selectedUser.equipamentos.length > 0 && (
                                    <div className="status-counters flex flex-wrap gap-3 mb-4">
                                        {(() => {
                                            const ativos = selectedUser.equipamentos.filter(eq => 
                                                calcularStatusEmprestimo(eq.dataDevolucao) === 'ativo'
                                            ).length;
                                            const expirados = selectedUser.equipamentos.filter(eq => 
                                                calcularStatusEmprestimo(eq.dataDevolucao) === 'expirado'
                                            ).length;
                                            
                                            return (
                                                <>
                                                    <div className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 px-3 py-2 rounded-lg">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <span className="text-green-400 text-sm font-medium">Ativos: {ativos}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 px-3 py-2 rounded-lg">
                                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                        <span className="text-red-400 text-sm font-medium">Expirados: {expirados}</span>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* Lista compacta de equipamentos */}
                                <div className="equipamentos-lista">
                                    {selectedUser.equipamentos && selectedUser.equipamentos.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedUser.equipamentos.map((eq, idx) => {
                                                const status = calcularStatusEmprestimo(eq.dataDevolucao);
                                                return (
                                                    <div key={idx} className={`bg-[#181a1b] text-white rounded-lg p-4 shadow-sm border-l-4 transition-colors hover:bg-[#1f2124] ${
                                                        status === 'ativo' ? 'border-green-500' : 
                                                        status === 'expirado' ? 'border-red-500' : 
                                                        'border-gray-500'
                                                    }`}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3 flex-1">
                                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                                    status === 'ativo' ? 'bg-green-500' : 
                                                                    status === 'expirado' ? 'bg-red-500' : 
                                                                    'bg-gray-500'
                                                                }`}>
                                                                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                                                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <div className="equip-nome font-semibold text-[1rem] text-white truncate">
                                                                            {eq.nome}
                                                                        </div>
                                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                            status === 'ativo' ? 'bg-green-500/20 text-green-400' : 
                                                                            status === 'expirado' ? 'bg-red-500/20 text-red-400' : 
                                                                            'bg-gray-500/20 text-gray-400'
                                                                        }`}>
                                                                            {getStatusText(status)}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-sm text-[#b0b0b0]">
                                                                        <div className="flex items-center gap-1">
                                                                            <svg width="14" height="14" fill="#2196f3" viewBox="0 0 24 24">
                                                                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1zm-7 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                                                            </svg>
                                                                            <span>Emprestado: {eq.dataEmprestimo.split('-').reverse().join('/')}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <svg width="14" height="14" fill="#6c63ff" viewBox="0 0 24 24">
                                                                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1zm-7 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                                                            </svg>
                                                                            <span className={status === 'expirado' ? 'text-red-400 font-medium' : ''}>
                                                                                Devolução: {eq.dataDevolucao.split('-').reverse().join('/')}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 flex-shrink-0">
                                                                <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-[#181a1b] rounded-lg">
                                            <svg width="64" height="64" fill="#6c63ff" className="mx-auto mb-4 opacity-50" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
                                            </svg>
                                            <p className="text-[#b0b0b0] text-lg">Nenhum equipamento emprestado</p>
                                            <p className="text-[#666] text-sm mt-1">Este usuário não possui equipamentos em uso</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <style jsx>{`
                        .modal-perfil { 
                            background: rgba(0,0,0,0.8); 
                            backdrop-filter: blur(4px);
                        }
                        .modal-content { 
                            border-radius: 18px; 
                            box-shadow: 0 8px 32px rgba(0,0,0,0.6); 
                        }
                        .modal-header { 
                            border-radius: 18px 18px 0 0; 
                        }
                        .modal-body::-webkit-scrollbar {
                            width: 8px;
                        }
                        .modal-body::-webkit-scrollbar-track {
                            background: #2a2d31;
                            border-radius: 4px;
                        }
                        .modal-body::-webkit-scrollbar-thumb {
                            background: #6c63ff;
                            border-radius: 4px;
                        }
                        .modal-body::-webkit-scrollbar-thumb:hover {
                            background: #5a52d5;
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
} 