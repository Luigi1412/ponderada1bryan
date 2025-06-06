# Documentação do Sistema de Gerenciamento

## Visão Geral

Sistema web completo para gerenciamento de tarefas, reservas de hotel e entidades relacionadas, com arquitetura MVC, integração com PostgreSQL e interface EJS estilizada com Tailwind CSS.

## Arquitetura

- **Model:** SQL puro via `pg` para cada entidade.
- **Controller:** Lógica de negócio, validação e resposta HTTP.
- **View:** EJS para interface web, com layout, partials e Tailwind.
- **Rotas:** RESTful para API e rotas de views.

## Estrutura de Pastas

```
src/
  controllers/
  models/
  routes/
  services/
  middlewares/
  server.js
views/
  layout.ejs
  partials/
  users/
  rooms/
  reservations/
  enderecos/
  avaliacoes/
  pagamentos/
  categorias-quartos/
  projetos/
  tarefas/
  comentarios/
public/
```

## Endpoints RESTful

### Usuários (`/api/users`)
- `GET /api/users`: Lista todos os usuários.
- `POST /api/users`: Cria um novo usuário.
- `GET /api/users/:id`: Obtém um usuário específico.
- `PUT /api/users/:id`: Atualiza um usuário.
- `DELETE /api/users/:id`: Remove um usuário.

### Quartos (`/api/rooms`)
- `GET /api/rooms`: Lista todos os quartos.
- `POST /api/rooms`: Cria um novo quarto.
- `GET /api/rooms/:id`: Obtém um quarto específico.
- `PUT /api/rooms/:id`: Atualiza um quarto.
- `DELETE /api/rooms/:id`: Remove um quarto.

### Reservas (`/api/reservations`)
- `GET /api/reservations`: Lista todas as reservas.
- `POST /api/reservations`: Cria uma nova reserva.
- `GET /api/reservations/:id`: Obtém uma reserva específica.
- `PUT /api/reservations/:id`: Atualiza uma reserva.
- `DELETE /api/reservations/:id`: Remove uma reserva.

### Endereços (`/api/enderecos`)
- `GET /api/enderecos`: Lista todos os endereços.
- `POST /api/enderecos`: Cria um novo endereço.
- `GET /api/enderecos/:id`: Obtém um endereço específico.
- `PUT /api/enderecos/:id`: Atualiza um endereço.
- `DELETE /api/enderecos/:id`: Remove um endereço.

### Avaliações (`/api/avaliacoes`)
- `GET /api/avaliacoes`: Lista todas as avaliações.
- `POST /api/avaliacoes`: Cria uma nova avaliação.
- `GET /api/avaliacoes/:id`: Obtém uma avaliação específica.
- `PUT /api/avaliacoes/:id`: Atualiza uma avaliação.
- `DELETE /api/avaliacoes/:id`: Remove uma avaliação.

### Pagamentos (`/api/pagamentos`)
- `GET /api/pagamentos`: Lista todos os pagamentos.
- `POST /api/pagamentos`: Cria um novo pagamento.
- `GET /api/pagamentos/:id`: Obtém um pagamento específico.
- `PUT /api/pagamentos/:id`: Atualiza um pagamento.
- `DELETE /api/pagamentos/:id`: Remove um pagamento.

### Categorias de Quartos (`/api/categorias-quartos`)
- `GET /api/categorias-quartos`: Lista todas as categorias.
- `POST /api/categorias-quartos`: Cria uma nova categoria.
- `GET /api/categorias-quartos/:id`: Obtém uma categoria específica.
- `PUT /api/categorias-quartos/:id`: Atualiza uma categoria.
- `DELETE /api/categorias-quartos/:id`: Remove uma categoria.

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

## Views

- Cada entidade possui views EJS para listagem (`index.ejs`) e formulário (`form.ejs`).
- Layout e partials para cabeçalho e rodapé.
- Navegação entre entidades via menu.
- Estilização com Tailwind CSS.

## Como Rodar

1. Configure o `.env` e rode `npm install`
2. Rode `npm run init-db` para criar as tabelas
3. Rode `npm run dev` para iniciar o servidor
4. Acesse `http://localhost:3000` para a interface web
5. Use `/api` para os endpoints REST

## Diagrama de Arquitetura

![Diagrama MVC](https://github.com/kterra/Inteli-2024-1B/blob/main/materiais/ponderada-2/exemplo-arq-v2.jpg)

## Parte 3: Interface Visual e Integração Frontend-Backend

Nesta etapa, o foco foi dar vida ao sistema, construindo uma interface visual completa e interativa que se comunica com o backend.

### 1. Construção das Views com EJS

Criei páginas EJS para cada entidade principal do sistema, permitindo a visualização e manipulação dos dados diretamente pelo navegador.

- **Páginas de Listagem (`index.ejs`):** Exibem todos os registros de uma entidade em uma tabela.
- **Páginas de Formulário (`form.ejs`):** Permitem criar um novo registro ou editar um existente.

**Exemplo de Views Criadas:**

- **Tela de Listagem de Endereços:**
  *Aqui, eu exibo todos os endereços cadastrados, com opções para editar ou excluir cada um.*
  `[INSERIR PRINT DA TELA /enderecos]`

- **Formulário de Endereço:**
  *Este formulário permite cadastrar um novo endereço ou atualizar um existente, com validação de campos.*
  `[INSERIR PRINT DA TELA /enderecos/novo]`

- **Tela de Listagem de Pagamentos:**
  *Similarmente, esta tela mostra o histórico de pagamentos.*
  `[INSERIR PRINT DA TELA /pagamentos]`

- **Formulário de Pagamento:**
  *Formulário para registrar ou editar um pagamento, associado a uma reserva.*
  `[INSERIR PRINT DA TELA /pagamentos/novo]`

### 2. Integração com Fetch API

Para tornar a interface dinâmica, utilizei a **Fetch API** do JavaScript. As ações de criar, editar e excluir em todas as páginas de formulário e listagem agora acontecem de forma assíncrona, comunicando-se com as rotas `/api/...` do backend sem a necessidade de recarregar a página.

### 3. Estilização com Bootstrap

Toda a interface foi estilizada utilizando o framework **Bootstrap**. Isso garantiu:
- **Layout Responsivo:** O sistema se adapta a diferentes tamanhos de tela.
- **Componentes Modernos:** Usei componentes como *Cards*, *Modals* e *Grids* para organizar a informação de forma clara.
- **Feedback Visual:** Botões, links e campos de formulário possuem estados visuais (hover, focus, disabled), melhorando a experiência do usuário.

### 4. Mudanças Relevantes no Backend

Para suportar a nova interface, fiz ajustes importantes no backend:

- **Criação de Rotas para Views:** Em `src/server.js`, adicionei rotas específicas para renderizar as páginas EJS (ex: `app.get('/enderecos', ...)`) e passar os dados necessários.
- **Refatoração dos Models:** Ajustei os métodos `update` de todos os modelos (`UserModel`, `EnderecoModel`, etc.) para que eles atualizem apenas os campos enviados, evitando a perda de dados caso um campo opcional não seja preenchido no formulário. Isso tornou o backend mais robusto e seguro.

## Testes

- Teste os endpoints com o arquivo `requests.http` ou Postman.
- Teste as views acessando as rotas no navegador.

## Conclusão

O sistema está pronto para uso e atende todos os requisitos da entrega.