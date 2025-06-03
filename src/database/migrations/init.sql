CREATE TABLE categorias_quartos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE enderecos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  rua VARCHAR(255),
  numero VARCHAR(50),
  cidade VARCHAR(255),
  estado VARCHAR(2),
  cep VARCHAR(8),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  numero INTEGER NOT NULL,
  descricao TEXT,
  capacidade INTEGER NOT NULL,
  categoria_id INTEGER,
  FOREIGN KEY (categoria_id) REFERENCES categorias_quartos(id)
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  data_checkin TIMESTAMP NOT NULL,
  data_checkout TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pendente',
  preco_reserva DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE pagamentos (
  id SERIAL PRIMARY KEY,
  reserva_id INTEGER NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_pagamento TIMESTAMP,
  metodo VARCHAR(50),
  status VARCHAR(50) DEFAULT 'confirmado',
  FOREIGN KEY (reserva_id) REFERENCES reservations(id)
);

CREATE TABLE avaliacoes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  nota INTEGER CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT,
  data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

DROP TABLE IF EXISTS tarefas;

CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  status VARCHAR(50) DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Em Progresso', 'Concluída')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);