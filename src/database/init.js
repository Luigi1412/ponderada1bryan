const pool = require('../config/database');

const createTablesQueries = `
  DROP TABLE IF EXISTS comentarios, tarefas, projetos, pagamentos, avaliacoes, enderecos, reservations, rooms, categorias_quartos, users CASCADE;

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE categorias_quartos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL UNIQUE,
      descricao TEXT
  );

  CREATE TABLE rooms (
      id SERIAL PRIMARY KEY,
      numero_quarto VARCHAR(10) NOT NULL UNIQUE,
      descricao TEXT,
      preco_por_noite NUMERIC(10, 2) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'Disponível', -- Ex: Disponível, Ocupado, Manutenção
      categoria_id INTEGER REFERENCES categorias_quartos(id) ON DELETE SET NULL,
      data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
    data_checkin DATE NOT NULL,
    data_checkout DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Confirmada',
    data_reserva TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE enderecos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(50),
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cep VARCHAR(20) NOT NULL
  );
  
  CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES users(id),
    room_id INTEGER REFERENCES rooms(id),
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE pagamentos (
      id SERIAL PRIMARY KEY,
      reserva_id INTEGER REFERENCES reservations(id),
      valor NUMERIC(10, 2) NOT NULL,
      metodo VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE projetos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE tarefas (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descricao TEXT,
      status VARCHAR(50) DEFAULT 'Pendente',
      data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      projeto_id INTEGER REFERENCES projetos(id) ON DELETE CASCADE
  );

  CREATE TABLE comentarios (
      id SERIAL PRIMARY KEY,
      conteudo TEXT NOT NULL,
      tarefa_id INTEGER REFERENCES tarefas(id) ON DELETE CASCADE,
      usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

async function initDb() {
  const client = await pool.connect();
  try {
    console.log('Iniciando a criação das tabelas...');
    await client.query(createTablesQueries);
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar as tabelas:', err.stack);
  } finally {
    client.release();
    pool.end();
  }
}

initDb(); 