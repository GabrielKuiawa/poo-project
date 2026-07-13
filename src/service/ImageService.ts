import ForbiddenException from "../exception/ForbiddenException";
import NotFoundException from "../exception/NotFoundException";
import Category from "../models/Category";
import Image from "../models/Image";
import CategoryRepository from "../repository/CategoryRepository";
import ImageRepository from "../repository/ImageRepository";
import UserRepository from "../repository/UserRepository";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import { assertOwnerOrAdmin } from "../utils/authorization";

export class ImageService {
  private imageRepository: ImageRepository;
  private userRepository: UserRepository;
  private categoryRepository: CategoryRepository;

  constructor(
    imageRepository: ImageRepository,
    userRepository: UserRepository,
    categoryRepository: CategoryRepository,
  ) {
    this.imageRepository = imageRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  public async saveImage(
    pathImage: string,
    description: string,
    userId: string,
    categoryIds: string[],
  ): Promise<Image> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException("Usuário não encontrado");

    const categories = await this.getOwnedCategories(categoryIds, userId);

    const image = new Image();
    image.setPathImage(pathImage);
    image.setDescription(description);
    image.user = user;
    categories.forEach((category) => {
      image.addCategory(category);
    });

    return this.imageRepository.save(image);
  }

  public async getImages(): Promise<Image[]> {
    return this.imageRepository.findAllWithRelations();
  }

  public async getImageById(id: string): Promise<Image> {
    const image = await this.imageRepository.findOneWithRelations(id);

    if (!image) {
      throw new NotFoundException("Imagem não encontrada.");
    }

    return image;
  }

  public async updateImage(
    id: string,
    pathImage: string,
    description: string,
    categoryIds: string[],
    authenticatedUser: AuthenticatedUser,
  ): Promise<Image> {
    const image = await this.imageRepository.findOneWithRelations(id);

    if (!image) {
      throw new NotFoundException("Imagem não encontrada.");
    }

    const ownerId = image.getUser().getId();
    assertOwnerOrAdmin(authenticatedUser, ownerId);

    image.setPathImage(pathImage);
    image.setDescription(description);
    image.setCategories(await this.getOwnedCategories(categoryIds, ownerId));

    return this.imageRepository.save(image);
  }

  public async deleteImage(
    id: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<void> {
    const image = await this.imageRepository.findOneWithRelations(id);

    if (!image) {
      throw new NotFoundException("Imagem não encontrada.");
    }

    assertOwnerOrAdmin(authenticatedUser, image.getUser().getId());
    await this.imageRepository.delete(id);
  }

  public async getOwnedCategories(
    categoryIds: string[],
    userId: string,
  ): Promise<Category[]> {
    const categories = await this.categoryRepository.findByIds(categoryIds);

    if (categories.length !== categoryIds.length) {
      throw new NotFoundException(
        "Uma ou mais categorias não foram encontradas.",
      );
    }

    if (categories.some((category) => category.getUser().getId() !== userId)) {
      throw new ForbiddenException(
        "Você só pode utilizar suas próprias categorias.",
      );
    }

    return categories;
  }
}
