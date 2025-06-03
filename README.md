# Sistema de Reserva de Hotel

Este é um sistema de reserva de hotel desenvolvido com Node.js, Express e Supabase. O sistema permite gerenciar usuários, quartos e reservas de um hotel.

## Funcionalidades

- Gerenciamento de usuários
- Gerenciamento de quartos e categorias
- Sistema de reservas
- Verificação de disponibilidade
- Gerenciamento de endereços
- Histórico de reservas por usuário

## Tecnologias Utilizadas

- Node.js
- Express.js
- Supabase (PostgreSQL)
- Jest
- express-validator

## Pré-requisitos

- Node.js 18+
- Conta no Supabase
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/hotel-reservation-system.git
cd hotel-reservation-system
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais do Supabase

```bash
cp .env.example .env
```

## Estrutura do Projeto

```
.
├── src/
│   ├── config/          # Configurações do projeto
│   ├── controllers/     # Controladores da aplicação
│   ├── models/         # Modelos de dados
│   ├── routes/         # Rotas da API
│   ├── services/       # Serviços de negócio
│   └── server.js       # Arquivo principal
├── tests/              # Testes automatizados
├── .env.example        # Exemplo de variáveis de ambiente
├── package.json        # Dependências e scripts
└── README.md          # Este arquivo
```

## Como Executar

1. Em desenvolvimento:
```bash
npm run dev
```

2. Em produção:
```bash
npm start
```

3. Executar testes:
```bash
npm test
```

## API Endpoints

### Usuários
- `POST /api/users` - Criar usuário
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Quartos
- `POST /api/rooms` - Criar quarto
- `GET /api/rooms` - Listar quartos
- `GET /api/rooms/:id` - Buscar quarto
- `PUT /api/rooms/:id` - Atualizar quarto
- `DELETE /api/rooms/:id` - Deletar quarto
- `GET /api/rooms/available` - Listar quartos disponíveis

### Reservas
- `POST /api/reservations` - Criar reserva
- `GET /api/reservations` - Listar reservas
- `GET /api/reservations/:id` - Buscar reserva
- `PUT /api/reservations/:id` - Atualizar reserva
- `DELETE /api/reservations/:id` - Cancelar reserva
- `GET /api/users/:id/reservations` - Listar reservas do usuário

## Arquitetura

O projeto segue a arquitetura MVC (Model-View-Controller) com uma camada adicional de Services para lógica de negócios. Para mais detalhes sobre a arquitetura e o modelo de dados, consulte o arquivo [WAD.md](WAD.md).

## Contribuindo

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC. 