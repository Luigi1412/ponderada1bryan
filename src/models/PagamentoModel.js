const pool = require('../config/database');

const PagamentoModel = {
  // Cria um novo pagamento
  async create({ reserva_id, valor, metodo, status }) {
    const query = `
      INSERT INTO pagamentos (reserva_id, valor, metodo, status, data_pagamento)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const values = [reserva_id, valor, metodo, status];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao criar pagamento no model:', err.message);
      throw err;
    }
  },

  // Busca todos os pagamentos
  async getAll() {
    const query = `
      SELECT 
        p.*,
        r.id as reserva_id_display,
        u.nome as usuario_nome
      FROM pagamentos p
      JOIN reservations r ON p.reserva_id = r.id
      JOIN users u ON r.user_id = u.id
      ORDER BY p.data_pagamento DESC;
    `;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Erro ao buscar todos os pagamentos no model:', err.message);
      throw err;
    }
  },

  // Busca um pagamento pelo ID
  async getById(id) {
    const query = 'SELECT * FROM pagamentos WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao buscar pagamento por id no model:', err.message);
      throw err;
    }
  },

  // Atualiza um pagamento
  async update(id, fields) {
    const { reserva_id, valor, metodo, status } = fields;

    // Busca o pagamento atual para mesclar com os novos dados
    const currentPagamento = await this.getById(id);
    if (!currentPagamento) {
        throw new Error('Pagamento não encontrado');
    }

    const query = `
      UPDATE pagamentos 
      SET 
        reserva_id = $1, 
        valor = $2, 
        metodo = $3, 
        status = $4
      WHERE id = $5 
      RETURNING *;
    `;
    
    const values = [
      reserva_id || currentPagamento.reserva_id,
      valor || currentPagamento.valor,
      metodo || currentPagamento.metodo,
      status || currentPagamento.status,
      id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar pagamento no model:', err.message);
      throw err;
    }
  },

  // Exclui um pagamento
  async delete(id) {
    const query = 'DELETE FROM pagamentos WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao excluir pagamento no model:', err.message);
      throw err;
    }
  }
};

module.exports = PagamentoModel;