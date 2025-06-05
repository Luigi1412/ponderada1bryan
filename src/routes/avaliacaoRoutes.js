const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

// Rotas principais para Avaliações
router.post('/', AvaliacaoController.criar);
router.get('/', AvaliacaoController.listar);
router.get('/:id', AvaliacaoController.buscarPorId);
router.put('/:id', AvaliacaoController.atualizar);
router.delete('/:id', AvaliacaoController.deletar);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', AvaliacaoController.apiListar);
router.post('/api', AvaliacaoController.apiCriar);
router.put('/api/:id', AvaliacaoController.apiAtualizar);
router.delete('/api/:id', AvaliacaoController.apiDeletar);

module.exports = router;