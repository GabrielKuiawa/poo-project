export type ImageMock = {
  id: string
  pathImage: string
  description: string
  author: {
    id: string
    name: string
    pathImageUser: string
  }
  categories: {
    id: string
    name: string
  }[]
}

const categories = [
  { id: 'category-architecture', name: 'Arquitetura' },
  { id: 'category-art', name: 'Arte' },
  { id: 'category-design', name: 'Design' },
  { id: 'category-fashion', name: 'Moda' },
  { id: 'category-interiors', name: 'Interiores' },
  { id: 'category-nature', name: 'Natureza' },
  { id: 'category-photography', name: 'Fotografia' },
  { id: 'category-travel', name: 'Viagem' },
] as const

const authors = [
  {
    id: 'author-ana',
    name: 'Ana Martins',
    pathImageUser: 'https://i.pravatar.cc/160?img=47',
  },
  {
    id: 'author-bruno',
    name: 'Bruno Lima',
    pathImageUser: 'https://i.pravatar.cc/160?img=12',
  },
  {
    id: 'author-clara',
    name: 'Clara Oliveira',
    pathImageUser: 'https://i.pravatar.cc/160?img=32',
  },
  {
    id: 'author-diego',
    name: 'Diego Santos',
    pathImageUser: 'https://i.pravatar.cc/160?img=53',
  },
  {
    id: 'author-elisa',
    name: 'Elisa Rocha',
    pathImageUser: 'https://i.pravatar.cc/160?img=25',
  },
  {
    id: 'author-felipe',
    name: 'Felipe Costa',
    pathImageUser: 'https://i.pravatar.cc/160?img=68',
  },
] as const

const unsplashImage = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80`

const baseImages = [
  {
    pathImage: unsplashImage('photo-1500530855697-b586d89ba3ee'),
    description: 'Cabana cercada pela tranquilidade das montanhas.',
  },
  {
    pathImage: unsplashImage('photo-1470770841072-f978cf4d019e'),
    description: 'Lago entre montanhas para uma coleção de viagens.',
  },
  {
    pathImage: unsplashImage('photo-1441974231531-c6227db76b6e'),
    description: 'Luz atravessando uma floresta verde e silenciosa.',
  },
  {
    pathImage: unsplashImage('photo-1501785888041-af3ef285b470'),
    description: 'Trilha aberta em uma paisagem montanhosa.',
  },
  {
    pathImage: unsplashImage('photo-1470252649378-9c29740c9fa8'),
    description: 'Um fim de tarde dourado visto do campo.',
  },
  {
    pathImage: unsplashImage('photo-1433086966358-54859d0ed716'),
    description: 'Cachoeira escondida em meio à vegetação.',
  },
  {
    pathImage: unsplashImage('photo-1511818966892-d7d671e672a2'),
    description: 'Fachada geométrica como referência arquitetônica.',
  },
  {
    pathImage: unsplashImage('photo-1497366811353-6870744d04b2'),
    description: 'Escritório contemporâneo com tons neutros.',
  },
  {
    pathImage: unsplashImage('photo-1524758631624-e2822e304c36'),
    description: 'Ambiente de trabalho amplo e iluminado.',
  },
  {
    pathImage: unsplashImage('photo-1487958449943-2429e8be8625'),
    description: 'Casa moderna com linhas simples e jardim frontal.',
  },
  {
    pathImage: unsplashImage('photo-1518005020951-eccb494ad742'),
    description: 'Prédio minimalista recortando um céu azul.',
  },
  {
    pathImage: unsplashImage('photo-1484101403633-562f891dc89a'),
    description: 'Sala acolhedora com plantas e iluminação natural.',
  },
  {
    pathImage: unsplashImage('photo-1494438639946-1ebd1d20bf85'),
    description: 'Mesa de trabalho organizada para criar com calma.',
  },
  {
    pathImage: unsplashImage('photo-1484154218962-a197022b5858'),
    description: 'Cozinha clara combinando madeira e mármore.',
  },
  {
    pathImage: unsplashImage('photo-1522708323590-d24dbb6b0267'),
    description: 'Apartamento compacto com decoração escandinava.',
  },
  {
    pathImage: unsplashImage('photo-1519947486511-46149fa0a254'),
    description: 'Composição abstrata em cores suaves.',
  },
  {
    pathImage: unsplashImage('photo-1523726491678-bf852e717f6a'),
    description: 'Materiais de criação espalhados sobre a mesa.',
  },
  {
    pathImage: unsplashImage('photo-1531058020387-3be344556be6'),
    description: 'Instalação artística cheia de luzes e movimento.',
  },
  {
    pathImage: unsplashImage('photo-1542744095-fcf48d80b0fd'),
    description: 'Ideias sendo organizadas durante uma reunião criativa.',
  },
  {
    pathImage: unsplashImage('photo-1529139574466-a303027c1d8b'),
    description: 'Referência de moda urbana com personalidade.',
  },
] as const

function createSeededRandom(seed: number) {
  let state = seed >>> 0

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

const random = createSeededRandom(20260717)

const selectedImages = [
  ...baseImages,
  ...Array.from(
    { length: 30 },
    () => baseImages[Math.floor(random() * baseImages.length)]!,
  ),
]

export const mockImages: ImageMock[] = selectedImages.map((image, index) => {
  const author = authors[Math.floor(random() * authors.length)]!
  const firstCategoryIndex = Math.floor(random() * categories.length)
  const secondCategoryIndex = (firstCategoryIndex + 1 + Math.floor(random() * 7)) % 8
  const imageCategories = [categories[firstCategoryIndex]!]

  if (random() > 0.45) {
    imageCategories.push(categories[secondCategoryIndex]!)
  }

  return {
    id: `10000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
    pathImage: image.pathImage,
    description: image.description,
    author: { ...author },
    categories: imageCategories.map((category) => ({ ...category })),
  }
})
