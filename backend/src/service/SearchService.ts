import CategoryRepository from "../repository/CategoryRepository";
import ImageRepository from "../repository/ImageRepository";
import UserRepository from "../repository/UserRepository";
import { SearchSuggestion } from "../types/Search";

export class SearchService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getSuggestions(
    query: string,
    limit: number,
  ): Promise<SearchSuggestion[]> {
    const perTypeLimit = Math.ceil(limit / 3);
    const [images, categories, users] = await Promise.all([
      this.imageRepository.findSuggestions(query, perTypeLimit),
      this.categoryRepository.findSuggestions(query, perTypeLimit),
      this.userRepository.findSuggestions(query, perTypeLimit),
    ]);

    const suggestions: SearchSuggestion[] = [];
    const collectionLength = Math.max(
      images.length,
      categories.length,
      users.length,
    );

    for (let index = 0; index < collectionLength; index += 1) {
      const image = images[index];
      if (image) {
        suggestions.push({
          type: "image",
          id: image.getId(),
          label: image.getTitle(),
          subtitle: `Imagem de ${image.getUser().getName()}`,
          imageUrl: image.getPathImage(),
        });
      }

      const category = categories[index];
      if (category) {
        suggestions.push({
          type: "category",
          id: category.getId(),
          label: category.getName(),
          subtitle: "Categoria",
        });
      }

      const user = users[index];
      if (user) {
        suggestions.push({
          type: "user",
          id: user.getId(),
          label: user.getName(),
          subtitle: "Criador",
          imageUrl: user.getPathImageUser(),
        });
      }
    }

    return suggestions.slice(0, limit);
  }
}
