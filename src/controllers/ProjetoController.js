const ProjetoModel = require('../models/ProjetoModel');

// Cria um novo projeto
exports.criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    const novoProjeto = await ProjetoModel.create({ nome, descricao });
    res.status(201).json(novoProjeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os projetos
exports.listar = async (req, res) => {
  try {
    const projetos = await ProjetoModel.getAll();
    res.status(200).json(projetos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Busca projeto por ID
exports.buscarPorId = async (req, res) => {
  try {
    const projeto = await ProjetoModel.getById(req.params.id);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado.' });
    res.status(200).json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza projeto
exports.atualizar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const projetoAtualizado = await ProjetoModel.update(req.params.id, { nome, descricao });
    if (!projetoAtualizado) return res.status(404).json({ error: 'Projeto não encontrado.' });
    res.status(200).json(projetoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deleta projeto
exports.deletar = async (req, res) => {
  try {
    const projetoExcluido = await ProjetoModel.delete(req.params.id);
    if (!projetoExcluido) return res.status(404).json({ error: 'Projeto não encontrado.' });
    res.status(200).json({ message: 'Projeto excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const projetos = await ProjetoModel.getAll();
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const projeto = await ProjetoModel.create(req.body);
    res.status(201).json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const projeto = await ProjetoModel.update(req.params.id, req.body);
    res.json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await ProjetoModel.delete(req.params.id);
    res.json({ message: 'Projeto excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};