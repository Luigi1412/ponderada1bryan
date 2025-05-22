require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api', routes);

// Rota básica para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API de Gerenciamento de Tarefas' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
