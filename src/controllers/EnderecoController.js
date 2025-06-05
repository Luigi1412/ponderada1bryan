const EnderecoModel = require('../models/EnderecoModel');

// Cria um novo endereço
exports.criar = async (req, res) => {
  try {
    const { rua, numero, cidade, estado, usuario_id } = req.body;
    if (!rua || !numero || !cidade || !estado || !usuario_id) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    const novoEndereco = await EnderecoModel.create({ rua, numero, cidade, estado, usuario_id });
    res.status(201).json(novoEndereco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os endereços
exports.listar = async (req, res) => {
  try {
    const enderecos = await EnderecoModel.getAll();
    res.status(200).json(enderecos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Busca endereço por ID
exports.buscarPorId = async (req, res) => {
  try {
    const endereco = await EnderecoModel.getById(req.params.id);
    if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado.' });
    res.status(200).json(endereco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza endereço
exports.atualizar = async (req, res) => {
  try {
    const { rua, numero, cidade, estado, usuario_id } = req.body;
    const enderecoAtualizado = await EnderecoModel.update(req.params.id, { rua, numero, cidade, estado, usuario_id });
    if (!enderecoAtualizado) return res.status(404).json({ error: 'Endereço não encontrado.' });
    res.status(200).json(enderecoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deleta endereço
exports.deletar = async (req, res) => {
  try {
    const enderecoExcluido = await EnderecoModel.delete(req.params.id);
    if (!enderecoExcluido) return res.status(404).json({ error: 'Endereço não encontrado.' });
    res.status(200).json({ message: 'Endereço excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const enderecos = await EnderecoModel.getAll();
    res.json(enderecos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const endereco = await EnderecoModel.create(req.body);
    res.status(201).json(endereco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const endereco = await EnderecoModel.update(req.params.id, req.body);
    res.json(endereco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await EnderecoModel.delete(req.params.id);
    res.json({ message: 'Endereço excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};