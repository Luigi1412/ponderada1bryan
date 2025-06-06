const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/ComentarioController');

// Rota para renderizar a view de comentários
router.get('/', (req, res) => {
  res.render('comentarios/index');
});

// Rotas principais para Comentários (API)
router.post('/', ComentarioController.criarComentario);
router.get('/api', ComentarioController.apiListar);
router.post('/api', ComentarioController.apiCriar);
router.put('/api/:id', ComentarioController.apiAtualizar);
router.delete('/api/:id', ComentarioController.apiDeletar);
router.get('/:id', ComentarioController.obterComentario);
router.put('/:id', ComentarioController.editarComentario);
router.delete('/:id', ComentarioController.excluirComentario);

module.exports = router;