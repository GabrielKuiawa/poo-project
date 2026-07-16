# Plataforma de Inspiração Visual

Uma plataforma de descoberta, compartilhamento e organização de referências visuais, inspirada em produtos como o Pinterest. A proposta é permitir que usuários publiquem imagens, encontrem inspirações e organizem conteúdos por categorias de acordo com seus interesses.

O backend REST existente representa a primeira etapa dessa visão. O objetivo não é apenas entregar operações CRUD, mas evoluir a base atual até uma aplicação completa, com experiência social, frontend próprio e infraestrutura preparada para produção.

Ao mesmo tempo, o projeto funciona como um ambiente prático para aprender programação orientada a objetos, arquitetura backend, bancos de dados, testes automatizados, containers, CI/CD e práticas de implantação.

O projeto nasceu como um trabalho da disciplina de Programação Orientada a Objetos da faculdade. Depois da entrega acadêmica, decidi continuar seu desenvolvimento e utilizá-lo para estudar práticas que vão além do conteúdo original da matéria, aproximando-o gradualmente de um produto real e preparado para produção.

> **Status:** projeto de aprendizado em desenvolvimento ativo. A API principal e o ambiente Docker já estão disponíveis. O fortalecimento da autenticação, os testes automatizados, o CI/CD e o frontend fazem parte do roadmap.

## Visão do produto

A experiência planejada é semelhante à de uma rede de inspiração visual:

```text
Usuário publica uma imagem
          ↓
Adiciona descrição e categorias
          ↓
Outros usuários descobrem o conteúdo
          ↓
Salvam e organizam suas referências
```

No estágio atual, usuários, imagens e categorias formam o núcleo do domínio. Recursos como feed, busca, coleções, interações sociais e descoberta de conteúdo serão adicionados conforme a aplicação evoluir.

## Objetivos de aprendizado

- Programação orientada a objetos com TypeScript
- Arquitetura backend em camadas e separação de responsabilidades
- Desenvolvimento de APIs REST com Express
- Relacionamentos entre entidades e persistência com TypeORM
- Autenticação com JWT e hash de senhas com bcrypt
- Tratamento de erros e logs da aplicação
- Configuração por variáveis de ambiente
- Docker, builds multi-stage, Compose, healthchecks e volumes
- Testes unitários, de integração e ponta a ponta
- GitHub Projects, Issues, Pull Requests, CI, CD e deploy

## Funcionalidades

- Cadastro e login de usuários
- Hash de senhas com bcrypt
- Geração de JWT no login
- CRUD de usuários
- CRUD de imagens
- CRUD de categorias
- Relacionamentos entre usuários, imagens e categorias
- Associação de imagens a múltiplas categorias
- Tratamento centralizado de erros HTTP
- Persistência em MySQL com TypeORM
- API e banco executados em containers
- Persistência dos dados do MySQL em volume Docker

## Tecnologias

| Área | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Linguagem | TypeScript |
| Servidor HTTP | Express |
| ORM | TypeORM |
| Banco de dados | MySQL |
| Autenticação | JSON Web Token |
| Hash de senhas | bcryptjs |
| Testes | Jest e ts-jest |
| Containers | Docker e Docker Compose |

## Arquitetura

A API utiliza uma estrutura em camadas:

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

- **Rotas:** associam endpoints HTTP às operações dos controllers.
- **Controllers:** processam requisições e constroem respostas HTTP.
- **Serviços:** orquestram casos de uso e regras de domínio.
- **Repositórios:** isolam as operações de persistência.
- **Models:** representam as entidades e seus comportamentos.
- **Middlewares:** tratam aspectos compartilhados, como erros e autenticação.

## Modelo de domínio

```text
Usuário 1 ──── * Imagem
Usuário 1 ──── * Categoria
Imagem * ───── * Categoria
```

Um usuário pode possuir várias imagens e categorias. Uma imagem pode pertencer a várias categorias.

## Estrutura do projeto

```text
.
├── src/
│   ├── controller/     # Requisições e respostas HTTP
│   ├── enum/           # Enumerações do domínio
│   ├── exception/      # Exceções HTTP e da aplicação
│   ├── middlewares/    # Middlewares do Express
│   ├── models/         # Entidades TypeORM e comportamentos de domínio
│   ├── repository/     # Acesso ao banco de dados
│   ├── route/          # Definição das rotas
│   ├── service/        # Casos de uso da aplicação
│   ├── utils/          # Validação e logs
│   ├── App.ts          # Configuração do Express
│   ├── data-source.ts  # Configuração do TypeORM
│   └── server.ts       # Ponto de entrada
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
└── tsconfig.json
```

## Executando com Docker

### Requisitos

- Docker
- Docker Compose

### 1. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Preencha as variáveis:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=sua_senha_do_banco
DB_DATABASE=image_management

