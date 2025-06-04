const RoomModel = require('../models/RoomModel');
const CategoriaQuartoModel = require('../models/CategoriaQuartoModel'); // Usado para validar a categoria do quarto

// Controller para gerenciar as requisições de Quartos (Rooms)

// Cria um novo quarto
exports.criar = async (req, res) => {
  try {
    const { numero_quarto, descricao, preco_por_noite, status, categoria_quarto_id } = req.body;

    if (!numero_quarto || preco_por_noite === undefined || !categoria_quarto_id) {
      return res.status(400).json({ error: 'Número do quarto, preço por noite e ID da categoria são obrigatórios.' });
    }

    // Valida se a categoria do quarto informada existe
    if (categoria_quarto_id) {
        const categoriaExiste = await CategoriaQuartoModel.getById(categoria_quarto_id);
        if (!categoriaExiste) {
        return res.status(400).json({ error: 'Categoria de quarto não encontrada.' });
        }
    }

    const novoQuarto = await RoomModel.create({ 
        numero_quarto, 
        descricao, 
        preco_por_noite, 
        status, 
        categoria_quarto_id 
    });
    res.status(201).json(novoQuarto); // Retorna o quarto criado
  } catch (err) {
    console.error('Erro no controller ao criar quarto:', err.message);
    if (err.code === '23505') { // Violação de unique constraint (ex: numero_quarto duplicado)
        return res.status(409).json({ error: 'Número de quarto já existe.' });
    } else if (err.code === '23503') { // Violação de chave estrangeira (categoria_quarto_id inválida)
        return res.status(400).json({ error: 'ID da categoria de quarto inválido.' });
    }
    res.status(500).json({ error: 'Erro interno ao criar quarto.', details: err.message });
  }
};

// Lista todos os quartos
exports.listar = async (req, res) => {
  try {
    const quartos = await RoomModel.getAll(); // O model já busca o nome da categoria
    res.status(200).json(quartos); // Retorna a lista de quartos
  } catch (err) {
    console.error('Erro no controller ao listar quartos:', err.message);
    res.status(500).json({ error: 'Erro interno ao listar quartos.', details: err.message });
  }
};

// Obtém um quarto específico pelo ID
exports.obter = async (req, res) => {
  const { id } = req.params;
  try {
    const quarto = await RoomModel.getById(id); // O model já busca o nome da categoria
    if (!quarto) {
      return res.status(404).json({ message: 'Quarto não encontrado.' });
    }
    res.status(200).json(quarto); // Retorna o quarto encontrado
  } catch (err) {
    console.error('Erro no controller ao obter quarto:', err.message);
    res.status(500).json({ error: 'Erro interno ao obter quarto.', details: err.message });
  }
};

// Atualiza um quarto existente
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  try {
    const { numero_quarto, descricao, preco_por_noite, status, categoria_quarto_id } = req.body;

    if (numero_quarto === undefined && descricao === undefined && preco_por_noite === undefined && status === undefined && categoria_quarto_id === undefined) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.'});
    }

    // Valida a categoria do quarto, se fornecida
    if (categoria_quarto_id) {
      const categoriaExiste = await CategoriaQuartoModel.getById(categoria_quarto_id);
      if (!categoriaExiste) {
        return res.status(400).json({ error: 'Categoria de quarto não encontrada para atualização.' });
      }
    }
    
    // Busca o quarto existente para permitir atualização parcial dos campos
    const quartoExistente = await RoomModel.getById(id);
    if (!quartoExistente) {
        return res.status(404).json({ message: 'Quarto não encontrado para atualização.' });
    }

    // Prepara os dados para atualização, usando valores existentes se não fornecidos
    const dadosAtualizacao = {
        numero_quarto: numero_quarto !== undefined ? numero_quarto : quartoExistente.numero_quarto,
        descricao: descricao !== undefined ? descricao : quartoExistente.descricao,
        preco_por_noite: preco_por_noite !== undefined ? preco_por_noite : quartoExistente.preco_por_noite,
        status: status !== undefined ? status : quartoExistente.status,
        categoria_quarto_id: categoria_quarto_id !== undefined ? categoria_quarto_id : quartoExistente.categoria_quarto_id,
    };

    const quartoAtualizado = await RoomModel.update(id, dadosAtualizacao);
    // O model de update retorna o quarto sem o nome da categoria. Para ter o nome, seria preciso buscar novamente.
    res.status(200).json(quartoAtualizado); // Retorna o quarto atualizado
  } catch (err) {
    console.error('Erro no controller ao atualizar quarto:', err.message);
    if (err.code === '23505') { // Violação de unique constraint (numero_quarto duplicado)
        return res.status(409).json({ error: 'Número de quarto já existe.' });
    } else if (err.code === '23503') { // Violação de chave estrangeira
        return res.status(400).json({ error: 'ID da categoria de quarto inválido para atualização.' });
    }
    res.status(500).json({ error: 'Erro interno ao atualizar quarto.', details: err.message });
  }
};

// Exclui um quarto
exports.excluir = async (req, res) => {
  const { id } = req.params;
  try {
    const quartoExcluido = await RoomModel.delete(id);
    if (!quartoExcluido) {
      return res.status(404).json({ message: 'Quarto não encontrado para exclusão.' });
    }
    res.status(200).json({ message: 'Quarto excluído com sucesso.', quarto: quartoExcluido });
  } catch (err) {
    console.error('Erro no controller ao excluir quarto:', err.message);
    res.status(500).json({ error: 'Erro interno ao excluir quarto.', details: err.message });
  }
}; 