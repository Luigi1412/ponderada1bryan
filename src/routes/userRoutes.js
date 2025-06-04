const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rotas para Usuários
router.post('/', UserController.criar);
router.get('/', UserController.listar);
router.get('/:id', UserController.obter);
router.put('/:id', UserController.atualizar);
router.delete('/:id', UserController.excluir);

module.exports = router; 