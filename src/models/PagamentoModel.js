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
      if (err.code === '23503') {
        throw new Error('Reserva não encontrada. Verifique se a reserva existe.');
      } else if (err.code === '23502') {
        throw new Error('Dados obrigatórios não fornecidos.');
      } else if (err.code === '23505') {
        throw new Error('Pagamento duplicado.');
      } else {
        throw new Error('Erro interno do banco de dados: ' + err.message);
      }
    }
  },

  // Busca todos os pagamentos, com filtro opcional por status
  async getAll({ status } = {}) {
    let query = `
      SELECT 
        p.id,
        p.reserva_id,
        p.valor,
        p.metodo,
        p.status,
        p.data_pagamento,
        u.nome as user_nome 
      FROM pagamentos p
      LEFT JOIN reservations r ON p.reserva_id = r.id
      LEFT JOIN users u ON r.user_id = u.id
    `;
    
    const values = [];
    
    if (status) {
      query += ' WHERE p.status = $1';
      values.push(status);
    }
    
    query += ' ORDER BY p.data_pagamento DESC;';

    try {
      const result = await pool.query(query, values);
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