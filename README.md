# API de Gerenciamento de Tarefas

Este projeto implementa uma API RESTful para gerenciamento de tarefas, utilizando Node.js, Express e PostgreSQL.

## Estrutura do Projeto

O projeto segue a arquitetura MVC (Model-View-Controller):

```
.
├── config/
│   └── database.js     # Configuração do banco de dados
├── controllers/
│   └── TarefaController.js  # Controlador de tarefas
├── migrations/
│   └── init.sql       # Script de inicialização do banco
├── routes/
│   └── index.js       # Definição das rotas
├── .env              # Variáveis de ambiente
├── server.js         # Arquivo principal do servidor
└── package.json      # Dependências do projeto
```

## Requisitos

- Node.js
- PostgreSQL
- npm ou yarn

## Configuração

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_PROJETO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Copie o conteúdo abaixo e ajuste conforme suas configurações:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=task_manager
PORT=3000
```

4. Inicialize o banco de dados:
```bash
psql -U seu_usuario -f migrations/init.sql
```

## Executando o Projeto

1. Inicie o servidor:
```bash
npm start
```

2. O servidor estará rodando em `http://localhost:3000`

## Endpoints da API

### Tarefas

- **GET /api/tarefas**
  - Lista todas as tarefas
  - Retorno: Array de tarefas

- **POST /api/tarefas**
  - Cria uma nova tarefa
  - Body: `{ "nome": "string", "descricao": "string" }`
  - Retorno: Tarefa criada

- **PUT /api/tarefas/:id**
  - Atualiza uma tarefa existente
  - Body: `{ "nome": "string", "descricao": "string", "status": "string" }`
  - Retorno: Tarefa atualizada

- **DELETE /api/tarefas/:id**
  - Remove uma tarefa
  - Retorno: Mensagem de sucesso

## Arquitetura MVC

### Model
- Representado pela estrutura da tabela `tarefas` no PostgreSQL
- Gerencia o acesso e manipulação dos dados

### Controller
- Localizado em `controllers/TarefaController.js`
- Implementa a lógica de negócio
- Processa requisições e retorna respostas

### View
- Implementada como uma API REST
- Retorna dados em formato JSON
- Pode ser consumida por qualquer cliente HTTP

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request
