# Funcionalidades de Gestão de Squads

## Visão Geral
Este documento descreve as funcionalidades implementadas para o sistema de gestão de squads (equipes) no HDSupport.UI.

## Funcionalidades Implementadas

### 1. Criar/Editar Squads
- **Formulário de Criação**: Interface completa para criar novos squads
- **Formulário de Edição**: Permite editar informações existentes dos squads
- **Campos Obrigatórios**:
  - Nome do Squad
  - Descrição
  - Líder da Equipe
  - Cor de identificação
- **Validações**: Verificação de campos obrigatórios antes do envio

### 2. Transferir Usuários
- **Interface de Transferência**: Formulário dedicado para mover usuários entre squads
- **Seleção Inteligente**: 
  - Lista apenas usuários do squad de origem
  - Exclui o squad de origem da lista de destino
- **Validações**: Impede transferência para o mesmo squad

### 3. Líderes de Squad
- **Designação de Líderes**: Seleção de líderes durante criação/edição
- **Proteção do Líder**: Líderes não podem ser removidos da equipe
- **Identificação Visual**: Badge especial para identificar líderes

### 4. Estatísticas por Squad
- **Métricas de Performance**:
  - Total de chamados
  - Chamados resolvidos
  - Taxa de resolução (%)
  - Tempo médio de resolução
  - Satisfação média do cliente
- **Informações Gerais**:
  - Número de membros
  - Data de criação
  - Dias ativo
  - Status (ativo/inativo)

### 5. Gerenciamento de Membros
- **Adicionar Membros**: Interface para incluir novos usuários na equipe
- **Remover Membros**: Funcionalidade para remover usuários (exceto líderes)
- **Lista de Disponíveis**: Mostra usuários que podem ser adicionados
- **Confirmações**: Diálogos de confirmação para ações destrutivas

## Componentes Criados

### 1. `SquadForm.tsx`
- Formulário reutilizável para criar/editar squads
- Seletor de cores visual
- Validação de campos obrigatórios

### 2. `TransferirUsuario.tsx`
- Interface para transferir usuários entre squads
- Seleção dinâmica baseada em squads existentes

### 3. `EstatisticasSquad.tsx`
- Dashboard detalhado de estatísticas
- Visualização de métricas de performance
- Lista completa de membros

### 4. `GerenciarMembros.tsx`
- Interface para adicionar/remover membros
- Lista de usuários disponíveis
- Proteção de líderes

### 5. `useSquads.ts`
- Hook personalizado para gerenciar estado dos squads
- Funções para todas as operações CRUD
- Dados mockados para demonstração

## Estrutura de Dados

### Modelo Squad
```typescript
interface Squad {
  id: number;
  nome: string;
  descricao: string;
  lider: Usuario;
  membros: Usuario[];
  dataCriacao: string;
  status: 'ativo' | 'inativo';
  cor: string;
  estatisticas: {
    totalChamados: number;
    chamadosResolvidos: number;
    tempoMedioResolucao: number;
    satisfacaoMedia: number;
  };
}
```

### Modelo Usuario
```typescript
interface Usuario {
  id: number;
  nme_Usuario: string;
  img_Usuario: string;
  email: string;
  cargo: string;
}
```

## Funcionalidades da Interface

### Visualizações
1. **Cards**: Visualização em cards com informações resumidas
2. **Tabela**: Visualização tabular com todas as informações
3. **Estatísticas**: Visualização detalhada de métricas

### Ações Disponíveis
- Criar novo squad
- Editar squad existente
- Transferir usuários
- Gerenciar membros
- Ver estatísticas detalhadas
- Ativar/desativar squads

### Navegação
- Botões de navegação entre visualizações
- Breadcrumbs para voltar às visualizações anteriores
- Modais para ações específicas

## Tecnologias Utilizadas
- **React** com TypeScript
- **Tailwind CSS** para estilização
- **Componentes UI** personalizados
- **Hooks** para gerenciamento de estado
- **Dados Mockados** para demonstração

## Próximos Passos
1. Integração com API real
2. Persistência de dados
3. Autenticação e autorização
4. Notificações em tempo real
5. Relatórios avançados
6. Filtros e busca
7. Exportação de dados

## Como Usar
1. Acesse a página `/squads`
2. Use os botões para navegar entre as funcionalidades
3. Crie novos squads com o botão "+ Novo Squad"
4. Gerencie membros clicando em "Gerenciar"
5. Visualize estatísticas clicando em "Ver Estatísticas"
6. Transfira usuários com o botão "Transferir Usuário" 