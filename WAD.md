# Documentação da Aplicação Web (WAD)

## Visão Geral da Arquitetura

Este projeto implementa uma API REST para gerenciamento de tarefas seguindo a arquitetura MVC (Model-View-Controller). A aplicação é construída usando Node.js com Express.js como framework web e PostgreSQL como banco de dados.

### Arquitetura MVC

```
[Cliente HTTP] <-> [Express (Router)] <-> [Controller] <-> [Model (PostgreSQL)]
```

#### Componentes

1. **Model**
   - Implementado através da estrutura do banco de dados PostgreSQL
   - Tabela `tarefas` com campos:
     - `id` (SERIAL PRIMARY KEY)
     - `nome` (VARCHAR)
     - `descricao` (TEXT)
     - `status` (VARCHAR)
     - `created_at` (TIMESTAMP)
     - `updated_at` (TIMESTAMP)

2. **View**
   - Interface REST API
   - Retorna dados em formato JSON
   - Endpoints documentados no README.md

3. **Controller**
   - `TarefaController.js`
   - Implementa a lógica de negócios
   - Gerencia operações CRUD
   - Trata erros e validações

### Fluxo de Dados

1. O cliente faz uma requisição HTTP para um endpoint
2. O Router do Express direciona a requisição para o Controller apropriado
3. O Controller processa a requisição e interage com o banco de dados
4. O banco de dados retorna os dados solicitados
5. O Controller formata a resposta
6. A resposta é enviada ao cliente em formato JSON

## Detalhes Técnicos

### Banco de Dados

```sql
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Endpoints da API

#### POST /api/tarefas
- **Função**: Criar nova tarefa
- **Controller**: `criarTarefa`
- **Payload**:
  ```json
  {
    "nome": "string",
    "descricao": "string"
  }
  ```

#### GET /api/tarefas
- **Função**: Listar todas as tarefas
- **Controller**: `listarTarefas`
- **Resposta**:
  ```json
  [
    {
      "id": "number",
      "nome": "string",
      "descricao": "string",
      "status": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ]
  ```

#### GET /api/tarefas/:id
- **Função**: Obter tarefa específica
- **Controller**: `obterTarefa`
- **Parâmetros**: `id` (número)

#### PUT /api/tarefas/:id
- **Função**: Atualizar tarefa
- **Controller**: `editarTarefa`
- **Payload**:
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "status": "string"
  }
  ```

#### DELETE /api/tarefas/:id
- **Função**: Excluir tarefa
- **Controller**: `excluirTarefa`
- **Parâmetros**: `id` (número)

### Tratamento de Erros

- Erros 400: Requisições inválidas
- Erros 404: Recurso não encontrado
- Erros 500: Erro interno do servidor

### Segurança

- Validação de entrada em todas as rotas
- Sanitização de dados antes de interagir com o banco
- Uso de variáveis de ambiente para dados sensíveis
- Implementação de CORS

### Performance

- Conexão com banco de dados via pool
- Queries otimizadas com índices apropriados
- Paginação implementada para grandes conjuntos de dados

## Dependências

- `express`: Framework web
- `pg`: Cliente PostgreSQL
- `dotenv`: Gerenciamento de variáveis de ambiente
- `cors`: Middleware para CORS

## Monitoramento e Logs

- Logs de erro detalhados
- Endpoint de health check (/health)
- Monitoramento de conexões do banco de dados

## Considerações de Deployment

- Necessário PostgreSQL >= 12
- Node.js >= 14
- Variáveis de ambiente configuradas
- Porta 3000 disponível (ou configurável via PORT)

## Próximos Passos

1. Implementar autenticação e autorização
2. Adicionar testes automatizados
3. Implementar cache para melhorar performance
4. Adicionar documentação OpenAPI/Swagger
5. Implementar rate limiting 