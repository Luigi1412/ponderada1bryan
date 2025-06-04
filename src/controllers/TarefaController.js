const TarefaModel = require('../models/TarefaModel');

// Controller para gerenciar as requisições de Tarefas

// Cria uma nova tarefa
exports.criarTarefa = async (req, res) => {
  try {
    // Extract all relevant fields from req.body
    const { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista } = req.body;
    
    // Basic validation (optional, can be expanded)
    if (!nome) {
      return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }

    const tarefaData = { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista };
    const novaTarefa = await TarefaModel.create(tarefaData);
    res.status(201).json(novaTarefa); // Retorna a tarefa criada
  } catch (err) {
    console.error('Erro no controller ao criar tarefa:', err.message);
    res.status(500).json({ error: 'Erro interno ao criar tarefa.', details: err.message });
  }
};

// Lista todas as tarefas
exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaModel.getAll();
    res.status(200).json(tarefas); // Retorna a lista de tarefas
  } catch (err) {
    console.error('Erro no controller ao listar tarefas:', err.message);
    res.status(500).json({ error: 'Erro interno ao listar tarefas.', details: err.message });
  }
};

// Obtém uma tarefa específica pelo ID
exports.obterTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await TarefaModel.getById(id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json(tarefa); // Retorna a tarefa encontrada
  } catch (err) {
    console.error('Erro no controller ao obter tarefa:', err.message);
    res.status(500).json({ error: 'Erro interno ao obter tarefa.', details: err.message });
  }
};

// Edita uma tarefa existente
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista } = req.body;

    // Basic validation (optional, can be expanded)
    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório para edição.' });
    }
    
    const tarefaData = { nome, descricao, status, projeto_id, responsavel_id, data_conclusao_prevista };
    const tarefaAtualizada = await TarefaModel.update(id, tarefaData);
    
    if (!tarefaAtualizada) {
      return res.status(404).json({ message: 'Tarefa não encontrada para atualização.' });
    }
    res.status(200).json(tarefaAtualizada); // Retorna a tarefa atualizada
  } catch (err) {
    console.error('Erro no controller ao editar tarefa:', err.message);
    res.status(500).json({ error: 'Erro interno ao editar tarefa.', details: err.message });
  }
};

// Exclui uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefaExcluida = await TarefaModel.delete(id);
    if (!tarefaExcluida) {
      return res.status(404).json({ message: 'Tarefa não encontrada para exclusão.' });
    }
    // The activity example returns { message: 'Tarefa excluída com sucesso' }
    // Returning the deleted object can also be useful, or a mix.
    // For consistency with the example: 
    res.status(200).json({ message: 'Tarefa excluída com sucesso.', tarefa: tarefaExcluida });
  } catch (err) {
    console.error('Erro no controller ao excluir tarefa:', err.message);
    res.status(500).json({ error: 'Erro interno ao excluir tarefa.', details: err.message });
  }
}; 