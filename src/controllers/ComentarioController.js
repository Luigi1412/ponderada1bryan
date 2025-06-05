const ComentarioModel = require('../models/ComentarioModel');

// Cria um novo comentário
exports.criarComentario = async (req, res) => {
  try {
    const { texto, tarefa_id, usuario_id } = req.body;
    if (!texto || !tarefa_id || !usuario_id) {
      return res.status(400).json({ error: 'Texto, tarefa_id e usuario_id são obrigatórios.' });
    }
    const novoComentario = await ComentarioModel.create({ texto, tarefa_id, usuario_id });
    res.status(201).json(novoComentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os comentários
exports.listarComentarios = async (req, res) => {
  try {
    const comentarios = await ComentarioModel.getAll();
    res.status(200).json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtém um comentário específico
exports.obterComentario = async (req, res) => {
  try {
    const comentario = await ComentarioModel.getById(req.params.id);
    if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado.' });
    res.status(200).json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edita um comentário
exports.editarComentario = async (req, res) => {
  try {
    const { texto } = req.body;
    const comentarioAtualizado = await ComentarioModel.update(req.params.id, { texto });
    if (!comentarioAtualizado) return res.status(404).json({ error: 'Comentário não encontrado.' });
    res.status(200).json(comentarioAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclui um comentário
exports.excluirComentario = async (req, res) => {
  try {
    const comentarioExcluido = await ComentarioModel.delete(req.params.id);
    if (!comentarioExcluido) return res.status(404).json({ error: 'Comentário não encontrado.' });
    res.status(200).json({ message: 'Comentário excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const comentarios = await ComentarioModel.getAll();
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const comentario = await ComentarioModel.create(req.body);
    res.status(201).json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const comentario = await ComentarioModel.update(req.params.id, req.body);
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await ComentarioModel.delete(req.params.id);
    res.json({ message: 'Comentário excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};