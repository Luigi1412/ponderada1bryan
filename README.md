# Sistema de Gerenciamento Hoteleiro Completo

Este é um sistema completo de gerenciamento para hotéis, desenvolvido como projeto final da disciplina de Web Application Development. O sistema permite o controle completo de tarefas, reservas, usuários, endereços, avaliações, pagamentos e outras entidades relacionadas ao gerenciamento hoteleiro.

## 🎥 Vídeo de Demonstração

**[LINK DO VÍDEO AQUI]** - Demonstração completa do sistema (3-5 minutos)

*O vídeo mostra:*
- Apresentação do sistema em funcionamento (frontend e backend)
- Demonstração das funcionalidades principais (cadastro, listagem, edição, exclusão)
- Explicação da estrutura técnica (MVC, rotas, banco de dados, Fetch API)
- Principais desafios enfrentados e soluções aplicadas

## 📸 Screenshots do Sistema

### Interface Principal
![Dashboard Principal](assets/screenshots/dashboard.png)
*Tela principal do sistema com navegação entre todas as entidades*

### Gerenciamento de Usuários
![Listagem de Usuários](assets/screenshots/users-list.png)
*Lista todos os usuários cadastrados no sistema*

![Formulário de Usuário](assets/screenshots/user-form.png)
*Formulário para cadastrar ou editar usuários*

### Gerenciamento de Endereços
![Listagem de Endereços](assets/screenshots/addresses-list.png)
*Visualização de todos os endereços cadastrados*

![Formulário de Endereço](assets/screenshots/address-form.png)
*Formulário para cadastrar ou editar endereços*

### Gerenciamento de Reservas
![Listagem de Reservas](assets/screenshots/reservations-list.png)
*Controle completo de reservas de quartos*

### Gerenciamento de Pagamentos
![Listagem de Pagamentos](assets/screenshots/payments-list.png)
*Histórico e controle de pagamentos*

## 🚀 Funcionalidades Principais

### CRUD Completo para Todas as Entidades
- **Usuários:** Cadastro, edição, listagem e exclusão de usuários
- **Quartos:** Gerenciamento de quartos com categorias
- **Reservas:** Sistema completo de reservas com datas
- **Endereços:** Controle de endereços dos usuários
- **Avaliações:** Sistema de avaliações e comentários
- **Pagamentos:** Controle financeiro das reservas
- **Tarefas:** Gerenciamento de tarefas com comentários
- **Projetos:** Organização de projetos

### Interface Visual Moderna
- **Design Responsivo:** Adapta-se a diferentes tamanhos de tela
- **Bootstrap 5:** Interface moderna e profissional
- **Navegação Intuitiva:** Menu lateral com acesso rápido a todas as funcionalidades
- **Feedback Visual:** Validações em tempo real e mensagens de sucesso/erro

### API RESTful Completa
- **Endpoints REST:** Todos os recursos seguem padrões REST
- **JSON:** Comunicação via JSON para integração com outros sistemas
- **Validação:** Validação robusta de dados em todos os endpoints
- **Tratamento de Erros:** Respostas de erro padronizadas

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js:** Runtime JavaScript
- **Express.js:** Framework web para Node.js
- **PostgreSQL:** Banco de dados relacional
- **pg:** Driver PostgreSQL para Node.js

### Frontend
- **EJS:** Template engine para renderização server-side
- **Bootstrap 5:** Framework CSS para interface responsiva
- **Fetch API:** Comunicação assíncrona com o backend
- **JavaScript ES6+:** Funcionalidades interativas

### Ferramentas de Desenvolvimento
- **Nodemon:** Reinicialização automática do servidor
- **dotenv:** Gerenciamento de variáveis de ambiente
- **CORS:** Suporte a requisições cross-origin

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com o Node.js)
- **PostgreSQL** (versão 12 ou superior)

## 🔧 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/Luigi1412/ponderada1bryan.git
cd ponderada1bryan
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Banco de Dados

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do PostgreSQL
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_seu_banco

# Configurações do Servidor
PORT=3000
NODE_ENV=development
```

### 4. Inicialize o Banco de Dados

```bash
# Cria as tabelas no banco de dados
npm run init-db

