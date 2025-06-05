const express = require('express');
const router = express.Router();
const PagamentoController = require('../controllers/PagamentoController');

// Rotas principais para Pagamentos
router.post('/', PagamentoController.criar);
router.get('/', PagamentoController.listar);
router.get('/:id', PagamentoController.buscarPorId);
router.put('/:id', PagamentoController.atualizar);
router.delete('/:id', PagamentoController.deletar);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', PagamentoController.apiListar);
router.post('/api', PagamentoController.apiCriar);
router.put('/api/:id', PagamentoController.apiAtualizar);
router.delete('/api/:id', PagamentoController.apiDeletar);

module.exports = router;