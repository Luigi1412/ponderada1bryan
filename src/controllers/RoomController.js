const pool = require('../config/database');

// Criar um quarto
exports.criar = async (req, res) => {
  const { numero, descricao, capacidade, categoria_id } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO rooms (numero, descricao, capacidade, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [numero, descricao, capacidade, categoria_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os quartos
exports.listar = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, c.nome as categoria_nome 
      FROM rooms r 
      LEFT JOIN categorias_quartos c ON r.categoria_id = c.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter um quarto
exports.obter = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT r.*, c.nome as categoria_nome 
      FROM rooms r 
      LEFT JOIN categorias_quartos c ON r.categoria_id = c.id 
      WHERE r.id = $1
    `, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar um quarto
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { numero, descricao, capacidade, categoria_id } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE rooms SET numero = $1, descricao = $2, capacidade = $3, categoria_id = $4 WHERE id = $5 RETURNING *',
      [numero, descricao, capacidade, categoria_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um quarto
exports.excluir = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('DELETE FROM rooms WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    res.status(200).json({ message: 'Quarto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 