MYSQL_ROOT_PASSWORD=sua_senha_root

JWT_SECRET=seu_segredo_jwt_longo_e_aleatorio
```

Quando a API é executada pelo Docker Compose, o `DB_HOST` é sobrescrito com o nome do serviço MySQL. O valor `localhost` é utilizado quando a API roda diretamente na máquina.

### 2. Construa e inicie a aplicação

```bash
docker compose up --build
```

Para executar em segundo plano:

```bash
docker compose up --build -d
```

A API estará disponível em:

```text
http://localhost:3000
```

Consulte o estado dos containers:

```bash
docker compose ps
```

Acompanhe os logs da API:

```bash
docker compose logs -f node-app
```

Encerre o ambiente preservando o banco:

```bash
docker compose down
```

> O comando `docker compose down -v` também remove o volume do MySQL e todos os dados armazenados nele.

## Desenvolvimento local

### Requisitos

- Node.js
- npm
- Uma instância do MySQL em execução

Instale as dependências:

```bash
npm ci
```

Inicie somente o banco pelo Docker:

```bash
docker compose up -d mysql
```

Execute a API com recarregamento automático:

```bash
npm run dev
```

Compile e execute a aplicação gerada:

```bash
npm run build
npm start
```

Valide os tipos sem gerar arquivos:

```bash
npm run typecheck
```

## Endpoints da API

A URL-base atual é:

```text
http://localhost:3000/api
```

### Usuários

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/user/login` | Autentica um usuário e gera um JWT |
| `GET` | `/user` | Lista os usuários |
| `POST` | `/user` | Cria um usuário |
| `GET` | `/user/:id` | Busca um usuário pelo ID |
| `PUT` | `/user/:id` | Atualiza um usuário |
| `DELETE` | `/user/:id` | Exclui um usuário |
| `GET` | `/user/images/:id` | Busca um usuário com suas imagens |

### Imagens

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/image` | Lista as imagens |
| `POST` | `/image` | Cria uma imagem |
| `GET` | `/image/:id` | Busca uma imagem pelo ID |
| `PUT` | `/image/:id` | Atualiza uma imagem |
| `DELETE` | `/image/:id` | Exclui uma imagem |

### Categorias

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/category` | Lista as categorias |
| `POST` | `/category` | Cria uma categoria |
| `GET` | `/category/:id` | Busca uma categoria pelo ID |
| `PUT` | `/category/:id` | Atualiza uma categoria |
| `DELETE` | `/category/:id` | Exclui uma categoria |

> A autorização das rotas ainda está sendo fortalecida. A API não deve ser considerada pronta para produção até que o controle de acesso esteja completamente aplicado e testado.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Executa o TypeScript com recarregamento automático |
| `npm run build` | Compila o TypeScript para o diretório `build/` |
| `npm start` | Executa a aplicação compilada |
| `npm run typecheck` | Valida os tipos sem gerar arquivos |
| `npm run migration:run` | Aplica as migrations pendentes |
| `npm run migration:revert` | Reverte a última migration aplicada |
| `npm test` | Executa toda a suíte com Jest |
| `npm run test:unit` | Executa apenas os testes unitários |
| `npm run test:integration` | Executa serviços e repositórios contra o MySQL de teste |
| `npm run test:e2e` | Executa a API completa por HTTP contra o MySQL de teste |
| `npm run test:db:up` | Inicia o MySQL temporário usado pelos testes |
| `npm run test:db:down` | Encerra e remove o ambiente de banco dos testes |

## Autenticação e autorização

O cadastro e o login são públicos. As operações de escrita de imagens e categorias exigem um JWT no cabeçalho:

```http
Authorization: Bearer <token>
```

Usuários comuns podem consultar e alterar apenas o próprio perfil e os próprios recursos. A listagem completa de usuários é restrita a administradores. O papel enviado no cadastro é ignorado e toda conta pública é criada como `user`.

As rotas públicas de leitura de imagens e categorias permanecem abertas para permitir a futura experiência de descoberta de conteúdo.

## Banco de dados e migrations

O schema não é alterado automaticamente pela aplicação. As mudanças estruturais são versionadas em `src/migration/` e executadas na inicialização ou manualmente com:

```bash
npm run migration:run
```

Um MySQL isolado e temporário para os testes de integração e E2E está definido em `docker-compose.test.yml`.

## Testes

O Jest e o ts-jest executam três níveis de teste:

- **Unitários:** serviços com repositórios simulados e middlewares isolados.
- **Integração:** serviços, repositórios, TypeORM, migrations e MySQL real.
- **E2E:** aplicação Express completa por HTTP, incluindo autenticação, autorização e persistência.

Para executar os testes que dependem do banco:

```bash
npm run test:db:up
npm run test:integration
npm run test:e2e
npm run test:db:down
```

