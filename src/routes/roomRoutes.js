const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');
const { roomValidators } = require('../middlewares/validators');

router.post('/', roomValidators.create, RoomController.create);
router.get('/', RoomController.getAll);
router.get('/available', roomValidators.available, RoomController.getAvailable);
router.get('/:id', RoomController.getById);
router.put('/:id', roomValidators.update, RoomController.update);
router.delete('/:id', RoomController.delete);
router.patch('/:id/status', RoomController.setStatus);

module.exports = router; 