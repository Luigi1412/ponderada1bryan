const pool = require('../config/database');

const EnderecoModel = {
  // Cria um novo endereço
  async create({ user_id, rua, numero, cidade, estado, cep }) {
    const query = `
      INSERT INTO enderecos (user_id, rua, numero, cidade, estado, cep)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [user_id, rua, numero, cidade, estado, cep];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao criar endereço no model:', err.message);
      throw err;
    }
  },

  // Busca todos os endereços, incluindo o nome do usuário
  async getAll() {
    const query = `
      SELECT 
        e.*,
        u.nome as usuario_nome
      FROM enderecos e
      LEFT JOIN users u ON e.user_id = u.id
      ORDER BY u.nome, e.cidade;
    `;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Erro ao buscar todos os endereços no model:', err.message);
      throw err;
    }
  },

  // Busca um endereço pelo ID
  async getById(id) {
    const query = `
      SELECT 
        e.*,
        u.nome as usuario_nome
      FROM enderecos e
      LEFT JOIN users u ON e.user_id = u.id
      WHERE e.id = $1;
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao buscar endereço por id no model:', err.message);
      throw err;
    }
  },

  // Atualiza um endereço
  async update(id, fields) {
    const { user_id, rua, numero, cidade, estado, cep } = fields;
    
    // Busca o endereço atual para mesclar com os novos dados
    const currentEndereco = await this.getById(id);
    if (!currentEndereco) {
        throw new Error('Endereço não encontrado');
    }

    const query = `
      UPDATE enderecos 
      SET 
        user_id = $1, 
        rua = $2, 
        numero = $3, 
        cidade = $4, 
        estado = $5, 
        cep = $6
      WHERE id = $7 
      RETURNING *;
    `;
    
    const values = [
      user_id || currentEndereco.user_id,
      rua || currentEndereco.rua,
      numero || currentEndereco.numero,
      cidade || currentEndereco.cidade,
      estado || currentEndereco.estado,
      cep || currentEndereco.cep,
      id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar endereço no model:', err.message);
      throw err;
    }
  },

  // Exclui um endereço
  async delete(id) {
    const query = 'DELETE FROM enderecos WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao excluir endereço no model:', err.message);
      throw err;
    }
  }
};

module.exports = EnderecoModel;