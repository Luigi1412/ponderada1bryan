const ReservationService = require('../services/ReservationService');

class ReservationController {
  static async create(req, res) {
    try {
      const reservation = await ReservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const reservation = await ReservationService.getReservation(req.params.id);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const reservation = await ReservationService.updateReservation(req.params.id, req.body);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ReservationService.cancelReservation(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getUserReservations(req, res) {
    try {
      const reservations = await ReservationService.getUserReservationHistory(req.params.userId);
      res.status(200).json(reservations);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async confirm(req, res) {
    try {
      const reservation = await ReservationService.confirmReservation(req.params.id);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ReservationController; 