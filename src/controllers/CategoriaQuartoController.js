const pool = require('../config/database');

// Criar uma categoria
exports.criar = async (req, res) => {
  const { nome, descricao } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO categorias_quartos (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
exports.listar = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias_quartos');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter uma categoria
exports.obter = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('SELECT * FROM categorias_quartos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma categoria
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE categorias_quartos SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
      [nome, descricao, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma categoria
exports.excluir = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('DELETE FROM categorias_quartos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 