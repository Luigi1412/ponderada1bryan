# Task Manager API

Uma API REST para gerenciamento de tarefas construída com Node.js, Express e PostgreSQL, seguindo a arquitetura MVC.

## Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- dotenv (para variáveis de ambiente)
- cors (para habilitar CORS)

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## Configuração

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DO_DIRETORIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=task_manager
PORT=3000
```

4. Execute as migrações do banco de dados:
```bash
npm run init-db
```

## Estrutura do Projeto

```
.
├── config/
│   └── database.js     # Configuração do PostgreSQL
├── controllers/
│   └── TarefaController.js  # Controlador de tarefas
├── routes/
│   └── index.js       # Definição das rotas
├── init.sql           # Script de inicialização do banco
├── server.js          # Arquivo principal do servidor
├── .env               # Variáveis de ambiente
└── README.md          # Documentação
```

## Endpoints da API

### Tarefas

- **POST /api/tarefas**
  - Cria uma nova tarefa
  - Body: `{ "nome": "string", "descricao": "string" }`

- **GET /api/tarefas**
  - Lista todas as tarefas

- **GET /api/tarefas/:id**
  - Obtém uma tarefa específica

- **PUT /api/tarefas/:id**
  - Atualiza uma tarefa
  - Body: `{ "nome": "string", "descricao": "string", "status": "string" }`

- **DELETE /api/tarefas/:id**
  - Remove uma tarefa

## Executando o Projeto

1. Inicie o servidor:
```bash
npm start
```

2. O servidor estará rodando em `http://localhost:3000`

## Testes

Para testar os endpoints, você pode usar ferramentas como Postman ou cURL:

```bash
# Criar uma tarefa
curl -X POST http://localhost:3000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Tarefa 1","descricao":"Descrição da tarefa"}'

# Listar tarefas
curl http://localhost:3000/api/tarefas

# Atualizar uma tarefa
curl -X PUT http://localhost:3000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Tarefa Atualizada","descricao":"Nova descrição","status":"completo"}'

# Excluir uma tarefa
curl -X DELETE http://localhost:3000/api/tarefas/1
```

## Arquitetura MVC

Este projeto segue a arquitetura Model-View-Controller (MVC):

- **Model**: Representado pela estrutura do banco de dados (tabela `tarefas`)
- **Controller**: Implementado em `TarefaController.js`, gerencia a lógica de negócios
- **View**: A API REST serve como interface, retornando dados em formato JSON

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request 