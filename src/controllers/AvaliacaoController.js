const AvaliacaoModel = require('../models/AvaliacaoModel');

// Cria uma nova avaliação
exports.criar = async (req, res) => {
  try {
    const { nota, comentario, usuario_id, tarefa_id } = req.body;
    if (!nota || !usuario_id || !tarefa_id) {
      return res.status(400).json({ error: 'Nota, usuário_id e tarefa_id são obrigatórios.' });
    }
    const novaAvaliacao = await AvaliacaoModel.create({ nota, comentario, usuario_id, tarefa_id });
    res.status(201).json(novaAvaliacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todas as avaliações
exports.listar = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoModel.getAll();
    res.status(200).json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Busca avaliação por ID
exports.buscarPorId = async (req, res) => {
  try {
    const avaliacao = await AvaliacaoModel.getById(req.params.id);
    if (!avaliacao) return res.status(404).json({ error: 'Avaliação não encontrada.' });
    res.status(200).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza avaliação
exports.atualizar = async (req, res) => {
  try {
    const { nota, comentario, usuario_id, tarefa_id } = req.body;
    const avaliacaoAtualizada = await AvaliacaoModel.update(req.params.id, { nota, comentario, usuario_id, tarefa_id });
    if (!avaliacaoAtualizada) return res.status(404).json({ error: 'Avaliação não encontrada.' });
    res.status(200).json(avaliacaoAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deleta avaliação
exports.deletar = async (req, res) => {
  try {
    const avaliacaoExcluida = await AvaliacaoModel.delete(req.params.id);
    if (!avaliacaoExcluida) return res.status(404).json({ error: 'Avaliação não encontrada.' });
    res.status(200).json({ message: 'Avaliação excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoModel.getAll();
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const avaliacao = await AvaliacaoModel.create(req.body);
    res.status(201).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const avaliacao = await AvaliacaoModel.update(req.params.id, req.body);
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await AvaliacaoModel.delete(req.params.id);
    res.json({ message: 'Avaliação excluída' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};