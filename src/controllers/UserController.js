const UsuarioModel = require('../models/UsuarioModel');

// Cria um novo usuário
exports.criar = async (req, res) => {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    const novoUsuario = await UsuarioModel.create({ nome, email });
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os usuários
exports.listar = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtém um usuário específico
exports.obter = async (req, res) => {
  try {
    const usuario = await UsuarioModel.getById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza um usuário
exports.atualizar = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const usuarioAtualizado = await UsuarioModel.update(req.params.id, { nome, email });
    if (!usuarioAtualizado) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.status(200).json(usuarioAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclui um usuário
exports.excluir = async (req, res) => {
  try {
    const usuarioExcluido = await UsuarioModel.delete(req.params.id);
    if (!usuarioExcluido) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const usuario = await UsuarioModel.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const usuario = await UsuarioModel.update(req.params.id, req.body);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await UsuarioModel.delete(req.params.id);
    res.json({ message: 'Usuário excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};