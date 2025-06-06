const pool = require('../config/database');

const ReservationModel = {
  // Busca todas as reservas para preencher os formulários
  async getAll() {
    const query = `
      SELECT 
        r.id,
        r.data_checkin,
        r.data_checkout,
        u.nome as usuario_nome,
        rm.numero as quarto_numero
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN rooms rm ON r.room_id = rm.id
      ORDER BY r.data_checkin DESC;
    `;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Erro ao buscar todas as reservas no model:', err.message);
      throw err;
    }
  },

  // Poderíamos adicionar aqui os métodos create, update, delete, etc. para reservas no futuro.
};

module.exports = ReservationModel; 