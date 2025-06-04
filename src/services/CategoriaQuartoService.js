const CategoriaQuarto = require('../models/CategoriaQuarto');

class CategoriaQuartoService {
  static async createCategoria(data) {
    return await CategoriaQuarto.create(data);
  }

  static async updateCategoria(id, data) {
    return await CategoriaQuarto.update(id, data);
  }

  static async deleteCategoria(id) {
    return await CategoriaQuarto.delete(id);
  }

  static async getCategoria(id) {
    return await CategoriaQuarto.findById(id);
  }

  static async getAllCategorias() {
    return await CategoriaQuarto.findAll();
  }
}

module.exports = CategoriaQuartoService;