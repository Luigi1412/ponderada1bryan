const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const expressEjsLayouts = require('express-ejs-layouts');
const DashboardController = require('./controllers/DashboardController');

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
app.get('/', DashboardController.index);

app.get('/tarefas', (req, res) => {
    res.render('tasks/index');
});

app.get('/nova-tarefa', (req, res) => {
    res.render('tasks/form');
});

app.get('/editar-tarefa/:id', (req, res) => {
    res.render('tasks/form');
});

app.get('/users', (req, res) => {
    res.render('users/index');
});

app.get('/novo-usuario', (req, res) => {
    res.render('users/form');
});

app.get('/editar-usuario/:id', (req, res) => {
    res.render('users/form');
});

app.get('/projetos', (req, res) => {
    res.render('projetos/index');
});

app.get('/novo-projeto', (req, res) => {
    res.render('projetos/form');
});

app.get('/editar-projeto/:id', (req, res) => {
    res.render('projetos/form');
});

app.get('/rooms', (req, res) => {
    res.render('rooms/index');
});

app.get('/novo-quarto', (req, res) => {
    res.render('rooms/form');
});

app.get('/editar-quarto/:id', (req, res) => {
    res.render('rooms/form');
});

app.get('/categorias-quartos', (req, res) => {
    res.render('categorias-quartos/index');
});

app.get('/nova-categoria-quarto', (req, res) => {
    res.render('categorias-quartos/form');
});

app.get('/editar-categoria-quarto/:id', (req, res) => {
    res.render('categorias-quartos/form');
});

app.get('/avaliacoes', (req, res) => {
    res.render('avaliacoes/index');
});

app.get('/nova-avaliacao', (req, res) => {
    res.render('avaliacoes/form');
});

app.get('/editar-avaliacao/:id', (req, res) => {
    res.render('avaliacoes/form');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 