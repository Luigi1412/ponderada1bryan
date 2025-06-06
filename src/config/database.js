require('dotenv').config();
const { Pool } = require('pg');

const dbConfig = {};

if (process.env.DATABASE_URL) {
  // Se uma URL de conexão completa for fornecida (padrão do Heroku, Neon, etc.)
  dbConfig.connectionString = process.env.DATABASE_URL;
  dbConfig.ssl = { rejectUnauthorized: false }; // Provedores de nuvem geralmente exigem SSL
} else {
  // Fallback para configuração manual (ambiente de desenvolvimento local)
  dbConfig.user = process.env.DB_USER;
  dbConfig.host = process.env.DB_HOST;
  dbConfig.database = process.env.DB_NAME;
  dbConfig.password = process.env.DB_PASSWORD;
  dbConfig.port = process.env.DB_PORT;
  dbConfig.ssl = process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false;
}

// Criando a pool de conexões
const pool = new Pool(dbConfig);

// Testing the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
