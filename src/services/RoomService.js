const Room = require('../models/rooms');

class RoomService {
  static async createRoom(roomData) {
    // Verificar número único
    const existingRoom = await Room.findAll().then(rooms => 
      rooms.find(room => room.number === roomData.number)
    );

    if (existingRoom) {
      throw new Error('Número do quarto já está em uso');
    }

    return await Room.create({
      ...roomData,
      status: 'available' // Status inicial sempre disponível
    });
  }

  static async updateRoom(id, roomData) {
    // Verificar se o quarto existe
    const room = await Room.findById(id);
    if (!room) {
      throw new Error('Quarto não encontrado');
    }

    // Se estiver atualizando o número, verificar se já não está em uso
    if (roomData.number && roomData.number !== room.number) {
      const existingRoom = await Room.findAll().then(rooms => 
        rooms.find(room => room.number === roomData.number)
      );

      if (existingRoom) {
        throw new Error('Número do quarto já está em uso');
      }
    }

    return await Room.update(id, roomData);
  }

  static async deleteRoom(id) {
    // Verificar se o quarto existe
    const room = await Room.findById(id);
    if (!room) {
      throw new Error('Quarto não encontrado');
    }

    // Em um sistema real, verificaríamos se há reservas futuras
    // e impediríamos a deleção nesse caso
    return await Room.delete(id);
  }

  static async getRoom(id) {
    const room = await Room.findById(id);
    if (!room) {
      throw new Error('Quarto não encontrado');
    }
    return room;
  }

  static async getAllRooms() {
    return await Room.findAll();
  }

  static async getAvailableRooms(startDate, endDate) {
    // Validar datas
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      throw new Error('Data de check-in deve ser anterior à data de check-out');
    }

    if (start < new Date()) {
      throw new Error('Data de check-in não pode ser no passado');
    }

    return await Room.getAvailableRooms(startDate, endDate);
  }

  static async setRoomStatus(id, status) {
    const validStatus = ['available', 'maintenance', 'occupied'];
    
    if (!validStatus.includes(status)) {
      throw new Error('Status inválido');
    }

    return await Room.update(id, { status });
  }
}

module.exports = RoomService; 