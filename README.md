# Sistema de Gerenciamento de Tarefas e Reservas

Este é um sistema completo de gerenciamento de tarefas, reservas de hotel e entidades relacionadas, com frontend em EJS e Tailwind CSS e backend em Node.js, utilizando Express e PostgreSQL.

## Funcionalidades

- CRUD completo para Usuários, Quartos, Reservas, Endereços, Avaliações, Pagamentos, Categorias de Quartos, Projetos, Tarefas e Comentários
- Interface web moderna com EJS e Tailwind CSS
- API RESTful para integração com outros sistemas
- Validação de dados e tratamento de erros
- Estrutura MVC clara

## Tecnologias Utilizadas

- Node.js
- Express
- EJS (Template Engine)
- PostgreSQL
- Tailwind CSS
- Fetch API
- Supabase (opcional)
- express-ejs-layouts

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

## Estrutura de Pastas

```
src/
  controllers/
  models/
  routes/
  services/
  middlewares/
  server.js
views/
  layout.ejs
  partials/
  users/
  rooms/
  reservations/
  enderecos/
  avaliacoes/
  pagamentos/
  categorias-quartos/
  projetos/
  tarefas/
  comentarios/
public/
  (assets estáticos)
```

## Endpoints Principais

Veja o arquivo [WAD.md](./WAD.md) para a lista completa de endpoints e exemplos de uso.

## Testes

- Teste os endpoints usando o arquivo `requests.http` ou ferramentas como Postman.
- Teste as views acessando as rotas no navegador.

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request