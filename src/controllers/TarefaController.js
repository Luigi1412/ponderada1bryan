const TarefaModel = require('../models/TarefaModel');

// Cria uma nova tarefa
exports.criarTarefa = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }
    const novaTarefa = await TarefaModel.create({ nome });
    res.status(201).json(novaTarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todas as tarefas
exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaModel.getAll();
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
    const { nome } = req.body;
    const tarefaAtualizada = await TarefaModel.update(req.params.id, { nome });
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

// ==================== MÉTODOS DE API PARA FETCH ====================

exports.apiListar = async (req, res) => {
  try {
    const tarefas = await TarefaModel.getAll();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiCriar = async (req, res) => {
  try {
    const tarefa = await TarefaModel.create(req.body);
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiAtualizar = async (req, res) => {
  try {
    const tarefa = await TarefaModel.update(req.params.id, req.body);
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.apiDeletar = async (req, res) => {
  try {
    await TarefaModel.delete(req.params.id);
    res.json({ message: 'Tarefa excluída' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};