const pool = require('../config/database');

// Model para gerenciar as categorias de quarto
const CategoriaQuartoModel = {
  // Cria uma nova categoria de quarto
  async create({ nome, descricao }) {
    const query = `
      INSERT INTO CategoriaQuarto (nome, descricao, created_at, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [nome, descricao];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna a categoria criada
    } catch (err) {
      console.error('Erro ao criar categoria de quarto no model:', err.message);
      throw err;
    }
  },

  // Busca todas as categorias de quarto
  async getAll() {
    const query = 'SELECT * FROM CategoriaQuarto ORDER BY nome ASC;';
    try {
      const result = await pool.query(query);
      return result.rows; // Retorna lista de categorias
    } catch (err) {
      console.error('Erro ao buscar todas as categorias de quarto no model:', err.message);
      throw err;
    }
  },

  // Busca uma categoria de quarto pelo ID
  async getById(id) {
    const query = 'SELECT * FROM CategoriaQuarto WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna a categoria encontrada ou undefined
    } catch (err) {
      console.error(`Erro ao buscar categoria de quarto por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza uma categoria de quarto existente
  async update(id, { nome, descricao }) {
    const query = `
      UPDATE CategoriaQuarto 
      SET nome = $1, descricao = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3 RETURNING *;
    `;
    const values = [nome, descricao, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna a categoria atualizada ou undefined
    } catch (err) {
      console.error(`Erro ao atualizar categoria de quarto ${id} no model:`, err.message);
      throw err;
    }
  },

  // Exclui uma categoria de quarto pelo ID
  async delete(id) {
    const query = 'DELETE FROM CategoriaQuarto WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna a categoria excluída ou undefined
    } catch (err) {
      console.error(`Erro ao excluir categoria de quarto ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = CategoriaQuartoModel; 