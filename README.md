# API de Gerenciamento de Imagens

Uma API REST para organizar imagens em categorias e associá-las a usuários. Este projeto está sendo desenvolvido como um ambiente prático para aprender programação orientada a objetos, arquitetura backend, bancos de dados, testes automatizados, containers, CI/CD e práticas de implantação em produção.

O objetivo não é apenas entregar um CRUD funcional, mas evoluir uma aplicação pequena utilizando práticas de engenharia adotadas em projetos reais.

> **Status:** projeto de aprendizado em desenvolvimento ativo. A API principal e o ambiente Docker já estão disponíveis. O fortalecimento da autenticação, os testes automatizados, o CI/CD e o frontend fazem parte do roadmap.

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
| `npm test` | Executa os testes com Jest |

## Testes

O Jest e o ts-jest estão configurados, mas a suíte automatizada ainda está em desenvolvimento. A estratégia planejada inclui:

- Testes unitários de validações e comportamentos de domínio
- Testes dos serviços com dependências simuladas
- Testes de integração dos repositórios com um banco dedicado
- Testes HTTP das rotas da API
- Coleções do Postman automatizadas com Newman
- Relatórios de cobertura na integração contínua

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
- [ ] Melhorar a inicialização e o tratamento de falhas do banco
- [ ] Fortalecer a autenticação e a autorização das rotas
- [ ] Adicionar validação de requisições e erros HTTP consistentes
- [ ] Adicionar testes unitários e de integração
- [ ] Automatizar os testes do Postman com Newman
- [ ] Adicionar verificações de lint, formatação e cobertura
- [ ] Criar um fluxo com GitHub Issues e Projects
- [ ] Adicionar integração contínua
- [ ] Adicionar pipelines de entrega para staging e produção
- [ ] Substituir a sincronização automática por migrations
- [ ] Adicionar logs estruturados e centralizados
- [ ] Converter o repositório em um monorepo
- [ ] Adicionar um frontend em React

## Por que este projeto existe

Este repositório documenta o processo de transformar uma aplicação CRUD orientada a objetos em um sistema sustentável e preparado para produção. Decisões arquiteturais, erros, refatorações, testes, automações e deploys fazem parte intencionalmente da jornada de aprendizado.

O projeto continuará evoluindo à medida que novas práticas de engenharia forem estudadas e aplicadas.
