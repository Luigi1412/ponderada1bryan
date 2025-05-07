const express = require('express');
const router = express.Router();

// rota GET para a página inicial
router.get('/' , (req, res) => {
    res.send('Hello world');
});

module.exports = router;
