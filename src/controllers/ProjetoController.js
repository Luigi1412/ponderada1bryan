const ProjetoModel = require('../models/ProjetoModel');

exports.criar = async (req, res) => {
  try {
    const projeto = await ProjetoModel.create(req.body);
    res.status(201).json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const projetos = await ProjetoModel.getAll();
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const projeto = await ProjetoModel.getById(req.params.id);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const projeto = await ProjetoModel.update(req.params.id, req.body);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const projeto = await ProjetoModel.delete(req.params.id);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json({ message: 'Projeto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};