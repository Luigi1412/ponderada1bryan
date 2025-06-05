const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/ComentarioController');

// Rotas principais para Comentários
router.post('/', ComentarioController.criarComentario);
router.get('/', ComentarioController.listarComentarios);
router.get('/:id', ComentarioController.obterComentario);
router.put('/:id', ComentarioController.editarComentario);
router.delete('/:id', ComentarioController.excluirComentario);

// Rotas de API para Fetch (frontend dinâmico)
router.get('/api', ComentarioController.apiListar);
router.post('/api', ComentarioController.apiCriar);
router.put('/api/:id', ComentarioController.apiAtualizar);
router.delete('/api/:id', ComentarioController.apiDeletar);

module.exports = router;