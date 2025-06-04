const PagamentoService = require('../services/PagamentoService');

class PagamentoController {
  static async criar(req, res) {
    try {
      const pagamento = await PagamentoService.createPagamento(req.body);
      res.status(201).json(pagamento);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async listar(req, res) {
    const pagamentos = await PagamentoService.getAllPagamentos();
    res.json(pagamentos);
  }
  static async buscarPorId(req, res) {
    const pagamento = await PagamentoService.getPagamento(req.params.id);
    if (pagamento) res.json(pagamento);
    else res.status(404).json({ error: 'Pagamento não encontrado' });
  }
  static async atualizar(req, res) {
    try {
      const pagamento = await PagamentoService.updatePagamento(req.params.id, req.body);
      res.json(pagamento);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async deletar(req, res) {
    try {
      await PagamentoService.deletePagamento(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async listarPorReserva(req, res) {
    const pagamentos = await PagamentoService.getPagamentosByReserva(req.params.reserva_id);
    res.json(pagamentos);
  }
}

module.exports = PagamentoController;