# (Opcional) Popula o banco com dados de exemplo
npm run seed
```

### 5. Execute o Projeto

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
ponderada1bryan/
├── src/                    # Código-fonte do backend
│   ├── controllers/        # Controladores (lógica de negócio)
│   ├── models/            # Modelos (interação com banco)
│   ├── routes/            # Definição das rotas
│   ├── database/          # Scripts de banco de dados
│   └── server.js          # Arquivo principal do servidor
├── views/                 # Templates EJS
│   ├── layout.ejs         # Layout principal
│   ├── partials/          # Componentes reutilizáveis
│   ├── users/             # Views de usuários
│   ├── enderecos/         # Views de endereços
│   ├── reservations/      # Views de reservas
│   └── ...                # Outras entidades
├── public/                # Arquivos estáticos
│   ├── css/               # Estilos CSS
│   ├── js/                # Scripts JavaScript
│   └── assets/            # Imagens e outros recursos
├── assets/                # Screenshots e documentação
├── package.json           # Dependências e scripts
├── README.md              # Este arquivo
└── WAD.md                 # Documentação técnica detalhada
```

## 🔌 Endpoints da API

### Usuários
- `GET /api/users` - Lista todos os usuários
- `POST /api/users` - Cria um novo usuário
- `GET /api/users/:id` - Obtém um usuário específico
- `PUT /api/users/:id` - Atualiza um usuário
- `DELETE /api/users/:id` - Remove um usuário

### Endereços
- `GET /api/enderecos` - Lista todos os endereços
- `POST /api/enderecos` - Cria um novo endereço
- `GET /api/enderecos/:id` - Obtém um endereço específico
- `PUT /api/enderecos/:id` - Atualiza um endereço
- `DELETE /api/enderecos/:id` - Remove um endereço

### Reservas
- `GET /api/reservations` - Lista todas as reservas
- `POST /api/reservations` - Cria uma nova reserva
- `GET /api/reservations/:id` - Obtém uma reserva específica
- `PUT /api/reservations/:id` - Atualiza uma reserva
- `DELETE /api/reservations/:id` - Remove uma reserva

*Para ver todos os endpoints, consulte o arquivo `WAD.md`*

## 🧪 Testando o Sistema

### Interface Web
Acesse `http://localhost:3000` no seu navegador para usar a interface web completa.

### API REST
Use o arquivo `requests.http` ou ferramentas como Postman para testar os endpoints da API.

### Exemplo de Requisição
```bash
# Criar um novo usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "email": "joao@email.com"}'
```

## 🎯 Principais Desafios e Soluções

### 1. Estrutura MVC Robusta
**Desafio:** Organizar o código seguindo padrões MVC de forma clara e escalável.
**Solução:** Separação clara entre Models (dados), Views (interface) e Controllers (lógica), facilitando manutenção e evolução do sistema.

### 2. Integração Frontend-Backend
**Desafio:** Criar uma interface que se comunique de forma assíncrona com o backend.
**Solução:** Uso da Fetch API para comunicação AJAX, permitindo operações sem recarregar a página.

### 3. Validação de Dados
**Desafio:** Garantir integridade dos dados tanto no frontend quanto no backend.
**Solução:** Validação dupla com HTML5 no frontend e validação robusta no backend.

### 4. Relacionamentos entre Entidades
**Desafio:** Gerenciar relacionamentos complexos entre usuários, endereços, reservas e pagamentos.
**Solução:** Uso de chaves estrangeiras no banco de dados e queries JOIN para consultas relacionais.

## 📚 Aprendizados

### Técnicos
- Arquitetura MVC em Node.js com Express
- Integração com PostgreSQL usando queries SQL nativas
- Desenvolvimento de APIs RESTful completas
- Interface web responsiva com Bootstrap e EJS
- Comunicação assíncrona entre frontend e backend

### Conceituais
- Separação de responsabilidades em aplicações web
- Padrões de projeto para escalabilidade
- Importância da documentação técnica
- Versionamento de código com Git

## 🔮 Melhorias Futuras

- **Autenticação e Autorização:** Sistema de login e controle de acesso
- **Upload de Imagens:** Suporte para fotos de quartos e usuários
- **Relatórios:** Dashboard com gráficos e estatísticas
- **Notificações:** Sistema de alertas por email
- **Testes Automatizados:** Cobertura de testes unitários e de integração
- **Docker:** Containerização para facilitar deploy

## 👨‍💻 Autor

**Bryan** - Desenvolvido como projeto final da disciplina de Web Application Development.

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugerir melhorias.

---

**Projeto desenvolvido para a disciplina de Web Application Development - Inteli 2024**