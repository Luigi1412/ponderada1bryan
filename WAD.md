# Sistema de Reserva de Hotel - Documentação Técnica

## Arquitetura MVC

### Model
A camada Model é responsável pela representação dos dados e regras de negócio. No nosso sistema, temos os seguintes modelos principais:

- **User**: Gerencia dados dos usuários
- **Room**: Gerencia dados dos quartos
- **Reservation**: Gerencia dados das reservas
- **RoomCategory**: Gerencia categorias de quartos

Cada modelo interage diretamente com o Supabase para operações CRUD.

### View
A camada View é representada pelos endpoints da API REST, que retornam dados em formato JSON. Futuramente, pode ser expandida para incluir uma interface web.

### Controller
Os controllers processam as requisições, aplicam regras de negócio através dos services e retornam respostas apropriadas:

- **UserController**: Gerencia operações relacionadas a usuários
- **RoomController**: Gerencia operações relacionadas a quartos
- **ReservationController**: Gerencia operações relacionadas a reservas

## Diagrama do Banco de Dados

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    number TEXT NOT NULL UNIQUE,
    category_id INTEGER REFERENCES room_categories(id),
    status TEXT DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    room_id INTEGER REFERENCES rooms(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    status TEXT DEFAULT 'pending',
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Brasil'
);
```

## Fluxo de Dados

1. O cliente faz uma requisição HTTP para um endpoint específico
2. O Router direciona a requisição para o Controller apropriado
3. O Controller utiliza os Services necessários para processar a requisição
4. Os Services utilizam os Models para interagir com o banco de dados
5. Os dados são retornados através da mesma cadeia até o cliente

## Endpoints da API

### Usuários
- `POST /api/users` - Criar novo usuário
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Quartos
- `POST /api/rooms` - Criar novo quarto
- `GET /api/rooms` - Listar quartos
- `GET /api/rooms/:id` - Buscar quarto por ID
- `PUT /api/rooms/:id` - Atualizar quarto
- `DELETE /api/rooms/:id` - Deletar quarto
- `GET /api/rooms/available` - Listar quartos disponíveis

### Reservas
- `POST /api/reservations` - Criar nova reserva
- `GET /api/reservations` - Listar reservas
- `GET /api/reservations/:id` - Buscar reserva por ID
- `PUT /api/reservations/:id` - Atualizar reserva
- `DELETE /api/reservations/:id` - Cancelar reserva
- `GET /api/users/:id/reservations` - Listar reservas de um usuário

## Stack Tecnológica

- **Backend**: Node.js com Express
- **Banco de Dados**: PostgreSQL via Supabase
- **ORM**: Supabase Client
- **Autenticação**: Supabase Auth
- **Validação**: express-validator
- **Testes**: Jest 