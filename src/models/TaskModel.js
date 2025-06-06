const pool = require('../config/database');

// Model para gerenciar as tarefas no banco de dados
const TaskModel = {
  // Cria uma nova tarefa
  async create({ titulo, descricao, status, projeto_id }) {
    const query = `
      INSERT INTO tarefas (titulo, descricao, status, projeto_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [titulo, descricao, status || 'Pendente', projeto_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna a tarefa criada
    } catch (err) {
      console.error('Erro ao criar tarefa no model:', err.message);
      throw err;
    }
  },

  // Busca todas as tarefas
  async getAll() {
    const query = 'SELECT * FROM tarefas ORDER BY data_criacao DESC;';
    try {
      const result = await pool.query(query);
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
  async update(id, { titulo, descricao, status, projeto_id }) {
    const query = `
      UPDATE tarefas 
      SET titulo = $1, descricao = $2, status = $3, projeto_id = $4
      WHERE id = $5 RETURNING *;
    `;
    const values = [titulo, descricao, status, projeto_id, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
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
      return result.rows[0];
    } catch (err) {
      console.error(`Erro ao excluir tarefa ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = TaskModel; 