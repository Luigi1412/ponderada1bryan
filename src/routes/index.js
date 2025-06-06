const express = require('express');
const router = express.Router();

// Importar os roteadores individuais
const taskRoutes = require('./taskRoutes');
const roomCategoryRoutes = require('./roomCategoryRoutes');
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const enderecoRoutes = require('./enderecoRoutes');
const reviewRoutes = require('./reviewRoutes');
const pagamentoRoutes = require('./pagamentoRoutes');
const reservationRoutes = require('./reservationRoutes');

// Montar os roteadores nos seus respectivos caminhos base
router.use('/tarefas', taskRoutes);
router.use('/categorias-quartos', roomCategoryRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/enderecos', enderecoRoutes);
router.use('/avaliacoes', reviewRoutes);
router.use('/pagamentos', pagamentoRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;