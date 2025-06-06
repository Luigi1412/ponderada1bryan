const express = require('express');
const router = express.Router();
const RoomCategoryController = require('../controllers/roomCategoryController');

// Rotas principais para CategoriaQuarto
router.post('/', RoomCategoryController.criar);
router.get('/', RoomCategoryController.listar);
router.get('/:id', RoomCategoryController.obter);
router.put('/:id', RoomCategoryController.atualizar);
router.delete('/:id', RoomCategoryController.excluir);

module.exports = router;