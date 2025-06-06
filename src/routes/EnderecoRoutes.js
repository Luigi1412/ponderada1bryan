const express = require('express');
const router = express.Router();
const EnderecoController = require('../controllers/EnderecoController');

// ==================== ROTAS DAS VIEWS (PÁGINAS) ====================
// Rota para a página de listagem de endereços
router.get('/', EnderecoController.listarPage);

// Rota para a página do formulário de criação
router.get('/novo', EnderecoController.formPage);

// Rota para a página do formulário de edição
router.get('/editar/:id', EnderecoController.formPage);


// ==================== ROTAS DA API (DADOS) ====================
// Rota para listar todos os endereços (usado pela view)
router.get('/api', EnderecoController.apiListar);

// Rota para criar um novo endereço (usado pelo form)
router.post('/api', EnderecoController.apiCriar);

// Rota para atualizar um endereço (usado pelo form)
router.put('/api/:id', EnderecoController.apiAtualizar);

// Rota para deletar um endereço (usado pelo botão na view)
router.delete('/api/:id', EnderecoController.apiDeletar);


module.exports = router;