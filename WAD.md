# Documentação da Aplicação Web (WAD)

## Visão Geral da Arquitetura

Este projeto implementa uma API REST seguindo a arquitetura MVC (Model-View-Controller), utilizando Node.js com Express para o backend e PostgreSQL como banco de dados.

### Diagrama de Arquitetura

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Cliente   │     │  Controller  │     │    Model    │
│    HTTP     │────▶│   (Express)  │────▶│ (PostgreSQL)│
│   Request   │     │    Router    │     │    Data     │
└─────────────┘     └──────────────┘     └─────────────┘
       ▲                   │                    │
       │                   │                    │
       └───────────────────┴────────────────────┘
              Response (JSON/Error)
```

## Componentes do Sistema

### 1. Model (Banco de Dados)

#### Estrutura da Tabela
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

### 2. Controller

O controlador (`TarefaController.js`) implementa as seguintes operações:
- `criarTarefa`: Insere nova tarefa no banco
- `listarTarefas`: Recupera todas as tarefas
- `editarTarefa`: Atualiza uma tarefa existente
- `excluirTarefa`: Remove uma tarefa do banco

### 3. Rotas (Routes)

Endpoints da API:
- `POST /api/tarefas`: Criar tarefa
- `GET /api/tarefas`: Listar tarefas
- `PUT /api/tarefas/:id`: Atualizar tarefa
- `DELETE /api/tarefas/:id`: Excluir tarefa

## Fluxo de Dados

1. **Criação de Tarefa**
   ```
   Cliente → POST /api/tarefas → Controller → Model → DB
   ```

2. **Listagem de Tarefas**
   ```
   Cliente → GET /api/tarefas → Controller → Model → DB
   ```

3. **Atualização de Tarefa**
   ```
   Cliente → PUT /api/tarefas/:id → Controller → Model → DB
   ```

4. **Exclusão de Tarefa**
   ```
   Cliente → DELETE /api/tarefas/:id → Controller → Model → DB
   ```

## Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: PostgreSQL
- **Middleware**: 
  - `cors`: Para permitir requisições cross-origin
  - `body-parser`: Para processar requisições JSON
  - `dotenv`: Para gerenciar variáveis de ambiente

## Segurança

- Validação de entrada em todas as rotas
- Tratamento de erros centralizado
- Uso de variáveis de ambiente para configurações sensíveis
- Sanitização de queries SQL usando parametrização

## Escalabilidade

O sistema foi projetado considerando:
- Separação clara de responsabilidades (MVC)
- Modularização do código
- Conexão pooling para o banco de dados
- Possibilidade de implementar cache

## Manutenção

Para manter o sistema:
1. Monitorar logs do servidor
2. Realizar backups regulares do banco
3. Manter dependências atualizadas
4. Seguir padrões de código estabelecidos

## Melhorias Futuras

1. Implementar autenticação e autorização
2. Adicionar cache para otimizar consultas frequentes
3. Implementar sistema de logs mais robusto
4. Adicionar testes automatizados
5. Implementar documentação automática da API (Swagger)
