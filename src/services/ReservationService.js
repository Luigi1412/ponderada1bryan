const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

class ReservationService {
  static async createReservation(reservationData) {
    // Verificar disponibilidade do quarto
    const availableRooms = await Room.getAvailableRooms(
      reservationData.check_in,
      reservationData.check_out
    );

    const isRoomAvailable = availableRooms.some(room => room.id === reservationData.room_id);
    
    if (!isRoomAvailable) {
      throw new Error('Quarto não está disponível para as datas selecionadas');
    }

    // Calcular duração da estadia
    const checkIn = new Date(reservationData.check_in);
    const checkOut = new Date(reservationData.check_out);
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    // Adicionar duração e status à reserva
    const reservation = {
      ...reservationData,
      duration_days: days,
      status: 'pending'
    };

    return await Reservation.create(reservation);
  }

  static async confirmReservation(reservationId) {
    return await Reservation.update(reservationId, { status: 'confirmed' });
  }

  static async cancelReservation(reservationId) {
    return await Reservation.update(reservationId, { status: 'cancelled' });
  }

  static async getUserReservationHistory(userId) {
    return await Reservation.getUserReservations(userId);
  }
}

module.exports = ReservationService; 