const Endereco = require('../models/EnderecoModel');

class EnderecoService {
  static async createEndereco(data) {
    return await Endereco.create(data);
  }
  static async updateEndereco(id, data) {
    return await Endereco.update(id, data);
  }
  static async deleteEndereco(id) {
    return await Endereco.delete(id);
  }
  static async getEndereco(id) {
    return await Endereco.findById(id);
  }
  static async getAllEnderecos() {
    return await Endereco.findAll();
  }
}

module.exports = EnderecoService;