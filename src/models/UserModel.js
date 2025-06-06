const pool = require('../config/database');
// Idealmente, uma biblioteca como bcrypt seria usada para hash de senhas

// Model para gerenciar os usuários
const UserModel = {
  // Cria um novo usuário
  async create({ nome, email, senha }) {
    // IMPORTANTE: Em produção, a senha DEVE ser "hasheada" antes de salvar!
    // Exemplo: const hashedPassword = await bcrypt.hash(senha, 10);
    const query = `
      INSERT INTO users (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email; -- Nunca retornar a senha em queries diretas
    `;
    const values = [nome, email, senha]; // Usar hashedPassword aqui em produção
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o usuário criado (sem senha)
    } catch (err) {
      console.error('Erro ao criar usuário no model:', err.message);
      throw err;
    }
  },

  // Busca todos os usuários
  async getAll() {
    const query = 'SELECT id, nome, email FROM users ORDER BY nome ASC;';
    try {
      const result = await pool.query(query);
      return result.rows; // Retorna lista de usuários (sem senhas)
    } catch (err) {
      console.error('Erro ao buscar todos os usuários no model:', err.message);
      throw err;
    }
  },

  // Busca um usuário pelo ID
  async getById(id) {
    const query = 'SELECT id, nome, email FROM users WHERE id = $1;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o usuário (sem senha) ou undefined
    } catch (err) {
      console.error(`Erro ao buscar usuário por id ${id} no model:`, err.message);
      throw err;
    }
  },

  // Busca um usuário pelo email (útil para login ou verificar duplicidade)
  async getByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;'; // Retorna todos os campos para verificação de senha no controller
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0]; // Retorna o usuário completo (incluindo hash da senha) ou undefined
    } catch (err) {
      console.error(`Erro ao buscar usuário por email ${email} no model:`, err.message);
      throw err;
    }
  },

  // Atualiza um usuário existente
  async update(id, { nome, email, senha }) {
    // IMPORTANTE: Se a senha for alterada, ela DEVE ser "hasheada".
    const query = `
      UPDATE users 
      SET nome = $1, email = $2, senha = $3 
      WHERE id = $4 RETURNING id, nome, email;
    `;
    const values = [nome, email, senha, id]; // Usar hashedPassword para senha aqui em produção
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o usuário atualizado (sem senha)
    } catch (err) {
      console.error(`Erro ao atualizar usuário ${id} no model:`, err.message);
      throw err;
    }
  },

  // Exclui um usuário pelo ID
  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, nome, email;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Retorna o usuário excluído (sem senha) ou undefined
    } catch (err) {
      console.error(`Erro ao excluir usuário ${id} no model:`, err.message);
      throw err;
    }
  }
};

module.exports = UserModel; 