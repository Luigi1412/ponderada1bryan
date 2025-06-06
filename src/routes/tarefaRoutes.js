const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

// Rotas principais para Tarefas
router.post('/', TarefaController.criarTarefa);
router.get('/', TarefaController.listarTarefas);
router.get('/:id', TarefaController.obterTarefa);
router.put('/:id', TarefaController.editarTarefa);
router.delete('/:id', TarefaController.excluirTarefa);

module.exports = router;