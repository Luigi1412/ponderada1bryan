const ReservationService = require('../services/ReservationService');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');

jest.mock('../models/Room');
jest.mock('../models/Reservation');

describe('ReservationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReservation', () => {
    it('should create a reservation when room is available', async () => {
      const mockReservation = {
        room_id: 1,
        check_in: '2024-03-20',
        check_out: '2024-03-25',
        user_id: 1
      };

      const mockAvailableRooms = [
        { id: 1, number: '101' }
      ];

      Room.getAvailableRooms.mockResolvedValue(mockAvailableRooms);
      Reservation.create.mockResolvedValue({
        ...mockReservation,
        id: 1,
        status: 'pending',
        duration_days: 5
      });

      const result = await ReservationService.createReservation(mockReservation);
      
      expect(result).toHaveProperty('status', 'pending');
      expect(result).toHaveProperty('duration_days', 5);
      expect(Room.getAvailableRooms).toHaveBeenCalledWith(
        mockReservation.check_in,
        mockReservation.check_out
      );
    });

    it('should throw error when room is not available', async () => {
      const mockReservation = {
        room_id: 1,
        check_in: '2024-03-20',
        check_out: '2024-03-25'
      };

      Room.getAvailableRooms.mockResolvedValue([]);

      await expect(ReservationService.createReservation(mockReservation))
        .rejects
        .toThrow('Quarto não está disponível para as datas selecionadas');
    });
  });

  describe('confirmReservation', () => {
    it('should confirm a reservation', async () => {
      const mockReservation = {
        id: 1,
        status: 'confirmed'
      };

      Reservation.update.mockResolvedValue(mockReservation);

      const result = await ReservationService.confirmReservation(1);
      expect(result).toHaveProperty('status', 'confirmed');
      expect(Reservation.update).toHaveBeenCalledWith(1, { status: 'confirmed' });
    });
  });

  describe('cancelReservation', () => {
    it('should cancel a reservation', async () => {
      const mockReservation = {
        id: 1,
        status: 'cancelled'
      };

      Reservation.update.mockResolvedValue(mockReservation);

      const result = await ReservationService.cancelReservation(1);
      expect(result).toHaveProperty('status', 'cancelled');
      expect(Reservation.update).toHaveBeenCalledWith(1, { status: 'cancelled' });
    });
  });

  describe('getUserReservationHistory', () => {
    it('should return user reservations', async () => {
      const mockReservations = [
        { id: 1, user_id: 1 },
        { id: 2, user_id: 1 }
      ];

      Reservation.getUserReservations.mockResolvedValue(mockReservations);

      const result = await ReservationService.getUserReservationHistory(1);
      expect(result).toHaveLength(2);
      expect(Reservation.getUserReservations).toHaveBeenCalledWith(1);
    });
  });
}); 