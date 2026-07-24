import {
  ArrowDownRight,
  ArrowRight,
  Bookmark,
  Layers3,
  Search,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Brand } from "@/components/shared/Brand";
import { Button } from "@/components/ui/button";

const artwork = {
  abstractBlue: {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=88",
    alt: "Pintura abstrata com camadas de azul, vermelho e amarelo",
  },
  gallery: {
    src: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=88",
    alt: "Obra de arte contemporânea em uma galeria",
  },
  painter: {
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1000&q=88",
    alt: "Artista trabalhando em uma tela colorida",
  },
  portrait: {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=88",
    alt: "Retrato pintado com cores expressivas",
  },
  studio: {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=88",
    alt: "Pincéis, tintas e materiais espalhados em um ateliê",
  },
  museum: {
    src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=88",
    alt: "Visitante observando obras em um museu de arte",
  },
} as const;

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Descubra",
    description:
      "Passeie por referências que despertam uma ideia, uma sensação ou uma nova pergunta.",
  },
  {
    number: "02",
    icon: Bookmark,
    title: "Guarde",
    description:
      "Salve o que merece um segundo olhar sem interromper o seu fluxo criativo.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Dê forma",
    description:
      "Aproxime imagens, encontre relações e transforme referências em direção.",
  },
] as const;

