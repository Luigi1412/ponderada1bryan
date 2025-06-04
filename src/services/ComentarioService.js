const Comentario = require('../models/ComentarioModel');

class ComentarioService {
  static async createComentario(data) {
    return await Comentario.create(data);
  }

  static async updateComentario(id, data) {
    return await Comentario.update(id, data);
  }

  static async deleteComentario(id) {
    return await Comentario.delete(id);
  }

  static async getComentario(id) {
    return await Comentario.getById(id);
  }

  static async getAllComentariosByTarefa(tarefa_id) {
    return await Comentario.getAllByTarefaId(tarefa_id);
  }
}

module.exports = ComentarioService;