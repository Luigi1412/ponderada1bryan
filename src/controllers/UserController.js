const UsuarioModel = require('../models/UsuarioModel');

// Controller para gerenciar as requisições de Usuários

// Cria um novo usuário
exports.criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    // Adicionar aqui validação de formato de e-mail e força da senha se necessário

    const novoUsuario = await UsuarioModel.create({ nome, email, senha });
    res.status(201).json(novoUsuario); // Retorna o usuário criado (sem senha)
  } catch (err) {
    console.error('Erro no controller ao criar usuário:', err.message);
    if (err.code === '23505') { // Código de erro para violação de constraint unique (email duplicado)
        return res.status(409).json({ error: 'Email já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro interno ao criar usuário.', details: err.message });
  }
};

// Lista todos os usuários
exports.listar = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    res.status(200).json(usuarios); // Retorna a lista de usuários (sem senhas)
  } catch (err) {
    console.error('Erro no controller ao listar usuários:', err.message);
    res.status(500).json({ error: 'Erro interno ao listar usuários.', details: err.message });
  }
};

// Obtém um usuário específico pelo ID
exports.obter = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await UsuarioModel.getById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario); // Retorna o usuário encontrado (sem senha)
  } catch (err) {
    console.error('Erro no controller ao obter usuário:', err.message);
    res.status(500).json({ error: 'Erro interno ao obter usuário.', details: err.message });
  }
};

// Atualiza um usuário existente
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  try {
    const { nome, email, senha } = req.body;
    
    if (!nome && !email && !senha) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.'});
    }
    // Lembrete: O model atual do UsuarioModel.update espera todos os campos (nome, email, senha).
    // Para atualização parcial, o model precisaria ser ajustado.
    if (!nome || !email || !senha ) {
        return res.status(400).json({ error: 'Para atualizar, todos os campos (nome, email, senha) devem ser fornecidos.'});
    }

    const usuarioAtualizado = await UsuarioModel.update(id, { nome, email, senha });
    
    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
    }
    res.status(200).json(usuarioAtualizado); // Retorna o usuário atualizado (sem senha)
  } catch (err) {
    console.error('Erro no controller ao atualizar usuário:', err.message);
    if (err.code === '23505') { // Email duplicado em outra conta
        return res.status(409).json({ error: 'Email já cadastrado por outro usuário.' });
    }
    res.status(500).json({ error: 'Erro interno ao atualizar usuário.', details: err.message });
  }
};

// Exclui um usuário
exports.excluir = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioExcluido = await UsuarioModel.delete(id);
    if (!usuarioExcluido) {
      return res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso.', usuario: usuarioExcluido });
  } catch (err) {
    console.error('Erro no controller ao excluir usuário:', err.message);
    res.status(500).json({ error: 'Erro interno ao excluir usuário.', details: err.message });
  }
}; 