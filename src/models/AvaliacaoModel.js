const pool = require('../config/database');

const AvaliacaoModel = {
  // Cria uma nova avaliação
  async create({ nota, comentario, usuario_id, room_id }) {
    const query = `
      INSERT INTO Avaliacao (nota, comentario, usuario_id, room_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
        r.numero_quarto as quarto_numero
      FROM Avaliacao a
      LEFT JOIN Usuario u ON a.usuario_id = u.id
      LEFT JOIN Room r ON a.room_id = r.id
      ORDER BY a.created_at DESC;
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
        r.numero_quarto as quarto_numero
      FROM Avaliacao a
      LEFT JOIN Usuario u ON a.usuario_id = u.id
      LEFT JOIN Room r ON a.room_id = r.id
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
      UPDATE Avaliacao 
      SET nota = $1, comentario = $2, updated_at = CURRENT_TIMESTAMP
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
    const query = 'DELETE FROM Avaliacao WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao excluir avaliação no model:', err.message);
      throw err;
    }
  }
};

module.exports = AvaliacaoModel;