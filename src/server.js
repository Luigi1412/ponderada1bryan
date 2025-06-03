const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const expressEjsLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressEjsLayouts);
app.set('layout', 'layout');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', routes);

// View Routes
app.get('/', (req, res) => {
    res.render('tasks/index');
});

app.get('/nova-tarefa', (req, res) => {
    res.render('tasks/form');
});

app.get('/editar-tarefa/:id', (req, res) => {
    res.render('tasks/form');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 