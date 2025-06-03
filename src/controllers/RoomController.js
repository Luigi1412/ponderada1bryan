const RoomService = require('../services/RoomService');

class RoomController {
  static async create(req, res) {
    try {
      const room = await RoomService.createRoom(req.body);
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const rooms = await RoomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const room = await RoomService.getRoom(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const room = await RoomService.updateRoom(req.params.id, req.body);
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await RoomService.deleteRoom(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getAvailable(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const rooms = await RoomService.getAvailableRooms(startDate, endDate);
      res.status(200).json(rooms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async setStatus(req, res) {
    try {
      const { status } = req.body;
      const room = await RoomService.setRoomStatus(req.params.id, status);
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = RoomController; 