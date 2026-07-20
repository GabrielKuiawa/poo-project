# Backend

API REST da plataforma Mood Board. O backend gerencia usuários, autenticação, imagens, categorias e seus relacionamentos.

## Tecnologias

- Node.js e TypeScript
- Express
- TypeORM e MySQL
- JWT e bcryptjs
- Jest, ts-jest e Supertest
- Docker

## Arquitetura

```text
Requisição HTTP
      ↓
    Rota
      ↓
 Controller
      ↓
  Serviço
      ↓
Repositório
      ↓
TypeORM / MySQL
```

- `route`: associa URLs e métodos HTTP aos controllers.
- `controller`: recebe a requisição e constrói a resposta HTTP.
- `service`: contém casos de uso e regras de autorização.
- `repository`: isola a persistência.
- `models`: representa as entidades do domínio.
- `middlewares`: trata autenticação, validação e erros compartilhados.

O modelo atual possui os relacionamentos:

```text
Usuário 1 ──── * Imagem
Usuário 1 ──── * Categoria
Imagem * ───── * Categoria
```

## Variáveis de ambiente

Crie o arquivo local:

```bash
cp .env.example .env
```

| Variável              | Uso                                                   |
| --------------------- | ----------------------------------------------------- |
| `PORT`                | Porta HTTP da API                                     |
| `CORS_ORIGIN`         | Origens do frontend permitidas, separadas por vírgula |
| `DATABASE_URL`        | URL do banco gerenciado em produção                   |
| `DB_HOST`             | Host do MySQL local                                   |
| `DB_PORT`             | Porta do MySQL                                        |
| `DB_USERNAME`         | Usuário do banco                                      |
| `DB_PASSWORD`         | Senha do banco                                        |
| `DB_DATABASE`         | Nome do banco                                         |
| `DB_SSL`              | Habilita SSL na conexão                               |
| `MYSQL_ROOT_PASSWORD` | Senha root usada pelo Compose local                   |
| `JWT_SECRET`          | Segredo usado para assinar tokens                     |
| `DB_TEST_PORT`        | Porta do MySQL isolado dos testes                     |
| `DB_TEST_DATABASE`    | Nome do banco de testes                               |

`DATABASE_URL`, quando preenchida, substitui as variáveis `DB_*` de conexão. Dentro do Docker Compose, o host do banco é sobrescrito para `mysql`; fora dos containers, o padrão é `localhost`.

## Desenvolvimento

Na pasta `backend`:

```bash
npm ci
npm run dev
```

A API estará em `http://localhost:3000`. Ela precisa de um MySQL acessível; pela raiz do monorepo, use `npm run db:up` para iniciar somente o banco local.

Comandos principais:

| Comando                    | Função                                    |
| -------------------------- | ----------------------------------------- |
| `npm run dev`              | Executa com recarregamento automático     |
| `npm run typecheck`        | Verifica o TypeScript                     |
| `npm run lint`             | Verifica problemas estáticos com Oxlint   |
| `npm run format`           | Formata o backend com Prettier            |
| `npm run format:check`     | Confere a formatação sem alterar arquivos |
| `npm run build`            | Gera o JavaScript em `build/`             |
| `npm start`                | Executa o build compilado                 |
| `npm run migration:run`    | Aplica migrations pendentes               |
| `npm run migration:revert` | Reverte a última migration                |
| `npm run seed:dev`         | Popula o banco usando o TypeScript local  |
| `npm run seed`             | Popula o banco usando o build compilado   |
| `npm run test:unit`        | Executa testes unitários                  |
| `npm run test:integration` | Executa testes de integração              |
| `npm run test:e2e`         | Executa testes HTTP ponta a ponta         |

## Endpoints

As rotas dos recursos utilizam o prefixo `/api`.

### Usuários

| Método   | Endpoint               | Descrição                     |
| -------- | ---------------------- | ----------------------------- |
| `POST`   | `/api/user/login`      | Autentica e gera um JWT       |
| `GET`    | `/api/user`            | Lista usuários                |
| `POST`   | `/api/user`            | Cadastra um usuário           |
| `GET`    | `/api/user/:id`        | Busca um usuário              |
| `PUT`    | `/api/user/:id`        | Atualiza um usuário           |
| `DELETE` | `/api/user/:id`        | Exclui um usuário             |
| `GET`    | `/api/user/images/:id` | Busca usuário e suas imagens  |
| `GET`    | `/api/user/me`         | Retorna o usuário autenticado |

