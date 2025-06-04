class EnderecoModel {
  static async create(data) { /* implementação do insert no banco */ }
  static async update(id, data) { /* implementação do update no banco */ }
  static async delete(id) { /* implementação do delete no banco */ }
  static async findById(id) { /* implementação do select por id */ }
  static async findAll() { /* implementação do select all */ }
}

module.exports = EnderecoModel;