export function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#f8f8f4] text-[#141414]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center px-5 sm:px-8 lg:px-12">
          <Brand
            className="text-lg sm:text-xl"
            logoClassName="size-9 sm:size-10"
          />

          <nav
            aria-label="Navegação da landing page"
            className="ml-12 hidden items-center gap-8 text-sm font-semibold lg:flex"
          >
            <a
              href="#arte"
              className="underline-offset-8 transition-colors hover:text-red-600 hover:underline"
            >
              Arte
            </a>
            <a
              href="#processo"
              className="underline-offset-8 transition-colors hover:text-red-600 hover:underline"
            >
              Como funciona
            </a>
            <a
              href="#manifesto"
              className="underline-offset-8 transition-colors hover:text-red-600 hover:underline"
            >
              Manifesto
            </a>
          </nav>

          <nav
            aria-label="Acesso à conta"
            className="ml-auto flex items-center gap-2 sm:gap-3"
          >
            <Button
              asChild
              variant="ghost"
              className="hidden bg-transparent px-5 hover:bg-black/5 sm:inline-flex"
            >
              <Link to="/login">Entrar</Link>
            </Button>
            <Button
              asChild
              className="h-11 bg-red-600 px-5 text-white shadow-none hover:bg-red-700 sm:px-6"
            >
              <Link to="/signup">
                Criar conta
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative border-b border-black/10 pt-20">
        <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1480px] lg:grid-cols-[1.04fr_0.96fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <p className="mb-6 flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] uppercase">
              <span className="h-px w-9 bg-red-600" />
              seu repertório visual
            </p>
            <h1 className="m-0 max-w-3xl font-display text-[clamp(3.7rem,7.5vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.075em] text-balance">
              Guarde o que faz você <span className="text-red-600">parar.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-600 sm:text-xl">
              Um lugar para encontrar imagens que dizem alguma coisa — antes
              mesmo de você saber explicar o quê.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 bg-[#173bc9] px-8 text-base text-white shadow-none hover:bg-[#102c9d]"
              >
                <Link to="/signup">
                  Comece seu board
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <a
                href="#arte"
                className="inline-flex h-14 items-center justify-center gap-2 px-5 text-sm font-bold underline decoration-2 underline-offset-8 transition-colors hover:text-red-600"
              >
                Ver inspirações
                <ArrowDownRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden bg-[#173bc9] p-5 sm:p-8 lg:min-h-0 lg:p-12">
            <div className="absolute top-0 right-0 h-28 w-28 bg-[#ffd236] sm:h-40 sm:w-40" />
            <div className="absolute bottom-0 left-0 h-24 w-1/3 bg-red-600" />
            <div className="relative h-full min-h-[31rem] border-[10px] border-[#141414] bg-white sm:min-h-[37rem]">
              <img
                src={`${import.meta.env.BASE_URL}art-hero.webp`}
                alt="Colagem original com pinceladas azuis, círculo vermelho e recortes de papel"
                width="1122"
                height="1402"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="arte"
        aria-labelledby="arte-title"
        className="scroll-mt-20 bg-[#111318] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-7 border-t border-white/25 pt-7 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-[#ff6a4d] uppercase">
                arte para olhar sem pressa
              </p>
              <h2
                id="arte-title"
                className="max-w-3xl font-display text-4xl leading-[0.98] font-bold tracking-[-0.055em] sm:text-6xl"
              >
                Uma imagem pode mudar o rumo de uma ideia.
              </h2>
            </div>
            <p className="max-w-xl self-end text-lg leading-8 text-white/65 lg:justify-self-end">
              Cor, gesto, textura, silêncio. Às vezes o que você procura ainda
              não tem nome — mas já tem uma imagem.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
            <figure className="group m-0 overflow-hidden rounded-tl-[5rem] bg-zinc-800">
              <img
                src={artwork.abstractBlue.src}
                alt={artwork.abstractBlue.alt}
                width="1200"
                height="1500"
                sizes="(min-width: 1024px) 57vw, 100vw"
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.02]"
                loading="lazy"
              />
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
              <figure className="group m-0 overflow-hidden bg-zinc-800">
                <img
                  src={artwork.gallery.src}
                  alt={artwork.gallery.alt}
                  width="1000"
                  height="720"
                  sizes="(min-width: 1024px) 41vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </figure>
              <figure className="group m-0 overflow-hidden rounded-br-[5rem] bg-zinc-800">
                <img
                  src={artwork.painter.src}
                  alt={artwork.painter.alt}
                  width="1000"
                  height="720"
                  sizes="(min-width: 1024px) 41vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-[0.8fr_1.2fr_0.8fr] lg:gap-5">
            <figure className="group order-1 m-0 overflow-hidden bg-zinc-800">
              <img
                src={artwork.portrait.src}
                alt={artwork.portrait.alt}
                width="900"
                height="1100"
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.02]"
                loading="lazy"
              />
            </figure>
            <figure className="group order-3 col-span-2 m-0 overflow-hidden rounded-tr-[5rem] bg-zinc-800 lg:order-2 lg:col-span-1">
              <img
                src={artwork.museum.src}
                alt={artwork.museum.alt}
                width="1200"
                height="900"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.02] lg:aspect-auto"
                loading="lazy"
              />
            </figure>
            <figure className="group order-2 m-0 overflow-hidden rounded-bl-[5rem] bg-zinc-800 lg:order-3">
              <img
                src={artwork.studio.src}
                alt={artwork.studio.alt}
                width="900"
                height="1100"
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.02]"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        id="manifesto"
        aria-label="Manifesto"
        className="relative scroll-mt-20 overflow-hidden bg-[#173bc9] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-red-600 sm:size-96" />
        <div className="absolute bottom-10 left-7 h-5 w-28 -rotate-6 bg-[#ffd236] sm:left-16 sm:w-44" />
        <blockquote className="relative mx-auto max-w-6xl">
          <p className="font-display text-[clamp(3rem,7vw,6.8rem)] leading-[0.95] font-bold tracking-[-0.06em] text-balance">
            “Antes de virar projeto, toda ideia foi uma imagem que{" "}
            <span className="text-[#ffd236]">ficou.</span>”
          </p>
        </blockquote>
      </section>

      <section
        id="processo"
        aria-labelledby="processo-title"
        className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-red-600 uppercase">
                do olhar ao board
              </p>
              <h2
                id="processo-title"
                className="font-display text-4xl leading-none font-bold tracking-[-0.055em] sm:text-6xl"
              >
                Ideias gostam de companhia.
              </h2>
            </div>
            <p className="max-w-2xl self-end text-lg leading-8 text-zinc-600">
              Quando duas referências se encontram, uma terceira coisa aparece.
              O mood board é o espaço para essas conexões acontecerem.
            </p>
          </div>

          <ol className="mt-16 grid border-y border-black/20 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.number}
                  className={`relative py-10 lg:px-9 lg:py-12 ${
                    index > 0
                      ? "border-t border-black/20 lg:border-t-0 lg:border-l"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-red-600">
                      {step.number}
                    </span>
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <h3 className="mt-14 font-display text-3xl font-bold tracking-[-0.04em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-7 text-zinc-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[#ffd236] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-5 text-xs font-extrabold tracking-[0.2em] uppercase">
              seu próximo ponto de partida
            </p>
            <h2 className="max-w-4xl font-display text-5xl leading-[0.93] font-extrabold tracking-[-0.065em] text-balance sm:text-7xl">
              O que vai ficar com você hoje?
            </h2>
          </div>
          <Button
            asChild
            size="lg"
            className="h-16 w-full bg-[#141414] px-9 text-base text-white shadow-none hover:bg-red-600 lg:w-auto"
          >
            <Link to="/signup">
              Criar meu mood board
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <footer className="mx-auto mt-20 flex max-w-[1380px] flex-col items-start justify-between gap-5 border-t border-black/25 pt-7 text-sm sm:flex-row sm:items-center">
          <Brand logoClassName="size-8" />
          <p className="text-black/65">
            Descubra. Guarde. Encontre novas relações.
          </p>
        </footer>
      </section>
    </main>
  );
}
