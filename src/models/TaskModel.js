const pool = require('../config/database');

// Model para gerenciar as tarefas no banco de dados
const TaskModel = {
  // Cria uma nova tarefa
  async create({ nome, descricao, status }) {
    const query = `
      INSERT INTO tarefas (nome, descricao, status, created_at, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [nome, descricao, status || 'Pendente'];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna a tarefa criada
    } catch (err) {
      console.error('Erro ao criar tarefa no model:', err.message);
      throw err;
    }
  },

  // Busca todas as tarefas com filtros opcionais
  async getAll(filtros = {}) {
    let query = 'SELECT * FROM tarefas';
    const values = [];
    let paramIndex = 1;

    const whereClauses = [];
    if (filtros.search) {
      whereClauses.push(`nome ILIKE $${paramIndex++}`);
      values.push(`%${filtros.search}%`);
    }
    if (filtros.status) {
      whereClauses.push(`status = $${paramIndex++}`);
      values.push(filtros.status);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' ORDER BY created_at DESC;';

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error('Erro ao buscar todas as tarefas no model:', err.message);
      throw err;
    }
  },

  // Busca uma tarefa pelo ID
  async getById(id) {
    const query = 'SELECT * FROM tarefas WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error(`Erro ao buscar tarefa por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza uma tarefa existente
  async update(id, { nome, descricao, status }) {
    const query = `
      UPDATE tarefas 
      SET nome = $1, descricao = $2, status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 RETURNING *;
    `;
    const values = [nome, descricao, status, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna a tarefa atualizada ou undefined
    } catch (err) {
      console.error(`Erro ao atualizar tarefa ${id} no model:`, err.message);
      throw err;
    }
  },

  // Exclui uma tarefa pelo ID
  async delete(id) {
    const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna a tarefa excluída ou undefined
    } catch (err) {
      console.error(`Erro ao excluir tarefa ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = TaskModel; 