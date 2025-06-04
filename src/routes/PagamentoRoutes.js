const express = require('express');
const router = express.Router();
const PagamentoController = require('../controllers/PagamentoController');

router.post('/', PagamentoController.criar);
router.get('/', PagamentoController.listar);
router.get('/:id', PagamentoController.buscarPorId);
router.put('/:id', PagamentoController.atualizar);
router.delete('/:id', PagamentoController.deletar);
router.get('/reserva/:reserva_id', PagamentoController.listarPorReserva);

module.exports = router;