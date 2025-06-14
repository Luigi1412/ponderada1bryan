const EnderecoModel = require('../models/EnderecoModel');
const UserModel = require('../models/UserModel'); // Para buscar usuários para o formulário

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

// Renderiza a página de listagem de endereços
exports.listarPage = async (req, res) => {
  try {
    const enderecos = await EnderecoModel.getAll();
    res.render('enderecos/index', { enderecos, title: 'Endereços', description: 'Liste, crie e gerencie os endereços dos usuários.' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Renderiza a página do formulário para criar ou editar um endereço
exports.formPage = async (req, res) => {
  try {
    const [endereco, usuarios] = await Promise.all([
      req.params.id ? EnderecoModel.getById(req.params.id) : null,
      UserModel.getAll()
    ]);
    
    const title = endereco ? 'Editar Endereço' : 'Novo Endereço';
    const description = endereco ? 'Altere os detalhes do endereço.' : 'Preencha os dados para registrar um novo endereço.';

    res.render('enderecos/form', { 
      title,
      description,
      endereco,
      usuarios,
      action: endereco ? `/api/enderecos/${req.params.id}?_method=PUT` : '/api/enderecos'
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ==================== MÉTODOS DE API PARA FETCH ====================

// Lista todos os endereços (API)
exports.apiListar = async (req, res) => {
  try {
    const enderecos = await EnderecoModel.getAll();
    res.json(enderecos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cria um novo endereço (API)
exports.apiCriar = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    
    const { user_id, rua, numero, cidade, estado, cep } = req.body;
    
    // Validação dos campos obrigatórios
    if (!user_id || !rua || !numero || !cidade || !estado || !cep) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios.',
        missing: {
          user_id: !user_id,
          rua: !rua,
          numero: !numero,
          cidade: !cidade,
          estado: !estado,
          cep: !cep
        }
      });
    }

    const novoEndereco = await EnderecoModel.create({ 
      user_id: parseInt(user_id), 
      rua, 
      numero, 
      cidade, 
      estado, 
      cep 
    });
    
    console.log('Endereço criado:', novoEndereco);
    res.status(201).json({ 
      success: true, 
      message: 'Endereço criado com sucesso',
      data: novoEndereco 
    });
  } catch (err) {
    console.error('Erro ao criar endereço:', err);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: err.message 
    });
  }
};

// Atualiza um endereço (API)
exports.apiAtualizar = async (req, res) => {
  try {
    console.log('Atualizando endereço ID:', req.params.id);
    console.log('Dados recebidos:', req.body);
    
    const { user_id, rua, numero, cidade, estado, cep } = req.body;
    
    // Validação dos campos obrigatórios
    if (!user_id || !rua || !numero || !cidade || !estado || !cep) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios.',
        missing: {
          user_id: !user_id,
          rua: !rua,
          numero: !numero,
          cidade: !cidade,
          estado: !estado,
          cep: !cep
        }
      });
    }

    const updated = await EnderecoModel.update(req.params.id, { 
      user_id: parseInt(user_id), 
      rua, 
      numero, 
      cidade, 
      estado, 
      cep 
    });
    
    if (updated) {
      console.log('Endereço atualizado:', updated);
      res.json({ 
        success: true, 
        message: 'Endereço atualizado com sucesso',
        data: updated 
      });
    } else {
      res.status(404).json({ error: 'Endereço não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao atualizar endereço:', err);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: err.message 
    });
  }
};

// Deleta um endereço (API)
exports.apiDeletar = async (req, res) => {
  try {
    const deleted = await EnderecoModel.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'Endereço excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Endereço não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};