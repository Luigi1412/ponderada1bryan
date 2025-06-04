const CategoriaQuartoModel = require('../models/CategoriaQuartoModel');

// Controller para gerenciar as requisições de Categorias de Quarto

// Cria uma nova categoria de quarto
exports.criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O nome da categoria é obrigatório.' });
    }
    const novaCategoria = await CategoriaQuartoModel.create({ nome, descricao });
    res.status(201).json(novaCategoria); // Retorna a categoria criada
  } catch (err) {
    console.error('Erro no controller ao criar categoria de quarto:', err.message);
    if (err.code === '23505') { // Violação de unique constraint (nome duplicado)
        return res.status(409).json({ error: 'Nome de categoria já existe.' });
    }
    res.status(500).json({ error: 'Erro interno ao criar categoria de quarto.', details: err.message });
  }
};

// Lista todas as categorias de quarto
exports.listar = async (req, res) => {
  try {
    const categorias = await CategoriaQuartoModel.getAll();
    res.status(200).json(categorias); // Retorna a lista de categorias
  } catch (err) {
    console.error('Erro no controller ao listar categorias de quarto:', err.message);
    res.status(500).json({ error: 'Erro interno ao listar categorias de quarto.', details: err.message });
  }
};

// Obtém uma categoria de quarto específica pelo ID
exports.obter = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await CategoriaQuartoModel.getById(id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria de quarto não encontrada.' });
    }
    res.status(200).json(categoria); // Retorna a categoria encontrada
  } catch (err) {
    console.error('Erro no controller ao obter categoria de quarto:', err.message);
    res.status(500).json({ error: 'Erro interno ao obter categoria de quarto.', details: err.message });
  }
};

// Atualiza uma categoria de quarto existente
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  try {
    const { nome, descricao } = req.body;
    if (!nome && descricao === undefined) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.'});
    }
    // Lembrete: O model CategoriaQuartoModel.update espera ambos os campos (nome, descricao).
    // Para atualização parcial, o model precisaria ser ajustado.

    const categoriaAtualizada = await CategoriaQuartoModel.update(id, { nome, descricao });
    if (!categoriaAtualizada) {
      return res.status(404).json({ message: 'Categoria de quarto não encontrada para atualização.' });
    }
    res.status(200).json(categoriaAtualizada); // Retorna a categoria atualizada
  } catch (err) {
    console.error('Erro no controller ao atualizar categoria de quarto:', err.message);
    if (err.code === '23505') { // Violação de unique constraint para nome
        return res.status(409).json({ error: 'Nome de categoria já existe.' });
    }
    res.status(500).json({ error: 'Erro interno ao atualizar categoria de quarto.', details: err.message });
  }
};

// Exclui uma categoria de quarto
exports.excluir = async (req, res) => {
  const { id } = req.params;
  try {
    // Lembrete: ON DELETE SET NULL na tabela Room para categoria_quarto_id.
    const categoriaExcluida = await CategoriaQuartoModel.delete(id);
    if (!categoriaExcluida) {
      return res.status(404).json({ message: 'Categoria de quarto não encontrada para exclusão.' });
    }
    res.status(200).json({ message: 'Categoria de quarto excluída com sucesso.', categoria: categoriaExcluida });
  } catch (err) {
    console.error('Erro no controller ao excluir categoria de quarto:', err.message);
    res.status(500).json({ error: 'Erro interno ao excluir categoria de quarto.', details: err.message });
  }
}; 