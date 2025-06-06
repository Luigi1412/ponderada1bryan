# Sistema de Gerenciamento Hoteleiro Completo

Este é um sistema de gerenciamento para hotéis, permitindo o controle de tarefas, reservas, usuários e outras entidades. O projeto foi construído com Node.js, Express e PostgreSQL no backend, e uma interface visual interativa com EJS, CSS (Bootstrap) e a Fetch API no frontend.

## Funcionalidades Principais

- **Interface Visual Completa:** Páginas para listar, criar e editar todas as entidades do sistema.
- **CRUD para Múltiplas Entidades:** Gerenciamento de Usuários, Quartos, Reservas, Endereços, Avaliações, Pagamentos, etc.
- **API RESTful:** Endpoints de API para todas as funcionalidades, permitindo integração com outros sistemas.
- **Estrutura MVC:** Código organizado, separando a lógica de negócio (Models), as rotas (Routes) e a apresentação (Views/Controllers).

## Tecnologias Utilizadas

- **Backend:** Node.js, Express
- **Frontend:** EJS, Bootstrap, Fetch API
- **Banco de Dados:** PostgreSQL
- **Utilitários:** `express-ejs-layouts`, `nodemon`

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento local.

### 1. Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (geralmente vem com o Node.js)
- Uma instância do PostgreSQL em execução.

### 2. Instalação

```bash
# Clone o repositório para a sua máquina local
git clone https://github.com/seu-usuario/seu-repositorio.git

# Navegue até o diretório do projeto
cd seu-repositorio

# Instale todas as dependências do projeto
npm install
```

### 3. Configuração do Banco de Dados

Crie um arquivo chamado `.env` na raiz do projeto. Ele guardará as credenciais de acesso ao seu banco de dados. Copie e cole o conteúdo abaixo, substituindo pelos seus dados:

```env
# Credenciais do PostgreSQL
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_seu_banco
```

### 4. Execução

Com tudo configurado, inicie o servidor com o comando:

```bash
# Este comando usa o nodemon para reiniciar o servidor automaticamente
# sempre que um arquivo for alterado.
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## Estrutura de Pastas

A estrutura segue o padrão Model-View-Controller (MVC) para garantir a separação de responsabilidades:

```
/
├── public/           # Arquivos estáticos (CSS, imagens)
├── src/              # Código-fonte do backend
│   ├── controllers/  # Lógica de controle (o que acontece quando uma rota é acessada)
│   ├── models/       # Interação com o banco de dados
│   ├── routes/       # Definição das rotas da aplicação (views e API)
│   └── server.js     # Arquivo principal de configuração do servidor
├── views/            # Arquivos de template EJS (a interface visual)
├── .env.example      # Exemplo de arquivo de variáveis de ambiente
├── package.json      # Dependências e scripts do projeto
└── README.md         # Este arquivo
```

## Documentação da API

Para mais detalhes sobre os endpoints da API, consulte o arquivo `WAD.md`.