import './index.css'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type Endpoint = {
  method: HttpMethod
  path: string
  description: string
}

const endpoints: Endpoint[] = [
  { method: 'GET', path: '/', description: 'Apresenta a API' },
  { method: 'POST', path: '/api/user', description: 'Cadastra um usuário' },
  { method: 'POST', path: '/api/user/login', description: 'Autentica um usuário' },
  { method: 'GET', path: '/api/user', description: 'Lista os usuários' },
  { method: 'GET', path: '/api/image', description: 'Lista as imagens' },
  { method: 'POST', path: '/api/image', description: 'Publica uma imagem' },
  { method: 'GET', path: '/api/category', description: 'Lista as categorias' },
  { method: 'POST', path: '/api/category', description: 'Cria uma categoria' },
]

const apiUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)

function App() {
  return (
    <main className="page">
      <header className="hero">
        <span className="eyebrow">Mood Board</span>
        <h1>Plataforma de inspiração visual</h1>
        <p>Frontend React em construção. Estes são os endpoints principais da API.</p>
        <a className="api-link" href={apiUrl} target="_blank" rel="noreferrer">
          {apiUrl}
        </a>
      </header>

      <section aria-labelledby="endpoints-title">
        <h2 id="endpoints-title">Endpoints</h2>
        <div className="endpoint-list">
          {endpoints.map((endpoint) => (
            <article className="endpoint" key={`${endpoint.method}-${endpoint.path}`}>
              <span className={`method method-${endpoint.method.toLowerCase()}`}>
                {endpoint.method}
              </span>
              {endpoint.method === 'GET' ? (
                <a href={`${apiUrl}${endpoint.path}`} target="_blank" rel="noreferrer">
                  {endpoint.path}
                </a>
              ) : (
                <code>{endpoint.path}</code>
              )}
              <p>{endpoint.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
