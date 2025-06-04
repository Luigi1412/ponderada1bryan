const express = require('express');
const router = express.Router();
const EnderecoController = require('../controllers/EnderecoController');

router.post('/', EnderecoController.criar);
router.get('/', EnderecoController.listar);
router.get('/:id', EnderecoController.buscarPorId);
router.put('/:id', EnderecoController.atualizar);
router.delete('/:id', EnderecoController.deletar);

module.exports = router;