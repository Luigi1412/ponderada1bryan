const CategoriaQuartoModel = require('../models/CategoriaQuartoModel');

// Cria uma nova categoria de quarto
exports.criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    const novaCategoria = await CategoriaQuartoModel.create({ nome, descricao });
    res.status(201).json(novaCategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todas as categorias de quarto
exports.listar = async (req, res) => {
  try {
    const categorias = await CategoriaQuartoModel.getAll();
    res.status(200).json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Busca categoria por ID
exports.obter = async (req, res) => {
  try {
    const categoria = await CategoriaQuartoModel.getById(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.status(200).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza categoria
exports.atualizar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const categoriaAtualizada = await CategoriaQuartoModel.update(req.params.id, { nome, descricao });
    if (!categoriaAtualizada) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.status(200).json(categoriaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclui categoria
exports.excluir = async (req, res) => {
  try {
    const categoriaExcluida = await CategoriaQuartoModel.delete(req.params.id);
    if (!categoriaExcluida) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.status(200).json({ message: 'Categoria excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const categorias = await CategoriaQuartoModel.getAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const categoria = await CategoriaQuartoModel.create(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const categoria = await CategoriaQuartoModel.update(req.params.id, req.body);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await CategoriaQuartoModel.delete(req.params.id);
    res.json({ message: 'Categoria excluída' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};