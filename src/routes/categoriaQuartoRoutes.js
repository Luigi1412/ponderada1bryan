const express = require('express');
const router = express.Router();
const CategoriaQuartoController = require('../controllers/CategoriaQuartoController');

// Rotas principais para CategoriaQuarto
router.post('/', CategoriaQuartoController.criar);
router.get('/', CategoriaQuartoController.listar);
router.get('/:id', CategoriaQuartoController.obter);
router.put('/:id', CategoriaQuartoController.atualizar);
router.delete('/:id', CategoriaQuartoController.excluir);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', CategoriaQuartoController.apiListar);
router.post('/api', CategoriaQuartoController.apiCriar);
router.put('/api/:id', CategoriaQuartoController.apiAtualizar);
router.delete('/api/:id', CategoriaQuartoController.apiDeletar);

module.exports = router;