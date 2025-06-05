const express = require('express');
const router = express.Router();
const EnderecoController = require('../controllers/EnderecoController');

// Rotas principais para Endereços
router.post('/', EnderecoController.criar);
router.get('/', EnderecoController.listar);
router.get('/:id', EnderecoController.buscarPorId);
router.put('/:id', EnderecoController.atualizar);
router.delete('/:id', EnderecoController.deletar);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', EnderecoController.apiListar);
router.post('/api', EnderecoController.apiCriar);
router.put('/api/:id', EnderecoController.apiAtualizar);
router.delete('/api/:id', EnderecoController.apiDeletar);

module.exports = router;