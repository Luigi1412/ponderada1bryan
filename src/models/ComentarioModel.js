const pool = require('../config/database');

// Model para gerenciar os comentários
const ComentarioModel = {
  // Cria um novo comentário
  async create({ texto, tarefa_id, usuario_id }) {
    const query = `
      INSERT INTO Comentario (texto, tarefa_id, usuario_id, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [texto, tarefa_id, usuario_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o comentário criado
    } catch (err) {
      console.error('Erro ao criar comentário no model:', err.message);
      throw err;
    }
  },

  // Busca todos os comentários de uma tarefa específica
  async getAllByTarefaId(tarefa_id) {
    const query = 'SELECT * FROM Comentario WHERE tarefa_id = $1 ORDER BY created_at ASC;';
    try {
      const result = await pool.query(query, [tarefa_id]);
      return result.rows; // Retorna lista de comentários da tarefa
    } catch (err) {
      console.error(`Erro ao buscar comentários da tarefa ${tarefa_id} no model:`, err.message);
      throw err;
    }
  },

  // Busca um comentário pelo ID
  async getById(id) {
    const query = 'SELECT * FROM Comentario WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o comentário encontrado ou undefined
    } catch (err) {
      console.error(`Erro ao buscar comentário por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza um comentário existente (geralmente só o texto)
  async update(id, { texto }) {
    const query = `
      UPDATE Comentario 
      SET texto = $1
      WHERE id = $2 RETURNING *;
    `;
    // A tabela Comentario não possui 'updated_at' no init.sql atual.
    const values = [texto, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o comentário atualizado ou undefined
    } catch (err) {
      console.error(`Erro ao atualizar comentário ${id} no model:`, err.message);
      throw err;
    }
  },

  // Exclui um comentário pelo ID
  async delete(id) {
    const query = 'DELETE FROM Comentario WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o comentário excluído ou undefined
    } catch (err) {
      console.error(`Erro ao excluir comentário ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = ComentarioModel; 