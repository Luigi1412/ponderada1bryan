const express = require('express');
const router = express.Router();
const PagamentoController = require('../controllers/PagamentoController');

// ==================== ROTAS DAS VIEWS (PÁGINAS) ====================
// Rota para a página de listagem de pagamentos
router.get('/', PagamentoController.listarPage);

// Rota para a página do formulário de criação
router.get('/novo', PagamentoController.formPage);

// Rota para a página do formulário de edição
router.get('/editar/:id', PagamentoController.formPage);


// ==================== ROTAS DA API (DADOS) ====================
// Rota para listar todos os pagamentos (usado pela view dinâmica)
router.get('/api', PagamentoController.apiListar);

// Rota para criar um novo pagamento (usado pelo form)
router.post('/api', PagamentoController.apiCriar);

// Rota para atualizar um pagamento (usado pelo form)
router.put('/api/:id', PagamentoController.apiAtualizar);

// Rota para deletar um pagamento (usado pelo botão na view)
router.delete('/api/:id', PagamentoController.apiDeletar);


module.exports = router;