const PagamentoModel = require('../models/PagamentoModel');

// Cria um novo pagamento
exports.criar = async (req, res) => {
  try {
    const { valor, metodo, usuario_id } = req.body;
    if (!valor || !metodo || !usuario_id) {
      return res.status(400).json({ error: 'Valor, método e usuário_id são obrigatórios.' });
    }
    const novoPagamento = await PagamentoModel.create({ valor, metodo, usuario_id });
    res.status(201).json(novoPagamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os pagamentos
exports.listar = async (req, res) => {
  try {
    const pagamentos = await PagamentoModel.getAll();
    res.status(200).json(pagamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Busca pagamento por ID
exports.buscarPorId = async (req, res) => {
  try {
    const pagamento = await PagamentoModel.getById(req.params.id);
    if (!pagamento) return res.status(404).json({ error: 'Pagamento não encontrado.' });
    res.status(200).json(pagamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza pagamento
exports.atualizar = async (req, res) => {
  try {
    const { valor, metodo, usuario_id } = req.body;
    const pagamentoAtualizado = await PagamentoModel.update(req.params.id, { valor, metodo, usuario_id });
    if (!pagamentoAtualizado) return res.status(404).json({ error: 'Pagamento não encontrado.' });
    res.status(200).json(pagamentoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deleta pagamento
exports.deletar = async (req, res) => {
  try {
    const pagamentoExcluido = await PagamentoModel.delete(req.params.id);
    if (!pagamentoExcluido) return res.status(404).json({ error: 'Pagamento não encontrado.' });
    res.status(200).json({ message: 'Pagamento excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const pagamentos = await PagamentoModel.getAll();
    res.json(pagamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const pagamento = await PagamentoModel.create(req.body);
    res.status(201).json(pagamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const pagamento = await PagamentoModel.update(req.params.id, req.body);
    res.json(pagamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await PagamentoModel.delete(req.params.id);
    res.json({ message: 'Pagamento excluído' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};