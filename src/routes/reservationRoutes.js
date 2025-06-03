const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const { reservationValidators } = require('../middlewares/validators');

router.post('/', reservationValidators.create, ReservationController.create);
router.get('/', ReservationController.getAll);
router.get('/:id', ReservationController.getById);
router.put('/:id', reservationValidators.update, ReservationController.update);
router.delete('/:id', ReservationController.delete);
router.get('/user/:userId', ReservationController.getUserReservations);
router.post('/:id/confirm', ReservationController.confirm);

module.exports = router; 