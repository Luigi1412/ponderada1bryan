const AvaliacaoModel = require('../models/AvaliacaoModel');

const AvaliacaoController = {
  // Cria uma nova avaliação
  criar: async (req, res) => {
    try {
      const novaAvaliacao = await AvaliacaoModel.create(req.body);
      res.status(201).json(novaAvaliacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todas as avaliações
  listar: async (req, res) => {
    try {
      const avaliacoes = await AvaliacaoModel.getAll();
      res.status(200).json(avaliacoes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca avaliação por ID
  obter: async (req, res) => {
    try {
      const avaliacao = await AvaliacaoModel.getById(req.params.id);
      if (!avaliacao) return res.status(404).json({ error: 'Avaliação não encontrada.' });
      res.status(200).json(avaliacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza avaliação
  atualizar: async (req, res) => {
    try {
      const avaliacaoAtualizada = await AvaliacaoModel.update(req.params.id, req.body);
      if (!avaliacaoAtualizada) return res.status(404).json({ error: 'Avaliação não encontrada.' });
      res.status(200).json(avaliacaoAtualizada);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta avaliação
  excluir: async (req, res) => {
    try {
      const avaliacaoExcluida = await AvaliacaoModel.delete(req.params.id);
      if (!avaliacaoExcluida) return res.status(404).json({ error: 'Avaliação não encontrada.' });
      res.status(200).json({ message: 'Avaliação excluída com sucesso.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = AvaliacaoController;