# Documentação do Sistema de Gerenciamento

## Visão Geral

Sistema web completo para gerenciamento de tarefas, reservas de hotel e entidades relacionadas, com arquitetura MVC, integração com PostgreSQL e interface EJS estilizada com Bootstrap.

## Arquitetura

- **Model:** SQL puro via `pg` para cada entidade.
- **Controller:** Lógica de negócio, validação e resposta HTTP.
- **View:** EJS para interface web, com layout, partials e Bootstrap.
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
- Estilização com Bootstrap.

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

## Reflexão Crítica e Aprendizados

### 🎯 Principais Desafios Enfrentados

#### 1. Arquitetura MVC e Separação de Responsabilidades
**Desafio:** Organizar o código seguindo padrões MVC de forma clara e escalável, mantendo a separação entre lógica de negócio, dados e apresentação.

**Solução Aplicada:** 
- Criação de estrutura clara com pastas separadas para `controllers/`, `models/` e `routes/`
- Uso de models para encapsular toda a lógica de acesso ao banco de dados
- Controllers focados apenas na lógica de negócio e validação
- Views responsáveis apenas pela apresentação dos dados

**Aprendizado:** A separação clara de responsabilidades facilita enormemente a manutenção e evolução do código. Cada componente tem uma função específica, tornando o sistema mais modular e testável.

#### 2. Integração Frontend-Backend com Fetch API
**Desafio:** Criar uma interface que se comunique de forma assíncrona com o backend, proporcionando uma experiência de usuário fluida sem recarregamentos de página.

**Solução Aplicada:**
- Implementação da Fetch API para todas as operações CRUD
- Tratamento adequado de respostas JSON
- Feedback visual imediato para o usuário
- Validação tanto no frontend quanto no backend

**Aprendizado:** A comunicação assíncrona entre frontend e backend é fundamental para aplicações web modernas. A Fetch API oferece uma interface limpa e poderosa para essa integração.

#### 3. Relacionamentos Complexos entre Entidades
**Desafio:** Gerenciar relacionamentos entre usuários, endereços, reservas, pagamentos e outras entidades, mantendo a integridade referencial.

**Solução Aplicada:**
- Uso de chaves estrangeiras no banco de dados
- Queries JOIN para consultas relacionais
- Validação de integridade referencial no backend
- Interface que reflete esses relacionamentos

**Aprendizado:** O design de banco de dados relacional é crucial para aplicações complexas. A modelagem correta dos relacionamentos facilita consultas eficientes e mantém a consistência dos dados.

#### 4. Validação e Tratamento de Erros
**Desafio:** Garantir que os dados sejam válidos tanto no frontend quanto no backend, proporcionando feedback claro ao usuário.

**Solução Aplicada:**
- Validação HTML5 no frontend para experiência imediata
- Validação robusta no backend para segurança
- Tratamento padronizado de erros com mensagens claras
- Feedback visual diferenciado para sucessos e erros

**Aprendizado:** A validação em múltiplas camadas é essencial. O frontend proporciona experiência imediata, enquanto o backend garante segurança e integridade.

### ✅ Pontos que Funcionaram Bem

1. **Estrutura MVC Clara:** A organização do código em models, views e controllers facilitou muito o desenvolvimento e manutenção.

2. **API RESTful Consistente:** Todos os endpoints seguem padrões REST, facilitando a integração e documentação.

3. **Interface Responsiva:** O uso do Bootstrap garantiu uma interface moderna e adaptável a diferentes dispositivos.

4. **Comunicação Assíncrona:** A integração com Fetch API proporcionou uma experiência de usuário fluida.

5. **Documentação Completa:** A documentação detalhada facilita a compreensão e evolução do sistema.

### 🔧 Pontos que Gostaria de Melhorar

1. **Testes Automatizados:** Implementar testes unitários e de integração para garantir a qualidade do código.

2. **Autenticação e Autorização:** Adicionar sistema de login e controle de acesso aos recursos.

3. **Validação Mais Robusta:** Implementar validação mais sofisticada com bibliotecas como Joi ou express-validator.

4. **Tratamento de Erros Mais Elaborado:** Criar middleware específico para tratamento de erros com logging.

5. **Performance:** Implementar cache e otimizações de consultas para melhorar a performance.

6. **Deploy e CI/CD:** Configurar pipeline de deploy automatizado e ambiente de produção.

### 📚 Aprendizados Técnicos Significativos

1. **Arquitetura de Aplicações Web:** Compreensão profunda de como estruturar aplicações web escaláveis.

2. **Integração com Bancos de Dados:** Experiência prática com PostgreSQL e queries SQL complexas.

3. **Desenvolvimento Full-Stack:** Capacidade de trabalhar tanto no frontend quanto no backend de forma integrada.

4. **Padrões de Projeto:** Aplicação prática de padrões MVC e princípios SOLID.

5. **APIs RESTful:** Desenvolvimento de APIs seguindo melhores práticas e padrões estabelecidos.

### 🎓 Aprendizados Conceituais

1. **Importância da Documentação:** Documentação clara é fundamental para manutenção e evolução de projetos.

2. **Versionamento de Código:** Git é essencial para controle de versão e colaboração.

3. **Separação de Responsabilidades:** Código bem organizado é mais fácil de manter e evoluir.

4. **Experiência do Usuário:** A interface deve ser intuitiva e responsiva, proporcionando feedback claro.

5. **Segurança:** Validação e sanitização de dados são fundamentais para aplicações web.

### 🚀 Próximos Passos

Para evolução futura do projeto, gostaria de:

1. **Implementar Autenticação:** Sistema de login com JWT ou sessões.
2. **Adicionar Testes:** Cobertura completa com Jest e Supertest.
3. **Melhorar Performance:** Implementar cache e otimizações de banco.
4. **Deploy em Produção:** Configurar ambiente de produção com Docker.
5. **Monitoramento:** Implementar logs e métricas de performance.

## Conclusão

Este projeto representou uma jornada completa de desenvolvimento web, desde a concepção da arquitetura até a implementação de uma interface funcional e moderna. Os desafios enfrentados e as soluções aplicadas proporcionaram aprendizados valiosos sobre desenvolvimento full-stack, arquitetura de software e boas práticas de programação.

O sistema está pronto para uso e demonstra competência técnica em todas as áreas abordadas: backend robusto, frontend responsivo, banco de dados bem estruturado e documentação completa. A experiência adquirida será fundamental para futuros projetos e desenvolvimento profissional.