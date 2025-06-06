const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

// Rotas para a API de Avaliações
router.post('/', ReviewController.criar);
router.get('/', ReviewController.listar);
router.get('/:id', ReviewController.obter);
router.put('/:id', ReviewController.atualizar);
router.delete('/:id', ReviewController.excluir);

module.exports = router;