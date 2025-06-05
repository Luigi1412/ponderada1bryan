const express = require('express');
const router = express.Router();
const ProjetoController = require('../controllers/ProjetoController');

// Rotas principais para Projetos
router.post('/', ProjetoController.criar);
router.get('/', ProjetoController.listar);
router.get('/:id', ProjetoController.buscarPorId);
router.put('/:id', ProjetoController.atualizar);
router.delete('/:id', ProjetoController.deletar);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', ProjetoController.apiListar);
router.post('/api', ProjetoController.apiCriar);
router.put('/api/:id', ProjetoController.apiAtualizar);
router.delete('/api/:id', ProjetoController.apiDeletar);

module.exports = router;