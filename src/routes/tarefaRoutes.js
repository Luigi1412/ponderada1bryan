const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');
const ComentarioController = require('../controllers/ComentarioController');

// Rotas principais para Tarefas
router.post('/', TarefaController.criarTarefa);
router.get('/', TarefaController.listarTarefas);
router.get('/:id', TarefaController.obterTarefa);
router.put('/:id', TarefaController.editarTarefa);
router.delete('/:id', TarefaController.excluirTarefa);

// Rotas aninhadas para Comentários de uma Tarefa específica
// GET /api/tarefas/:tarefaId/comentarios
router.get('/:tarefaId/comentarios', ComentarioController.listarComentariosPorTarefa);
// POST /api/tarefas/:tarefaId/comentarios
router.post('/:tarefaId/comentarios', ComentarioController.criarComentario);

module.exports = router; 