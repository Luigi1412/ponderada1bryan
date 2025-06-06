const PagamentoModel = require('../models/PagamentoModel');
const ReservationModel = require('../models/ReservationModel');

// Renderiza a página de listagem de pagamentos
exports.listarPage = async (req, res) => {
  try {
    const pagamentos = await PagamentoModel.getAll();
    res.render('pagamentos/index', { pagamentos, title: 'Pagamentos', description: 'Liste, crie e gerencie os pagamentos das reservas.' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Renderiza a página do formulário para criar ou editar um pagamento
exports.formPage = async (req, res) => {
  try {
    const [pagamento, reservas] = await Promise.all([
      req.params.id ? PagamentoModel.getById(req.params.id) : null,
      ReservationModel.getAll()
    ]);
    
    const title = pagamento ? 'Editar Pagamento' : 'Novo Pagamento';
    const description = pagamento ? 'Altere os detalhes do pagamento.' : 'Preencha os dados para registrar um novo pagamento.';

    res.render('pagamentos/form', { 
      title,
      description,
      pagamento,
      reservas,
      action: pagamento ? `/api/pagamentos/${req.params.id}?_method=PUT` : '/api/pagamentos'
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ==================== MÉTODOS DE API ====================

// Lista todos os pagamentos com filtro opcional
exports.apiListar = async (req, res) => {
  try {
    const { status } = req.query; // Pega o status da query string
    const pagamentos = await PagamentoModel.getAll({ status });
    res.status(200).json(pagamentos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pagamentos: ' + err.message });
  }
};

// Cria um novo pagamento
exports.apiCriar = async (req, res) => {
  try {
    await PagamentoModel.create(req.body);
    res.redirect('/pagamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza um pagamento
exports.apiAtualizar = async (req, res) => {
  try {
    const updated = await PagamentoModel.update(req.params.id, req.body);
    if (updated) {
      res.redirect('/pagamentos');
    } else {
      res.status(404).json({ error: 'Pagamento não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deleta um pagamento
exports.apiDeletar = async (req, res) => {
  try {
    const deleted = await PagamentoModel.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'Pagamento excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Pagamento não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};