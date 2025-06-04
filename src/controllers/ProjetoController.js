const ProjetoModel = require('../models/ProjetoModel');

// Controller para gerenciar as requisições de Projetos

// Cria um novo projeto
exports.criarProjeto = async (req, res) => {
  try {
    const { nome, descricao, data_conclusao_prevista, status, usuario_id } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O nome do projeto é obrigatório.' });
    }
    // Validações adicionais (formato de data, existência do usuario_id) podem ser feitas aqui

    const novoProjeto = await ProjetoModel.create({ nome, descricao, data_conclusao_prevista, status, usuario_id });
    res.status(201).json(novoProjeto); // Retorna o projeto criado
  } catch (err) {
    console.error('Erro no controller ao criar projeto:', err.message);
    if (err.code === '23503') { // Violação de chave estrangeira (ex: usuario_id não existe)
        return res.status(400).json({ error: 'ID de usuário inválido ou não existente.' });
    }
    res.status(500).json({ error: 'Erro interno ao criar projeto.', details: err.message });
  }
};

// Lista todos os projetos
exports.listarProjetos = async (req, res) => {
  try {
    const projetos = await ProjetoModel.getAll();
    res.status(200).json(projetos); // Retorna a lista de projetos
  } catch (err) {
    console.error('Erro no controller ao listar projetos:', err.message);
    res.status(500).json({ error: 'Erro interno ao listar projetos.', details: err.message });
  }
};

// Obtém um projeto específico pelo ID
exports.obterProjeto = async (req, res) => {
  const { id } = req.params;
  try {
    const projeto = await ProjetoModel.getById(id);
    if (!projeto) {
      return res.status(404).json({ message: 'Projeto não encontrado.' });
    }
    res.status(200).json(projeto); // Retorna o projeto encontrado
  } catch (err) {
    console.error('Erro no controller ao obter projeto:', err.message);
    res.status(500).json({ error: 'Erro interno ao obter projeto.', details: err.message });
  }
};

// Edita um projeto existente
exports.editarProjeto = async (req, res) => {
  const { id } = req.params;
  try {
    const { nome, descricao, data_conclusao_prevista, status, usuario_id } = req.body;
    
    if (!nome && !descricao && !data_conclusao_prevista && !status && usuario_id === undefined) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.'});
    }

    // Lembrete: O ProjetoModel.update atual espera todos os campos.
    // Para atualização parcial, o model precisaria ser ajustado ou buscar o projeto antes.
    const dadosParaAtualizar = { nome, descricao, data_conclusao_prevista, status, usuario_id };
    
    const projetoAtualizado = await ProjetoModel.update(id, dadosParaAtualizar);
    
    if (!projetoAtualizado) {
      return res.status(404).json({ message: 'Projeto não encontrado para atualização.' });
    }
    res.status(200).json(projetoAtualizado); // Retorna o projeto atualizado
  } catch (err) {
    console.error('Erro no controller ao editar projeto:', err.message);
    if (err.code === '23503') { // Violação de chave estrangeira
        return res.status(400).json({ error: 'ID de usuário inválido ou não existente para atualização.' });
    }
    res.status(500).json({ error: 'Erro interno ao editar projeto.', details: err.message });
  }
};

// Exclui um projeto
exports.excluirProjeto = async (req, res) => {
  const { id } = req.params;
  try {
    const projetoExcluido = await ProjetoModel.delete(id);
    if (!projetoExcluido) {
      return res.status(404).json({ message: 'Projeto não encontrado para exclusão.' });
    }
    // Lembrete: ON DELETE CASCADE na tabela Tarefa excluirá tarefas associadas.
    res.status(200).json({ message: 'Projeto excluído com sucesso.', projeto: projetoExcluido });
  } catch (err) {
    console.error('Erro no controller ao excluir projeto:', err.message);
    res.status(500).json({ error: 'Erro interno ao excluir projeto.', details: err.message });
  }
}; 