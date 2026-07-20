import { useQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getImage } from "../api/getImage";

const route = getRouteApi("/authenticated/images/$imageId");

export function ImageDetailsPage() {
  const { imageId } = route.useParams();
  const { data: image, error, isPending } = useQuery({
    queryKey: ["image", imageId],
    queryFn: ({ signal }) => getImage(imageId, signal),
  });

  if (isPending) {
    return <p className="p-6">Carregando imagem...</p>;
  }

  if (error) {
    return <p className="p-6">{error.message}</p>;
  }

  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-8">
      <Link
        to="/"
        className="mb-5 inline-flex items-center gap-2 font-semibold"
      >
        <ArrowLeft size={20} />
        Voltar
      </Link>

      <article className="grid overflow-hidden rounded-3xl bg-card shadow-sm md:grid-cols-2">
        <img
          src={image.pathImage}
          alt={image.description}
          className="h-full max-h-[80vh] w-full object-cover"
        />

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <h1 className="m-0 text-3xl font-bold">{image.title}</h1>
            <p className="mt-3 text-muted-foreground">{image.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={image.author.pathImageUser}
              alt=""
              className="size-11 rounded-full object-cover"
            />
            <span className="font-semibold">{image.author.name}</span>
          </div>

          {image.categories.length > 0 && (
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {image.categories.map((category) => (
                <li
                  key={category.id}
                  className="rounded-full bg-secondary px-3 py-1 text-sm"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </main>
  );
}
