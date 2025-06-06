const express = require('express');
const router = express.Router();
const ProjetoController = require('../controllers/ProjetoController');

// Rotas principais para Projetos
router.post('/', ProjetoController.criar);
router.get('/', ProjetoController.listar);
router.get('/:id', ProjetoController.buscarPorId);
router.put('/:id', ProjetoController.atualizar);
router.delete('/:id', ProjetoController.deletar);

module.exports = router;