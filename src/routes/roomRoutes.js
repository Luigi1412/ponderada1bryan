const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

// Rotas principais para Rooms
router.post('/', RoomController.criar);
router.get('/', RoomController.listar);
router.get('/:id', RoomController.obter);
router.put('/:id', RoomController.atualizar);
router.delete('/:id', RoomController.excluir);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', RoomController.apiListar);
router.post('/api', RoomController.apiCriar);
router.put('/api/:id', RoomController.apiAtualizar);
router.delete('/api/:id', RoomController.apiDeletar);

module.exports = router;