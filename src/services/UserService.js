const User = require('../models/User');

class UserService {
  static async createUser(userData) {
    // Validar email único
    const existingUser = await User.findAll().then(users => 
      users.find(user => user.email === userData.email)
    );

    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash da senha seria feito aqui em um sistema real
    // Por ora, vamos apenas criar o usuário
    return await User.create(userData);
  }

  static async updateUser(id, userData) {
    // Verificar se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Se estiver atualizando o email, verificar se já não está em uso
    if (userData.email && userData.email !== user.email) {
      const existingUser = await User.findAll().then(users => 
        users.find(user => user.email === userData.email)
      );

      if (existingUser) {
        throw new Error('Email já está em uso');
      }
    }

    return await User.update(id, userData);
  }

  static async deleteUser(id) {
    // Verificar se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Em um sistema real, verificaríamos se há reservas ativas
    // e faríamos uma deleção lógica ao invés de física
    return await User.delete(id);
  }

  static async getUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  static async getAllUsers() {
    return await User.findAll();
  }
}

module.exports = UserService; 