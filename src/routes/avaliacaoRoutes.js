const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

router.post('/', AvaliacaoController.criar);
router.get('/', AvaliacaoController.listar);
router.get('/:id', AvaliacaoController.buscarPorId);
router.put('/:id', AvaliacaoController.atualizar);
router.delete('/:id', AvaliacaoController.deletar);
router.get('/room/:room_id', AvaliacaoController.listarPorQuarto);

module.exports = router;