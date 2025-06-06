const pool = require('../config/database');

// Model para gerenciar os quartos (Room)
const RoomModel = {
  // Cria um novo quarto
  async create({ numero, descricao, capacidade, categoria_id }) {
    const query = `
      INSERT INTO rooms (numero, descricao, capacidade, categoria_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [numero, descricao, capacidade, categoria_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o quarto criado
    } catch (err) {
      console.error('Erro ao criar quarto no model:', err.message);
      throw err;
    }
  },

  // Busca todos os quartos, incluindo o nome da categoria
  async getAll() {
    const query = `
      SELECT 
        r.*,
        cq.nome as categoria_quarto_nome
      FROM rooms r
      LEFT JOIN categorias_quartos cq ON r.categoria_id = cq.id
      ORDER BY r.numero ASC;
    `;
    try {
      const result = await pool.query(query);
      return result.rows; // Retorna lista de quartos com nome da categoria
    } catch (err) {
      console.error('Erro ao buscar todos os quartos no model:', err.message);
      throw err;
    }
  },

  // Busca um quarto pelo ID, incluindo o nome da categoria
  async getById(id) {
    const query = `
      SELECT 
        r.*,
        cq.nome as categoria_quarto_nome
      FROM rooms r
      LEFT JOIN categorias_quartos cq ON r.categoria_id = cq.id
      WHERE r.id = $1;
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o quarto encontrado (com nome da categoria) ou undefined
    } catch (err) {
      console.error(`Erro ao buscar quarto por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza um quarto existente
  async update(id, { numero, descricao, capacidade, categoria_id }) {
    const query = `
      UPDATE rooms 
      SET numero = $1, descricao = $2, capacidade = $3, categoria_id = $4
      WHERE id = $5 RETURNING *;
    `;
    const values = [numero, descricao, capacidade, categoria_id, id];
    try {
      const result = await pool.query(query, values);
      // Nota: este retorno não inclui o nome da categoria. Se necessário, buscar novamente após o update.
      return result.rows[0]; // Retorna o quarto atualizado ou undefined
    } catch (err) {
      console.error(`Erro ao atualizar quarto ${id} no model:`, err.message);
      throw err;
    }
  },

  // Exclui um quarto pelo ID
  async delete(id) {
    const query = 'DELETE FROM rooms WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o quarto excluído ou undefined
    } catch (err) {
      console.error(`Erro ao excluir quarto ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = RoomModel; 