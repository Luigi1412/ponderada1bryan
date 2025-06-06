const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');

// Rota para listar todas as reservas (usada no formulário de pagamento)
router.get('/', ReservationController.listar);

// Outras rotas da API (criar, obter, atualizar, deletar) podem ser adicionadas aqui no futuro.

module.exports = router; 