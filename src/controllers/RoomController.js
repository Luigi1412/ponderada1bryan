const RoomModel = require('../models/RoomModel');

// Cria um novo quarto
exports.criar = async (req, res) => {
  try {
    const { numero_quarto, descricao, preco_por_noite, status, categoria_quarto_id } = req.body;
    if (!numero_quarto) {
      return res.status(400).json({ error: 'Número do quarto é obrigatório.' });
    }
    const novoRoom = await RoomModel.create({ numero_quarto, descricao, preco_por_noite, status, categoria_quarto_id });
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
    const { numero_quarto, descricao, preco_por_noite, status, categoria_quarto_id } = req.body;
    const roomAtualizado = await RoomModel.update(req.params.id, { numero_quarto, descricao, preco_por_noite, status, categoria_quarto_id });
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