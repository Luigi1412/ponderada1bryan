# Documentação do Sistema de Gerenciamento de Tarefas

## Visão Geral das Mudanças

### Frontend
- Implementação de interface visual moderna usando EJS e Tailwind CSS
- Sistema de layout com templates reutilizáveis
- Integração com backend usando Fetch API
- Interface responsiva e amigável ao usuário

### Backend
- Adição de suporte a templates EJS
- Novas rotas para renderização de views
- Integração com Supabase para persistência de dados
- API REST mantida para compatibilidade

## Views do Sistema

### Página Principal (Lista de Tarefas)
[Inserir screenshot da página principal]

**Características:**
- Grid responsivo de cards de tarefas
- Status visual com códigos de cores
- Botões de ação para editar e excluir
- Botão de nova tarefa em destaque
- Carregamento dinâmico via Fetch API

### Formulário de Tarefa
[Inserir screenshot do formulário]

**Características:**
- Design limpo e intuitivo
- Validação de campos
- Seleção de status
- Modo de criação e edição no mesmo componente
- Feedback visual de ações

## Mudanças no Backend

### Novas Dependências
- express-ejs-layouts: Para sistema de templates
- @supabase/supabase-js: Cliente Supabase

### Estrutura de Arquivos Atualizada
```
.
├── src/
│   ├── server.js        # Configuração EJS adicionada
│   ├── routes/
│   ├── controllers/
│   └── database/
├── views/               # Nova pasta de views
│   ├── layout.ejs      # Template base
│   └── tasks/
│       ├── index.ejs   # Lista de tarefas
│       └── form.ejs    # Formulário
└── public/             # Assets estáticos
```

### Rotas Adicionadas
```javascript
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
```

## API Endpoints

A API RESTful provê os seguintes endpoints para gerenciamento dos recursos:

### Usuários (`/api/users`)
- `GET /api/users`: Lista todos os usuários.
- `POST /api/users`: Cria um novo usuário.
- `GET /api/users/:id`: Obtém um usuário específico.
- `PUT /api/users/:id`: Atualiza um usuário.
- `DELETE /api/users/:id`: Remove um usuário.

### Projetos (`/api/projetos`)
- `GET /api/projetos`: Lista todos os projetos.
- `POST /api/projetos`: Cria um novo projeto.
- `GET /api/projetos/:id`: Obtém um projeto específico.
- `PUT /api/projetos/:id`: Atualiza um projeto.
- `DELETE /api/projetos/:id`: Remove um projeto.

### Tarefas (`/api/tarefas`)
- `GET /api/tarefas`: Lista todas as tarefas.
- `POST /api/tarefas`: Cria uma nova tarefa.
- `GET /api/tarefas/:id`: Obtém uma tarefa específica.
- `PUT /api/tarefas/:id`: Atualiza uma tarefa.
- `DELETE /api/tarefas/:id`: Remove uma tarefa.

### Comentários
- `POST /api/comentarios`: Cria um novo comentário (requer `tarefa_id` e `usuario_id` no corpo).
- `GET /api/tarefas/:tarefaId/comentarios`: Lista todos os comentários de uma tarefa específica.
- `GET /api/comentarios/:id`: Obtém um comentário específico.
- `PUT /api/comentarios/:id`: Atualiza o texto de um comentário.
- `DELETE /api/comentarios/:id`: Remove um comentário.

### Categorias de Quarto (`/api/categorias-quartos`)
- `GET /api/categorias-quartos`: Lista todas as categorias de quarto.
- `POST /api/categorias-quartos`: Cria uma nova categoria de quarto.
- `GET /api/categorias-quartos/:id`: Obtém uma categoria de quarto específica.
- `PUT /api/categorias-quartos/:id`: Atualiza uma categoria de quarto.
- `DELETE /api/categorias-quartos/:id`: Remove uma categoria de quarto.

### Quartos (`/api/rooms`)
- `GET /api/rooms`: Lista todos os quartos.
- `POST /api/rooms`: Cria um novo quarto.
- `GET /api/rooms/:id`: Obtém um quarto específico.
- `PUT /api/rooms/:id`: Atualiza um quarto.
- `DELETE /api/rooms/:id`: Remove um quarto.

## Interface do Usuário

### Componentes Principais

#### Card de Tarefa
- Design moderno com sombra e hover effect
- Status colorido
- Botões de ação
- Informações bem organizadas

#### Formulário
- Campos validados
- Feedback visual
- Botões de ação claros
- Navegação intuitiva

### Estilização
- Uso do Tailwind CSS para design responsivo
- Sistema de cores consistente
- Tipografia clara e legível
- Espaçamento e alinhamento profissionais

## Próximos Passos

1. Implementar sistema de busca e filtros
2. Adicionar paginação na lista de tarefas
3. Implementar autenticação de usuários
4. Adicionar categorias para tarefas
5. Implementar sistema de notificações

## Conclusão

O sistema evoluiu de uma API REST para uma aplicação web completa com interface moderna e funcional. A integração do frontend com o backend foi feita de forma limpa e eficiente, mantendo a compatibilidade com a API existente enquanto adiciona novas funcionalidades para o usuário final. 