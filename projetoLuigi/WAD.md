
---

### 📄 `WAD.md`

```markdown
# Web Application Document (WAD)

## 🧾 Introdução

Este projeto é um sistema de reservas web que permite gerenciar usuários, quartos e reservas. O objetivo é aplicar o padrão MVC com Node.js e Express.js, organizando o projeto com boas práticas e mantendo uma estrutura escalável para futuras funcionalidades.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- EJS
- JavaScript (MVC)
- HTML/CSS
- Jest (para testes)

## 🧱 Diagrama do Banco de Dados

O sistema possui três entidades principais:

- **Users**: Armazena dados dos usuários.
- **Rooms**: Define os quartos disponíveis.
- **Reservations**: Liga usuários a quartos em períodos definidos.

### Relacionamentos

- Um usuário pode ter várias reservas.
- Um quarto pode ter várias reservas.
- Cada reserva está ligada a um único usuário e um único quarto.

![Diagrama do banco de dados](modelo-banco.png)

## 🔁 Estrutura MVC

- **Model**: Define os dados da aplicação.
- **View**: Interfaces em EJS (serão desenvolvidas nas próximas etapas).
- **Controller**: Regras de negócio e controle de fluxo entre model e view.

---

CREATE TABLE categorias_quartos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE enderecos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  rua TEXT,
  numero TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero INTEGER NOT NULL,
  descricao TEXT,
  capacidade INTEGER NOT NULL,
  categoria_id INTEGER,
  FOREIGN KEY (categoria_id) REFERENCES categorias_quartos(id)
);

CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  data_checkin TEXT NOT NULL,
  data_checkout TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  preco_reserva REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE pagamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reserva_id INTEGER NOT NULL,
  valor REAL NOT NULL,
  data_pagamento TEXT,
  metodo TEXT,
  status TEXT DEFAULT 'confirmado',
  FOREIGN KEY (reserva_id) REFERENCES reservations(id)
);

CREATE TABLE avaliacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  nota INTEGER CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT,
  data_avaliacao TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
