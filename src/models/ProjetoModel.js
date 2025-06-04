const pool = require('../config/database'); // ajuste o caminho se necessário

const ProjetoModel = {
  async create(data) {
    const { nome, descricao } = data;
    const query = 'INSERT INTO projetos (nome, descricao) VALUES ($1, $2) RETURNING *;';
    const values = [nome, descricao];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query('SELECT * FROM projetos;');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM projetos WHERE id = $1;', [id]);
    return result.rows[0];
  },

  async update(id, data) {
    const { nome, descricao } = data;
    const query = 'UPDATE projetos SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *;';
    const values = [nome, descricao, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM projetos WHERE id = $1 RETURNING *;', [id]);
    return result.rows[0];
  }
};

module.exports = ProjetoModel;