### Imagens

| Método   | Endpoint         | Descrição           |
| -------- | ---------------- | ------------------- |
| `GET`    | `/api/image`     | Lista imagens       |
| `POST`   | `/api/image`     | Publica uma imagem  |
| `GET`    | `/api/image/:id` | Busca uma imagem    |
| `PUT`    | `/api/image/:id` | Atualiza uma imagem |
| `DELETE` | `/api/image/:id` | Exclui uma imagem   |

### Categorias

| Método   | Endpoint             | Descrição                               |
| -------- | -------------------- | --------------------------------------- |
| `GET`    | `/api/category`      | Lista categorias                        |
| `GET`    | `/api/category/mine` | Lista categorias do usuário autenticado |
| `POST`   | `/api/category`      | Cria uma categoria                      |
| `GET`    | `/api/category/:id`  | Busca uma categoria                     |
| `PUT`    | `/api/category/:id`  | Atualiza uma categoria                  |
| `DELETE` | `/api/category/:id`  | Exclui uma categoria                    |

`GET /` apresenta a API e seus principais endpoints.

## Autenticação e autorização

Cadastro, login e leitura de categorias são públicos. A leitura e todas as operações de escrita de imagens são protegidas. Rotas protegidas recebem o token no cabeçalho:

```http
Authorization: Bearer <token>
```

Usuários comuns gerenciam apenas o próprio perfil e seus recursos. A listagem completa de usuários é restrita a administradores. Contas criadas pela rota pública sempre recebem o papel `user`.

## Banco e migrations

O TypeORM não sincroniza o schema automaticamente. Mudanças estruturais ficam versionadas em `src/migration/`.

```bash
npm run migration:run
npm run migration:revert
```

Não edite uma migration que já foi aplicada. Crie uma nova migration para cada alteração posterior do schema.

### Dados de demonstração

O seeder cria 8 usuários, 48 categorias e 200 imagens para desenvolvimento ou demonstração. Ele executa as migrations pendentes e substitui somente as contas com e-mails reservados pelo próprio seed, portanto pode ser executado novamente sem duplicar dados.

O `.env.example` fornece `MoodBoard123!` para as contas de demonstração locais.
Você pode alterar o valor de `SEED_USER_PASSWORD`, desde que tenha pelo menos 8
caracteres. Execute o seed local com o TypeScript:

```bash
npm run seed:dev
```

Em uma imagem de produção já compilada:

```bash
npm run seed
```

O seeder não roda durante a inicialização normal do container. Em produção, ele deve ser configurado como um job `PRE_DEPLOY` da DigitalOcean App Platform para executar antes de cada publicação:

```text
Source:      GitHub / GabrielKuiawa/mood-board / main
Dockerfile:  Dockerfile
Run command: npm run seed
Trigger:     Before every deploy
```

O job precisa receber `DATABASE_URL` e `SEED_USER_PASSWORD`. Como a configuração atual do backend valida todas as variáveis ao carregar o DataSource, compartilhe também `PORT`, `CORS_ORIGIN` e `JWT_SECRET` com o job. Marque `DATABASE_URL`, `SEED_USER_PASSWORD` e `JWT_SECRET` como secrets.

Depois que esse recurso for salvo no app `mood-board`, o workflow de CD existente preserva o job remoto e cada deploy executa migrations e seed antes de publicar a nova versão. Se o seed falhar, a publicação não deve prosseguir. Todos os usuários de demonstração utilizam a mesma senha definida em `SEED_USER_PASSWORD`; o valor não é registrado nos logs.

## Testes

Os testes de integração e E2E utilizam um MySQL temporário definido em `docker-compose.test.yml`. O banco usa `tmpfs` e é removido ao final.

```bash
npm run test:db:up
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:db:down
```

As suítes que compartilham banco são executadas sequencialmente com `--runInBand`.

## Docker e produção

O `Dockerfile` usado pela API fica na raiz do monorepo porque a DigitalOcean constrói o repositório a partir desse contexto. A imagem utiliza build multi-stage e executa a aplicação com o usuário `node`.

Em produção:

- API: `https://api.mood-board.gabizin.me`
- Hospedagem: DigitalOcean App Platform
- Banco: Managed MySQL fornecido por `DATABASE_URL`
- Segredo necessário no GitHub: `DIGITALOCEAN_ACCESS_TOKEN`

O deploy ocorre pelo workflow `.github/workflows/cd.yml` depois que o CI do mesmo commit passa em um push para a `main`.
