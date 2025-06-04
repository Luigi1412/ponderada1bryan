const Tarefa = require('../models/Tarefa');

class TarefaService {
  static async createTarefa(data) {
    return await Tarefa.create(data);
  }

  static async updateTarefa(id, data) {
    return await Tarefa.update(id, data);
  }

  static async deleteTarefa(id) {
    return await Tarefa.delete(id);
  }

  static async getTarefa(id) {
    return await Tarefa.findById(id);
  }

  static async getAllTarefas() {
    return await Tarefa.findAll();
  }
}

module.exports = TarefaService;