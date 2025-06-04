const ComentarioModel = require('../models/ComentarioModel');
const TarefaModel = require('../models/TarefaModel'); // Usado para verificar se a tarefa existe
// const UsuarioModel = require('../models/UsuarioModel'); // Descomentar se for validar a existência do usuário

// Controller para gerenciar as requisições de Comentários

// Cria um novo comentário para uma tarefa
exports.criarComentario = async (req, res) => {
  try {
    // Pega tarefa_id de req.params se existir (rota aninhada), senão de req.body
    const idDaTarefa = req.params.tarefaId || req.body.tarefa_id;
    const { texto, usuario_id } = req.body; // tarefa_id foi movido para idDaTarefa

    if (!texto || !idDaTarefa || !usuario_id) {
      return res.status(400).json({ error: 'Texto, ID da tarefa e ID do usuário são obrigatórios.' });
    }

    // Validação: Verificar se a tarefa associada existe
    const tarefaExiste = await TarefaModel.getById(idDaTarefa);
    if (!tarefaExiste) {
      return res.status(404).json({ error: 'Tarefa não encontrada para associar o comentário.' });
    }
    // Poderia validar se o usuario_id existe também, se necessário

    const novoComentario = await ComentarioModel.create({ texto, tarefa_id: idDaTarefa, usuario_id });
    res.status(201).json(novoComentario); // Retorna o comentário criado
  } catch (err) {
    console.error('Erro no controller ao criar comentário:', err.message);
    if (err.code === '23503') { // Violação de chave estrangeira (tarefa_id ou usuario_id inválido)
        return res.status(400).json({ error: 'ID da tarefa ou ID do usuário inválido(s).' });
    }
    res.status(500).json({ error: 'Erro interno ao criar comentário.', details: err.message });
  }
};

// Lista todos os comentários de uma tarefa específica
exports.listarComentariosPorTarefa = async (req, res) => {
  const { tarefaId } = req.params; // ID da tarefa vindo da rota
  try {
    // Validação: Verificar se a tarefa existe antes de listar os comentários
    const tarefaExiste = await TarefaModel.getById(tarefaId);
    if (!tarefaExiste) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    const comentarios = await ComentarioModel.getAllByTarefaId(tarefaId);
    res.status(200).json(comentarios); // Retorna a lista de comentários
  } catch (err) {
    console.error('Erro no controller ao listar comentários por tarefa:', err.message);
    res.status(500).json({ error: 'Erro interno ao listar comentários.', details: err.message });
  }
};

// Obtém um comentário específico pelo seu ID
exports.obterComentario = async (req, res) => {
  const { id } = req.params; // ID do comentário
  try {
    const comentario = await ComentarioModel.getById(id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentário não encontrado.' });
    }
    res.status(200).json(comentario); // Retorna o comentário encontrado
  } catch (err) {
    console.error('Erro no controller ao obter comentário:', err.message);
    res.status(500).json({ error: 'Erro interno ao obter comentário.', details: err.message });
  }
};

// Edita um comentário existente
exports.editarComentario = async (req, res) => {
  const { id } = req.params; // ID do comentário a ser editado
  try {
    const { texto } = req.body;
    if (!texto) {
      return res.status(400).json({ error: 'O texto do comentário é obrigatório para atualização.' });
    }
    // Aqui poderiam entrar verificações de permissão (ex: só o autor pode editar)

    const comentarioAtualizado = await ComentarioModel.update(id, { texto });
    if (!comentarioAtualizado) {
        return res.status(404).json({ message: 'Comentário não encontrado para atualização.' });
    }
    res.status(200).json(comentarioAtualizado); // Retorna o comentário atualizado
  } catch (err) {
    console.error('Erro no controller ao editar comentário:', err.message);
    res.status(500).json({ error: 'Erro interno ao editar comentário.', details: err.message });
  }
};

// Exclui um comentário
exports.excluirComentario = async (req, res) => {
  const { id } = req.params; // ID do comentário a ser excluído
  try {
    // Aqui poderiam entrar verificações de permissão
    const comentarioExcluido = await ComentarioModel.delete(id);
    if (!comentarioExcluido) {
      return res.status(404).json({ message: 'Comentário não encontrado para exclusão.' });
    }
    res.status(200).json({ message: 'Comentário excluído com sucesso.', comentario: comentarioExcluido });
  } catch (err) {
    console.error('Erro no controller ao excluir comentário:', err.message);
    res.status(500).json({ error: 'Erro interno ao excluir comentário.', details: err.message });
  }
}; 