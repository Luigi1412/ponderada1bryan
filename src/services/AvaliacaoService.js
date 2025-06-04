const Avaliacao = require('../models/AvaliacaoModel');

class AvaliacaoService {
  static async createAvaliacao(data) {
    return await Avaliacao.create(data);
  }
  static async updateAvaliacao(id, data) {
    return await Avaliacao.update(id, data);
  }
  static async deleteAvaliacao(id) {
    return await Avaliacao.delete(id);
  }
  static async getAvaliacao(id) {
    return await Avaliacao.findById(id);
  }
  static async getAllAvaliacoes() {
    return await Avaliacao.findAll();
  }
  static async getAvaliacoesByRoom(room_id) {
    return await Avaliacao.findByRoomId(room_id);
  }
}

module.exports = AvaliacaoService;