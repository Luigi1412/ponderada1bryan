const Projeto = require('../models/Projeto');

class ProjetoService {
  static async createProjeto(data) {
    return await Projeto.create(data);
  }

  static async updateProjeto(id, data) {
    return await Projeto.update(id, data);
  }

  static async deleteProjeto(id) {
    return await Projeto.delete(id);
  }

  static async getProjeto(id) {
    return await Projeto.findById(id);
  }

  static async getAllProjetos() {
    return await Projeto.findAll();
  }
}

module.exports = ProjetoService;