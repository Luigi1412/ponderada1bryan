const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// Rotas principais para Tarefas
router.post('/', TaskController.criarTarefa);
router.get('/', TaskController.listarTarefas);
router.get('/:id', TaskController.obterTarefa);
router.put('/:id', TaskController.editarTarefa);
router.delete('/:id', TaskController.excluirTarefa);

module.exports = router;