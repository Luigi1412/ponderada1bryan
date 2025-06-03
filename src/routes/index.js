const express = require('express');
const router = express.Router();

// Controllers
const TarefaController = require('../controllers/TarefaController');
const CategoriaQuartoController = require('../controllers/CategoriaQuartoController');
const UserController = require('../controllers/UserController');
const RoomController = require('../controllers/RoomController');

// Rotas para Tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.get('/tarefas/:id', TarefaController.obterTarefa);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

// Rotas para Categorias de Quartos
router.post('/categorias_quartos', CategoriaQuartoController.criar);
router.get('/categorias_quartos', CategoriaQuartoController.listar);
router.get('/categorias_quartos/:id', CategoriaQuartoController.obter);
router.put('/categorias_quartos/:id', CategoriaQuartoController.atualizar);
router.delete('/categorias_quartos/:id', CategoriaQuartoController.excluir);

// Rotas para Usuários
router.post('/users', UserController.criar);
router.get('/users', UserController.listar);
router.get('/users/:id', UserController.obter);
router.put('/users/:id', UserController.atualizar);
router.delete('/users/:id', UserController.excluir);

// Rotas para Quartos
router.post('/rooms', RoomController.criar);
router.get('/rooms', RoomController.listar);
router.get('/rooms/:id', RoomController.obter);
router.put('/rooms/:id', RoomController.atualizar);
router.delete('/rooms/:id', RoomController.excluir);

const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const reservationRoutes = require('./reservationRoutes');

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router; 