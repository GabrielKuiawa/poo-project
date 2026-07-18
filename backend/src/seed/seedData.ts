export type SeedImageData = {
  pathImage: string;
  description: string;
};

export const seedUsers = [
  {
    name: "Ana Martins",
    email: "ana.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=47",
  },
  {
    name: "Bruno Lima",
    email: "bruno.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=12",
  },
  {
    name: "Clara Oliveira",
    email: "clara.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=32",
  },
  {
    name: "Diego Santos",
    email: "diego.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=53",
  },
  {
    name: "Elisa Rocha",
    email: "elisa.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=25",
  },
  {
    name: "Felipe Costa",
    email: "felipe.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=68",
  },
  {
    name: "Giovana Alves",
    email: "giovana.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=44",
  },
  {
    name: "Henrique Melo",
    email: "henrique.seed@example.com",
    pathImageUser: "https://i.pravatar.cc/160?img=11",
  },
] as const;

export const seedCategoryNames = [
  "Animais",
  "Arquitetura",
  "Arte abstrata",
  "Arte urbana",
  "Cinema",
  "Comida",
  "Cultura",
  "Design",
  "Editorial",
  "Flores",
  "Fotografia",
  "Ilustração",
  "Interiores",
  "Moda",
  "Música",
  "Natureza",
  "Neon",
  "Paisagens",
  "Retratos",
  "Tecnologia",
  "Tipografia",
  "Tropical",
  "Urbano",
  "Viagem",
] as const;

