import { useQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageFeedback } from "@/components/shared/PageFeedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageAuthor } from "../components/ImageAuthor";
import { ImageCategories } from "../components/ImageCategories";
import { imageService } from "../services/imageService";

const route = getRouteApi("/authenticated/images/$imageId");

export function ImageDetailsPage() {
  const { imageId } = route.useParams();
  const {
    data: image,
    error,
    isPending,
  } = useQuery({
    queryKey: ["image", imageId],
    queryFn: ({ signal }) => imageService.getById(imageId, signal),
  });

  if (isPending) {
    return <PageFeedback>Carregando imagem...</PageFeedback>;
  }

  if (error) {
    return <PageFeedback variant="error">{error.message}</PageFeedback>;
  }

  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-8">
      <Button asChild variant="ghost" className="mb-5 -ml-4">
        <Link to="/">
          <ArrowLeft aria-hidden="true" />
          Voltar
        </Link>
      </Button>

      <Card role="article" className="grid md:grid-cols-2">
        <img
          src={image.pathImage}
          alt={image.description}
          className="h-full max-h-[80vh] w-full object-cover"
        />

        <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <h1 className="m-0 text-3xl font-bold">{image.title}</h1>
            <p className="mt-3 text-muted-foreground">{image.description}</p>
          </div>

          <ImageAuthor author={image.author} />
          <ImageCategories categories={image.categories} />
        </CardContent>
      </Card>
    </main>
  );
}