O banco usa `tmpfs`, não compartilha dados com o ambiente de desenvolvimento e é limpo entre os casos de teste. Porta, credenciais e nome podem ser sobrescritos pelas variáveis `DB_TEST_PORT`, `DB_TEST_USERNAME`, `DB_TEST_PASSWORD` e `DB_TEST_DATABASE`.

## CI/CD

O workflow `.github/workflows/ci.yml` executa typecheck, build, testes unitários, integração e E2E. Em Pull Requests ele apenas valida o código. Depois de um push na `main`, o deploy para a DigitalOcean é liberado somente se todos os jobs anteriores passarem e a variável `DIGITALOCEAN_DEPLOY_ENABLED` estiver definida como `true`.

A infraestrutura da App Platform está descrita em `.do/app.yaml`. Ela utiliza o `Dockerfile` da raiz, uma única instância da API e o domínio planejado `api.mood-board.gabizin.me`. O autodeploy da própria App Platform permanece desabilitado para que o GitHub Actions seja o único responsável pela publicação.

Antes de habilitar o deploy, o ambiente `production` do GitHub deve receber estes secrets:

```text
DIGITALOCEAN_ACCESS_TOKEN
DO_DB_HOST
DO_DB_PORT
DO_DB_USERNAME
DO_DB_PASSWORD
DO_DB_DATABASE
DO_JWT_SECRET
```

Depois que o Managed MySQL e os secrets estiverem configurados, crie a variável de repositório:

```text
DIGITALOCEAN_DEPLOY_ENABLED=true
```

O Managed MySQL deve permitir conexões da aplicação por meio de Trusted Sources. No DNS de `gabizin.me`, o registro `CNAME` de `api.mood-board` deve apontar para o endereço fornecido pela App Platform.

## Estrutura do Docker

A imagem Node utiliza um build multi-stage:

1. O estágio `builder` instala as dependências de desenvolvimento e compila o TypeScript.
2. O estágio `runtime` instala somente as dependências de produção.
3. O JavaScript compilado é copiado para a imagem de execução.
4. A aplicação é executada pelo usuário `node`, sem privilégios de root.

O MySQL armazena seus arquivos em um volume nomeado. Assim, recriar o container não apaga o banco. O volume fornece persistência, mas não substitui backups externos em produção.

## Visão de produção

A arquitetura planejada separa as responsabilidades entre serviços:

```text
Frontend React
      ↓
 API Node.js
      ↓ rede privada
Banco MySQL
```

A API, o banco e o futuro frontend poderão ser implantados de forma independente. As variáveis de ambiente fornecerão endereços e segredos específicos de cada ambiente sem exigir a reconstrução das imagens.

## Roadmap

- [x] Organizar a API utilizando uma arquitetura em camadas
- [x] Adicionar persistência em MySQL com TypeORM
- [x] Adicionar configuração por variáveis de ambiente
- [x] Executar o MySQL em container com armazenamento persistente
- [x] Adicionar um build Docker multi-stage para a API
- [x] Melhorar a inicialização e o tratamento de falhas do banco
- [x] Fortalecer a autenticação e a autorização das rotas
- [x] Adicionar validação de requisições e erros HTTP consistentes
- [x] Adicionar testes unitários dos serviços
- [x] Adicionar testes de integração e E2E
- [ ] Automatizar os testes do Postman com Newman
- [ ] Adicionar verificações de lint, formatação e cobertura
- [ ] Criar um fluxo com GitHub Issues e Projects
- [x] Adicionar integração contínua
- [ ] Ativar a entrega contínua do backend na DigitalOcean
- [x] Substituir a sincronização automática por migrations
- [ ] Adicionar logs estruturados e centralizados
- [ ] Converter o repositório em um monorepo
- [ ] Adicionar um frontend em React
- [ ] Criar feed e descoberta de imagens
- [ ] Adicionar busca por imagens e categorias
- [ ] Permitir que usuários salvem e organizem referências
- [ ] Adicionar interações sociais entre usuários e conteúdos

## Por que este projeto existe

Este projeto começou como uma atividade acadêmica da disciplina de Programação Orientada a Objetos. A primeira versão tinha como foco aplicar conceitos como classes, encapsulamento, relacionamentos e separação de responsabilidades em uma API.

Após a disciplina, o projeto passou a ser utilizado como um laboratório pessoal de engenharia de software. A proposta agora é transformar aquela base acadêmica em uma plataforma de inspiração visual sustentável e preparada para produção.

Decisões de produto e arquitetura, erros, refatorações, testes, containers, automações e deploys fazem parte intencionalmente dessa jornada. O histórico do repositório também registra a evolução do meu conhecimento: de um projeto focado em POO para uma aplicação completa, testada, automatizada e implantada.

O projeto continuará evoluindo à medida que novas práticas de engenharia forem estudadas e aplicadas.
