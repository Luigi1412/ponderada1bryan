const Pagamento = require('../models/PagamentoModel');

class PagamentoService {
  static async createPagamento(data) {
    return await Pagamento.create(data);
  }
  static async updatePagamento(id, data) {
    return await Pagamento.update(id, data);
  }
  static async deletePagamento(id) {
    return await Pagamento.delete(id);
  }
  static async getPagamento(id) {
    return await Pagamento.findById(id);
  }
  static async getAllPagamentos() {
    return await Pagamento.findAll();
  }
  static async getPagamentosByReserva(reserva_id) {
    return await Pagamento.findByReservaId(reserva_id);
  }
}

module.exports = PagamentoService;