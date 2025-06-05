const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rotas principais para Usuários
router.post('/', UserController.criar);
router.get('/', UserController.listar);
router.get('/:id', UserController.obter);
router.put('/:id', UserController.atualizar);
router.delete('/:id', UserController.excluir);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', UserController.apiListar);
router.post('/api', UserController.apiCriar);
router.put('/api/:id', UserController.apiAtualizar);
router.delete('/api/:id', UserController.apiDeletar);

module.exports = router;