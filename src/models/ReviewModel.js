const pool = require('../config/database');

const ReviewModel = {
  // Cria uma nova avaliação
  async create({ nota, comentario, usuario_id, room_id }) {
    const query = `
      INSERT INTO avaliacoes (nota, comentario, usuario_id, room_id, data_avaliacao)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [nota, comentario, usuario_id, room_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao criar avaliação no model:', err.message);
      throw err;
    }
  },

  // Busca todas as avaliações
  async getAll() {
    const query = `
      SELECT 
        a.*,
        u.nome as usuario_nome,
        r.numero as quarto_numero
      FROM avaliacoes a
      LEFT JOIN users u ON a.usuario_id = u.id
      LEFT JOIN rooms r ON a.room_id = r.id
      ORDER BY a.data_avaliacao DESC;
    `;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Erro ao buscar todas as avaliações no model:', err.message);
      throw err;
    }
  },

  // Busca uma avaliação pelo ID
  async getById(id) {
    const query = `
      SELECT 
        a.*,
        u.nome as usuario_nome,
        r.numero as quarto_numero
      FROM avaliacoes a
      LEFT JOIN users u ON a.usuario_id = u.id
      LEFT JOIN rooms r ON a.room_id = r.id
      WHERE a.id = $1;
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao buscar avaliação por id no model:', err.message);
      throw err;
    }
  },

  // Atualiza uma avaliação
  async update(id, { nota, comentario }) {
    const query = `
      UPDATE avaliacoes 
      SET nota = $1, comentario = $2
      WHERE id = $3 RETURNING *;
    `;
    const values = [nota, comentario, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar avaliação no model:', err.message);
      throw err;
    }
  },

  // Exclui uma avaliação
  async delete(id) {
    const query = 'DELETE FROM avaliacoes WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao excluir avaliação no model:', err.message);
      throw err;
    }
  }
};

module.exports = ReviewModel;