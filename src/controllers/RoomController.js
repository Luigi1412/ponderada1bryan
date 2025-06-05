const RoomModel = require('../models/RoomModel');

// Cria um novo quarto
exports.criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    const novoRoom = await RoomModel.create({ nome, descricao });
    res.status(201).json(novoRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os quartos
exports.listar = async (req, res) => {
  try {
    const rooms = await RoomModel.getAll();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Busca quarto por ID
exports.obter = async (req, res) => {
  try {
    const room = await RoomModel.getById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Quarto não encontrado.' });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza quarto
exports.atualizar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const roomAtualizado = await RoomModel.update(req.params.id, { nome, descricao });
    if (!roomAtualizado) return res.status(404).json({ error: 'Quarto não encontrado.' });
    res.status(200).json(roomAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclui quarto
exports.excluir = async (req, res) => {
  try {
    const roomExcluido = await RoomModel.delete(req.params.id);
    if (!roomExcluido) return res.status(404).json({ error: 'Quarto não encontrado.' });
    res.status(200).json({ message: 'Quarto excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const rooms = await RoomModel.getAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const room = await RoomModel.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const room = await RoomModel.update(req.params.id, req.body);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await RoomModel.delete(req.params.id);
    res.json({ message: 'Quarto excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};