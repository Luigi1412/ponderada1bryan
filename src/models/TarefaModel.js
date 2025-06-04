const pool = require('../config/database');

// Model para gerenciar as tarefas no banco de dados
const TarefaModel = {
  // Cria uma nova tarefa
  async create({ nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista }) {
    const query = `
      INSERT INTO Tarefa (nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [nome, descricao, status || 'Pendente', projeto_id, responsavel_id, data_conclusao_prevista];
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
    const query = 'SELECT * FROM Tarefa ORDER BY created_at DESC;';
    try {
      const result = await pool.query(query);
      return result.rows; // Retorna lista de tarefas
    } catch (err) {
      console.error('Erro ao buscar todas as tarefas no model:', err.message);
      throw err;
    }
  },

  // Busca uma tarefa pelo ID
  async getById(id) {
    const query = 'SELECT * FROM Tarefa WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna a tarefa encontrada ou undefined
    } catch (err) {
      console.error(`Erro ao buscar tarefa por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza uma tarefa existente
  async update(id, { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista }) {
    // The trigger 'set_timestamp_tarefa' will automatically update 'updated_at'
    // However, explicitly setting it here ensures it reflects in the RETURNING * clause immediately if not relying on trigger for that.
    // For safety and explicitness, especially if the trigger logic changes or is missed.
    const query = `
      UPDATE Tarefa 
      SET nome = $1, descricao = $2, status = $3, projeto_id = $4, responsavel_id = $5, data_conclusao_prevista = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 RETURNING *;
    `;
    const values = [nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista, id];
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
    const query = 'DELETE FROM Tarefa WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna a tarefa excluída ou undefined
    } catch (err) {
      console.error(`Erro ao excluir tarefa ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = TarefaModel; 