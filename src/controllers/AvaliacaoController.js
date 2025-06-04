const AvaliacaoService = require('../services/AvaliacaoService');

class AvaliacaoController {
  static async criar(req, res) {
    try {
      const avaliacao = await AvaliacaoService.createAvaliacao(req.body);
      res.status(201).json(avaliacao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async listar(req, res) {
    const avaliacoes = await AvaliacaoService.getAllAvaliacoes();
    res.json(avaliacoes);
  }
  static async buscarPorId(req, res) {
    const avaliacao = await AvaliacaoService.getAvaliacao(req.params.id);
    if (avaliacao) res.json(avaliacao);
    else res.status(404).json({ error: 'Avaliação não encontrada' });
  }
  static async atualizar(req, res) {
    try {
      const avaliacao = await AvaliacaoService.updateAvaliacao(req.params.id, req.body);
      res.json(avaliacao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async deletar(req, res) {
    try {
      await AvaliacaoService.deleteAvaliacao(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async listarPorQuarto(req, res) {
    const avaliacoes = await AvaliacaoService.getAvaliacoesByRoom(req.params.room_id);
    res.json(avaliacoes);
  }
}

module.exports = AvaliacaoController;