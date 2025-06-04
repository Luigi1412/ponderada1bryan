const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/ComentarioController');

// Rota para criar um comentário diretamente (espera tarefa_id no corpo da requisição)
// POST /api/comentarios
router.post('/', ComentarioController.criarComentario);

// Rotas para obter, atualizar e deletar um comentário pelo seu ID
// GET /api/comentarios/:id
router.get('/:id', ComentarioController.obterComentario);
// PUT /api/comentarios/:id
router.put('/:id', ComentarioController.editarComentario);
// DELETE /api/comentarios/:id
router.delete('/:id', ComentarioController.excluirComentario);

module.exports = router; 