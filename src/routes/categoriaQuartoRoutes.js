const express = require('express');
const router = express.Router();
const CategoriaQuartoController = require('../controllers/CategoriaQuartoController');

// Rotas para Categorias de Quartos
router.post('/', CategoriaQuartoController.criar);
router.get('/', CategoriaQuartoController.listar);
router.get('/:id', CategoriaQuartoController.obter);
router.put('/:id', CategoriaQuartoController.atualizar);
router.delete('/:id', CategoriaQuartoController.excluir);

module.exports = router; 