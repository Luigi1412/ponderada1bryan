# Sistema de Gerenciamento de Tarefas

Este é um sistema completo de gerenciamento de tarefas com frontend em EJS e backend em Node.js, utilizando Express e PostgreSQL.

## Funcionalidades

- Listagem de tarefas com interface moderna e responsiva
- Criação de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Status de tarefas (Pendente, Em Progresso, Concluída)
- Interface amigável e intuitiva

## Tecnologias Utilizadas

- Node.js
- Express
- EJS (Template Engine)
- PostgreSQL
- Tailwind CSS
- Fetch API

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- NPM ou Yarn

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_NAME=nome_do_banco
DB_HOST=localhost
DB_PORT=5432
```

4. Inicialize o banco de dados:
```bash
npm run init-db
```

## Executando o Sistema

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse o sistema no navegador:
```
http://localhost:3000
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request 

## Licença

Este projeto está sob a licença ISC. 