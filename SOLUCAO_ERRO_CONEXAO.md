# Solução para Erro de Conexão ao Salvar Pagamento

## Problemas Identificados e Corrigidos

### 1. **Falta de Middlewares Essenciais**
- ✅ Adicionado `method-override` para processar `_method=PUT`
- ✅ Adicionado `bodyParser.urlencoded()` para processar dados de formulário

### 2. **Inconsistência nas Rotas**
- ✅ Corrigido o formulário para usar `_method` corretamente
- ✅ Corrigido o JavaScript para processar o método HTTP adequadamente

### 3. **Tratamento de Erros Melhorado**
- ✅ Melhorado o tratamento de erros no modelo
- ✅ Adicionado logs mais detalhados
- ✅ Melhoradas as mensagens de erro para o usuário

## Como Resolver o Problema

### Passo 1: Configurar o Banco de Dados

1. **Crie um arquivo `.env` na raiz do projeto:**
```bash
# Configurações do Banco de Dados PostgreSQL
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_SSL=false

# Ou use uma URL de conexão completa
# DATABASE_URL=postgresql://usuario:senha@host:porta/banco
```

2. **Teste a conexão com o banco:**
```bash
npm run test-db
```

### Passo 2: Inicializar o Banco de Dados

Se a tabela `pagamentos` não existir, execute:
```bash
npm run init-db
```

### Passo 3: Instalar Dependências

```bash
npm install
```

### Passo 4: Iniciar o Servidor

```bash
npm run dev
```

## Verificações Adicionais

### Se o erro persistir, verifique:

1. **PostgreSQL está rodando:**
```bash
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql
```

2. **Banco de dados existe:**
```sql
\l
```

3. **Tabela pagamentos existe:**
```sql
\dt pagamentos
```

4. **Logs do servidor:**
```bash
npm run dev
```

## Estrutura da Tabela Pagamentos

A tabela deve ter a seguinte estrutura:
```sql
CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER REFERENCES reservations(id),
    valor DECIMAL(10,2) NOT NULL,
    metodo VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testando a Funcionalidade

1. Acesse: `http://localhost:3000/pagamentos/novo`
2. Preencha o formulário
3. Clique em "Salvar Pagamento"
4. Verifique o console do navegador para logs detalhados

## Logs Úteis

- **Console do navegador:** Mostra detalhes da requisição
- **Terminal do servidor:** Mostra logs do backend
- **Banco de dados:** Verifique se os dados foram inseridos

## Contato

Se o problema persistir, verifique:
- Logs do console do navegador
- Logs do terminal do servidor
- Status da conexão com o banco 