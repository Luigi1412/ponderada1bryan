const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

// Rotas para a API de Avaliações
router.post('/', AvaliacaoController.criar);
router.get('/', AvaliacaoController.listar);
router.get('/:id', AvaliacaoController.obter);
router.put('/:id', AvaliacaoController.atualizar);
router.delete('/:id', AvaliacaoController.excluir);

module.exports = router;