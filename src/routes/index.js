const express = require('express');
const router = express.Router();

// Importar os roteadores individuais
const tarefaRoutes = require('./tarefaRoutes');
const comentarioRoutes = require('./comentarioRoutes');
const projetoRoutes = require('./projetoRoutes');
const categoriaQuartoRoutes = require('./categoriaQuartoRoutes');
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const enderecoRoutes = require('./enderecoRoutes');
const avaliacaoRoutes = require('./avaliacaoRoutes');
const pagamentoRoutes = require('./pagamentoRoutes');

// Montar os roteadores nos seus respectivos caminhos base
router.use('/tarefas', tarefaRoutes);
router.use('/comentarios', comentarioRoutes);
router.use('/projetos', projetoRoutes);
router.use('/categorias-quartos', categoriaQuartoRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/enderecos', enderecoRoutes);
router.use('/avaliacoes', avaliacaoRoutes);
router.use('/pagamentos', pagamentoRoutes);

module.exports = router;