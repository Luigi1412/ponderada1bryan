const TarefaModel = require('../models/TarefaModel');

// Cria uma nova tarefa
exports.criarTarefa = async (req, res) => {
  try {
    const { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }
    const novaTarefa = await TarefaModel.create({ nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista });
    res.status(201).json(novaTarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todas as tarefas
exports.listarTarefas = async (req, res) => {
  try {
    // Extrai os filtros da query string
    const { search, status, projeto_id, responsavel_id } = req.query;
    const filtros = { search, status, projeto_id, responsavel_id };

    const tarefas = await TarefaModel.getAll(filtros);
    res.status(200).json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtém uma tarefa específica
exports.obterTarefa = async (req, res) => {
  try {
    const tarefa = await TarefaModel.getById(req.params.id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    res.status(200).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edita uma tarefa
exports.editarTarefa = async (req, res) => {
  try {
    const { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista } = req.body;
    const tarefaAtualizada = await TarefaModel.update(req.params.id, { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista });
    if (!tarefaAtualizada) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    res.status(200).json(tarefaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclui uma tarefa
exports.excluirTarefa = async (req, res) => {
  try {
    const tarefaExcluida = await TarefaModel.delete(req.params.id);
    if (!tarefaExcluida) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};