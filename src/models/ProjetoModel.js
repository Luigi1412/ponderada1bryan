const pool = require('../config/database');

// Model para gerenciar os projetos
const ProjetoModel = {
  // Cria um novo projeto
  async create({ nome, descricao, data_conclusao_prevista, status, usuario_id }) {
    const query = `
      INSERT INTO Projeto (nome, descricao, data_conclusao_prevista, status, usuario_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [nome, descricao, data_conclusao_prevista, status || 'Pendente', usuario_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o projeto criado
    } catch (err) {
      console.error('Erro ao criar projeto no model:', err.message);
      throw err;
    }
  },

  // Busca todos os projetos
  async getAll() {
    const query = 'SELECT * FROM Projeto ORDER BY created_at DESC;';
    try {
      const result = await pool.query(query);
      return result.rows; // Retorna lista de projetos
    } catch (err) {
      console.error('Erro ao buscar todos os projetos no model:', err.message);
      throw err;
    }
  },

  // Busca um projeto pelo ID
  async getById(id) {
    const query = 'SELECT * FROM Projeto WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o projeto encontrado ou undefined
    } catch (err) {
      console.error(`Erro ao buscar projeto por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza um projeto existente
  async update(id, { nome, descricao, data_conclusao_prevista, status, usuario_id }) {
    // O trigger 'set_timestamp_projeto' atualizará 'updated_at' automaticamente.
    const query = `
      UPDATE Projeto 
      SET nome = $1, descricao = $2, data_conclusao_prevista = $3, status = $4, usuario_id = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 RETURNING *;
    `;
    const values = [nome, descricao, data_conclusao_prevista, status, usuario_id, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o projeto atualizado ou undefined
    } catch (err) {
      console.error(`Erro ao atualizar projeto ${id} no model:`, err.message);
      throw err;
    }
  },

  // Exclui um projeto pelo ID
  async delete(id) {
    const query = 'DELETE FROM Projeto WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o projeto excluído ou undefined
    } catch (err) {
      console.error(`Erro ao excluir projeto ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = ProjetoModel; 