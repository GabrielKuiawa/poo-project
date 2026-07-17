# Frontend

Frontend da plataforma Mood Board, construído com React, TypeScript e Vite.

A página atual apresenta a proposta do produto e os principais endpoints da API. Ela é a base para as futuras telas de feed, autenticação, publicação e organização de referências.

## Tecnologias

- React
- TypeScript
- Vite
- Oxlint
- Nginx no ambiente Docker

## Variáveis de ambiente

Crie o arquivo local:

```bash
cp .env.example .env
```

O frontend precisa somente do endereço público da API:

```env
VITE_API_URL=http://localhost:3000
```

Variáveis prefixadas com `VITE_` são incorporadas ao JavaScript durante o build e não devem conter segredos.

## Desenvolvimento

Na pasta `frontend`:

```bash
npm ci
npm run dev
```

A aplicação estará em `http://localhost:5173`.

Comandos disponíveis:

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run typecheck` | Verifica o TypeScript |
| `npm run lint` | Executa o Oxlint |
| `npm run build` | Gera o build em `dist/` |
| `npm run preview` | Serve o build localmente para conferência |

## Docker

O `Dockerfile` desta pasta compila o React e serve os arquivos estáticos com Nginx. Ele é utilizado pelo `docker-compose.yml` da raiz.

Para iniciar frontend, backend e banco juntos:

```bash
npm run docker:up
```

O frontend em container fica disponível em `http://localhost:5173`.

## GitHub Pages

Depois de um push na `main`, o workflow de CI:

1. Executa as validações do monorepo.
2. Configura o caminho público do Vite.
3. Compila a aplicação com a API de produção.
4. Publica `dist/` no GitHub Pages.

O endereço publicado é:

```text
https://mood-board.gabizin.me
```

Configuração do repositório:

```text
Settings > Pages > Source: GitHub Actions
Custom domain: mood-board.gabizin.me
```

Configuração DNS:

```text
Tipo:    CNAME
Host:    mood-board
Destino: GabrielKuiawa.github.io
```

O workflow define `VITE_API_URL=https://api.mood-board.gabizin.me` durante o build de produção. Não é necessário criar um `.env` de produção no repositório.

O `VITE_BASE_PATH` também é fornecido pelo workflow para que os assets funcionem tanto no endereço padrão do Pages quanto no domínio personalizado.
