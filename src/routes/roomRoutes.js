const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

// Rotas para Quartos
router.post('/', RoomController.criar);
router.get('/', RoomController.listar);
router.get('/:id', RoomController.obter);
router.put('/:id', RoomController.atualizar);
router.delete('/:id', RoomController.excluir);

module.exports = router; 