export const seedImages: SeedImageData[] = [
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1664438942574-e56510dc5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "an abstract painting of a blue, yellow, and red color scheme",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1502691876148-a84978e59af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sb3JmdWwlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored wall in shallow focus photography",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1463438690606-f6778b8c1d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sb3JmdWwlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "photo of green leafed plants inside building",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1558470598-a5dda9640f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8dmlicmFudCUyMGNvbG9yc3xlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "assorted-color smoke",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1666874682074-0e0fdefd8f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8dmlicmFudCUyMGNvbG9yc3xlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "the sun is setting over a mountain range",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1579546929662-711aa81148cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "pink and blue color illustration",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1580566176138-daa588058b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "green purple and orange abstract painting",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1500042600524-37ecb686c775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8dmlicmFudCUyMGNvbG9yc3xlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored rainbow artwork",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1675518474491-a8264226b389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8dmlicmFudCUyMGNvbG9yc3xlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a painting of a colorful sky with clouds",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1614850715973-58c3167b30a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "purple and blue light illustration",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1716471330459-063b3baf247e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a circle of different colors on a table",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "purple and pink light illustration",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a blurry image of a multicolored background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1692079539095-ce4a5bc6c7ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a colorful parrot sitting on top of a tree branch",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1587586291914-bdbe84ec1416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "blue and pink textile in close up photography",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1541862397110-97da58638eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "an abstract painting of red, yellow, and green",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1670455444829-7344666edaa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "an abstract painting with different colors and shapes",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1587642303371-96accbf47448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "red blue and green textile",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1737834495647-f60b20534b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A multicolored flower with a black background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHZpYnJhbnQlMjBjb2xvcnN8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "orange blue and green abstract painting",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1693181640721-33d8e1e0ca92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman painting a mural on the side of a building",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1530406831759-15c5c0cbce8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "graffiti wall alley during daytime",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1489421931051-521ec235bbca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "clear glass window on concrete house",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1484136199491-6603c473c88b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "man sitting on wall with artwork and lamp",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1693181640575-f2884c4c1028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman in overalls painting a mural on a wall",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1596008565809-7d880cd81801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "orange textile on black and white textile",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1540929819775-fcc7d4649250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "wall mural",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1493210977798-4f655ac200a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "tree printed and multicolored closed doors",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1693181640711-6a64e475bef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sb3JmdWwlMjBzdHJlZXQlMjBhcnR8ZW58MHx8fHwxNzg0MzM4MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman painting a mural on the side of a building",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1613168461287-6e529b708c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "man in black and white tiger costume holding black and yellow hose",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1542772144-515ddfae17e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "high-rise buildings",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1541378194816-09022041de12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "orange and blue graffiti",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1691497456450-a1208466e47a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a man painting a fish on the side of a building",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1502229608059-f3e3aaa0137a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "photography of man seeing doddle wall art",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1586595993159-c2740d47aa5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "red and blue fruits on blue basket",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1601913463731-cfba9fd31ed3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "purple yellow and pink wall graffiti",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1692148299568-d902b88656f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a man is painting a wall with cans of paint",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1568578728608-3606b14e85fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "pink octopus wall paint",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1616532157866-dd0c68bf37e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "woman in black leather boots standing beside wall with graffiti",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1679748075210-62ef0de22488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNvbG9yZnVsJTIwc3RyZWV0JTIwYXJ0fGVufDB8fHx8MTc4NDMzODE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a number of paintings on a wall near one another",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1667482654587-e7091bb42e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a city street at night with a lot of neon lights",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "cars on road between high rise buildings during night time",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1586766193036-6d93c6c6c703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "cars parked on street in between buildings during night time",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people walking on walkway during nighttime",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1674718013659-6930c469e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of people walking down a street at night",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "lighted Chinese lantern",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored hallway",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Japanese lantern over city bike at nighttime",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1681426327290-1ec5fb4d3dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bmVvbiUyMGNpdHl8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "3d render, abstract pink blue neon background, cosmic landscape, northern polar lights, esoteric rectangular portal, virtual reality, ultraviolet spectrum, rocks",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1561344640-2453889cde5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "architectural photography of building",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1541702467897-41915a07d3a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "person in grey raincoat and orange car crossing the intersection",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a futuristic city at night with neon lights",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of people walking down a street holding umbrellas",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "timelapse photography of vehicles and buildings",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1599060052009-24d6d0b0161c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people walking on street during night time",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1514439827219-9137a0b99245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "building lights photography",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1678990345481-c3e54be9a9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a dark city at night with neon lights",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "group of people walking on the street near buildings at night time",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1619286875682-1aed54a4bade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "black motorcycle parked beside store during night time",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1541537103745-ea3429c65dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fG5lb24lMjBjaXR5fGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "group of people walking near high-rise buildings",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1663839412090-27840de8cba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a lot of sprinkles that are on the ground",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "macro shot of vegetable lot",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "assorted sliced citrus fruits on brown wooden chopping board",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "assorted fruits on brown wooden bowls",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1684952848980-ae30a28543d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a hand holding a rainbow lollipop on a stick",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "variety of sliced fruits",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a platter of crackers, strawberries, and fruit",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1569246294372-ed319c674f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "vegetable salad",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1733306600489-5f040eff7a6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sb3JmdWwlMjBmb29kfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Assortment of red, yellow, green, orange, purple vegetables and fruits. Rainbow food",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1665933062842-661781d31236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of cookies",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1484980742600-93fbca072174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "several cups of gummy candies",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1568158879083-c42860933ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "sliced vegetables on white ceramic plate",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1684952851239-a9cc9567884e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a row of ice cream cones with colorful toppings",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1719677775416-1dd6a93f1a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A couple of bowls filled with different types of food",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1665933078635-0a7cd3487bf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a bunch of bananas",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1491600395818-515d7b81de11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "assorted flavor donuts with berries on top",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1671395501275-630ae5ea02c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a large pile of tomatoes and other fruits",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1600800430120-72270592247a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "sliced fruits on black plate",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1704728006655-b9340c92839f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a white plate topped with cucumbers covered in green sauce",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1732717901614-bb1b6fa91f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNvbG9yZnVsJTIwZm9vZHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A bunch of fruits that are on a table",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1661853938282-ff0fc31defd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a yellow and black frog sitting on top of a green leaf",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1481016570479-9eab6349fde7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "blue flip-flop beside chair",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1686367336557-c01d4f591123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "a tree with red and yellow leaves and a blue sky in the background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1686367259082-6ff6d5c8f8cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a palm tree with red and green leaves",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1681426502906-445fe788eb81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "3d render, neon pink blue tropical background, colorful paper leaves, jungle frame, blank banner, space for text",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1603967903255-b288e35bbad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "green and brown leaf plant",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1739160480412-259ec009d1cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A painting of a tropical scene with birds and plants",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1720015535460-6887317dee39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A vase filled with lots of flowers on top of a table",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1720253873735-5acba3758beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8dHJvcGljYWwlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3ODQzMzgxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A painting of colorful flowers on a pink background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1668314832137-919b869f4e84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of leaves",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1501809315818-328813ffb19c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "green leaf plant",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1774149970501-0e5b3874c3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Colorful croton plant leaves with intricate patterns",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1682619520000-63b6e1f42108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "a blurry image of two palm trees against an orange background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1476860184138-af609b4e8a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "silhouette of trees during sunset",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1772090086961-d7557f3752ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A blue and yellow macaw parrot perched on a log.",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1771643168938-c98d4f5a1ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Colorful croton plant leaves with red, yellow, and green hues.",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1674939148438-bcc5bb0dfdeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a colorful flower with lots of water droplets on it",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1717692508765-eb7b4b47d96c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a pink flower with green leaves in the background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1756776486546-270217daa141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Close-up of textured banana leaves with warm colors.",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1568213184000-d2cb74def148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHRyb3BpY2FsJTIwY29sb3JmdWx8ZW58MHx8fHwxNzg0MzM4MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "green coconut palm tree",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1683817138481-dcdf64a40859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "two women in pink and green outfits posing for a picture",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1582657243548-514667f1e1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "woman in red and white sweater wearing pink knit cap",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1554882195-8cf792f9a571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "woman wearing dresses walking on catwalk",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1605289355680-75fb41239154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "group of women in blue and pink traditional dresses",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1713483623332-c82063245261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman with a colorful scarf around her head",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1718358345678-889a08b96114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "three mannequins dressed in orange and orange clothing",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1546561925-a427a021303a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "selective color photography of woman wearing blue, yellow, and pink coat and hair",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1637003833874-971d4da7eea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a display case filled with lots of different colored shoes",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1675202428635-cb50d4980bfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sb3JmdWwlMjBmYXNoaW9ufGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a close up of a multicolored furry material",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1718878404004-6502a550c23b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A pile of colorful bracelets sitting on top of a table",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1597011769896-d355e2afcbab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "woman in green hoodie holding white printer paper",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1697677103505-dd4b2dbf1b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman with curly hair is posing for a picture",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1713483684044-a4273e6a5662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman in a red shirt and sunglasses",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1697677103454-befdc13d7431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman with curly hair posing for a picture",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1595155286029-de862796d40a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman with blue and green hair posing for a picture",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1644389978798-ff24608f9f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a woman standing in front of a yellow background",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1683147819083-5af2161cb475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Beauty face makeup. Fashion portrait of girl model with lipstick under color. Closeup of glamorous girl with sexy dark red lips make-up and glowing skin under pink and purple colors. High quality",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1582142366243-0b6a4aca0d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "black and brown framed sunglasses",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1597175848600-5ef8d4d15c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "woman in green long sleeve shirt wearing brown sunglasses",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1563972651756-c5491e76c721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNvbG9yZnVsJTIwZmFzaGlvbnxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "woman sitting on her foot",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1709678337824-adc29e1b6b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a row of multicolored buildings against a blue sky",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1487083990731-52aaad54939a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "multicolored tinted glass architectural building in closeup photo",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1695050139657-bd3369a18b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "a row of multicolored buildings with vines growing up the side of them",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1521458634394-4829d38b57f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored stairs handrail",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1483792879322-696964487a67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "low-angle photography of building with red, green, and white curtain wall",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1709803056954-aff96d0faf1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a bunch of different colored steps against a blue sky",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1695050139739-f6ba353f781a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sb3JmdWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a pink building with two windows and a black door",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1518799937599-77763326c394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "five floors with assorted-color themes",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1635554720898-7d37b4643311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a row of multicolored houses on a street",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1489041763408-10ac51c35969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "low-angle photo of yellow building",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1709845508698-bf38dc0f3751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a red building with a blue sky in the background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1648917861061-5329e39b118b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a tall white building with lots of windows",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1713999212351-78f54ee46d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a row of yellow and grey buildings against a blue sky",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1746078893663-cc4a8c4e28a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A colorful and modern building against a blue sky.",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1710871398930-c2967d93196f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a multicolored building with a clock on the front of it",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1645502667943-df3f20375694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a multi - colored building with a clock on the front of it",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1553419972-4121af54db6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored abstract art",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1527067829737-402993088e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNvbG9yZnVsJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "bottom view of purple building",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1676824111081-6c4334e5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a close up of a bouquet of flowers",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "assorted petaled flowers centerpiece inside room",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1589100534833-475e31a17b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "pink and white flowers with green leaves",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1604137488398-b1d691713d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "yellow and pink flowers with green leaves",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1703689559432-20476c45ba8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "A vibrant arrangement of colorful flowers on a blue background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1604072762229-9075f8878d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "pink and white flower with green leaves",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1723120908257-205ae9b54512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A bunch of flowers that are sitting on a table",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1673048297932-ad2caa4a7a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a vase filled with lots of different colored flowers",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1692394464308-5f876cfbae69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8dmlicmFudCUyMGZsb3dlcnN8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a vase filled with lots of colorful flowers",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1608935387815-8963f8d5cf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "pink yellow and purple flowers",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1650250497866-e0161cc55248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a close up of a bunch of orange flowers",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1687269100552-bbf4f81f76b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a bunch of flowers that are in the grass",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1676317916711-3895716d8f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a close up of a bouquet of flowers on a blue background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1776968930915-301fb4d636e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Cluster of colorful flowers with blurred background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1776968930860-2927b60ea50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Vibrant cluster of pink and orange flowers blooming outdoors.",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1682986645152-cbbeceb92ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a close up of a bunch of purple and white flowers",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1661274050137-edc61fa89ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Close up of beautiful varicolored roses in store",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1777947985785-23191ab3d7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Close-up of a vibrant orange and purple daisy.",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1776968932400-4cb1115fe476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Vibrant pink and orange flowers bloom in a garden.",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1776968931895-05aec6c5d6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHZpYnJhbnQlMjBmbG93ZXJzfGVufDB8fHx8MTc4NDMzODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A field of vibrant orange and pink flowers in bloom.",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "red blue and yellow abstract painting",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1541661538396-53ba2d051eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored painting",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "abstract painting",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "blue and pink light illustration",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1673602298602-f5200720dbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sb3JmdWwlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "a very colorful abstract background with a lot of different shapes",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "macro of colorful oil and water bubbles",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a blurry image of a rainbow colored background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1557264322-b44d383a2906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "green and pink abstract art",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1655998233171-ee5b130acba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "background pattern",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "multicolored abstract painting",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1586032788085-d75f745f26e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "red blue and white abstract painting",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1674067599055-3c7efab0f4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of different colored papers on a yellow background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1532640331846-d2da5987c3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "yellow, red, green, and black abstract painting",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1706266541244-89bfdd5ad021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a painting of a colorful bird on a white background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1599753894977-bc6c162417e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNvbG9yZnVsJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "blue yellow and red abstract painting",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1661284892176-fd7713b764a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Group of friends having fun at the festival",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1468234847176-28606331216a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "group of people celebrating powder festival outdoors",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people gathering on a concert",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1496024840928-4c417adf211d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people holding pouches with colored powders",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1664304095595-e428558e8161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "happy people crowd partying under colorful powder cloud",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1585607344893-43a4bd91169a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people walking on street during daytime",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1519530782816-ba0c305fbb0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people dancing under blue sky during daytime",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1583905411970-9cdb72cdd9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "woman in white and red floral dress raising her hands",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1697729460658-6a831a518d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sb3JmdWwlMjBmZXN0aXZhbHxlbnwwfHx8fDE3ODQzMzgxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Decorated camels at the annual Pushkar Camel Fair (Pushkar Mela). Pushkar, Rajasthan, India",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1663028054729-221e69b860c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "a crowd of people in front of a building with colorful windows",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1559006321-0edcc6981d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "bue ,yellow, and pink powders in the air during daytime",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1598321677551-7d3579ed9951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "people in a market during daytime",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1682092088132-e65eb14c2ae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Indian child playing with the color in holi festival",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1550030712-320c9e746514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "smiling woman wearing multicolored dress dancing outdoor during daytime",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1647661741291-05d8818f23f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of people walking across a suspension bridge",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1661166849145-a65f91723409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of colorful balloons",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1661377220287-8891fdf1b274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Portrait of colorful woman during music festival",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1661166849990-113d1915a76f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of colorful lights",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1661166849491-7c059d449bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a large group of colorful lights",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1661166850061-9048be83137d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNvbG9yZnVsJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzg0MzM4MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a bridge with lights",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1710849581742-f2151607c745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a circle of flowers with a sky in the background",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1618588507085-c79565432917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "green grass field under pink sky",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1670760864052-9bbd7c9ba7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a group of colorful fish swimming in a pond",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1605104182087-c5666d8e4149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "green and yellow trees near mountain under white clouds during daytime",
  },
  {
    pathImage:
      "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "a mountain is shown with a lake in front of it",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1573399968917-bfc283b885b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "aerial photo of trees",
  },
  {
    pathImage:
      "https://images.unsplash.com/photo-1778252166560-3b4c66d23734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8dmlicmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3ODQzMzgxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Green leaves with sunlight filtering through",
  },
];
