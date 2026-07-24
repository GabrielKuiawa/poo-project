import ForbiddenException from "../exception/ForbiddenException";
import NotFoundException from "../exception/NotFoundException";
import Category from "../models/Category";
import Image from "../models/Image";
import { User } from "../models/User";
import CategoryRepository from "../repository/CategoryRepository";
import ImageRepository from "../repository/ImageRepository";
import UserRepository from "../repository/UserRepository";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import { assertOwnerOrAdmin } from "../utils/authorization";
import {
  createPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../types/Pagination";
import { ImageSearchFilters } from "../types/Search";
import { ImageFile, ObjectStorage } from "../types/ObjectStorage";
import { logger } from "../utils/Logger";

const IMAGE_FOLDER = "images";

export class ImageService {
  private imageRepository: ImageRepository;
  private userRepository: UserRepository;
  private categoryRepository: CategoryRepository;
  private objectStorage?: ObjectStorage;

  constructor(
    imageRepository: ImageRepository,
    userRepository: UserRepository,
    categoryRepository: CategoryRepository,
    objectStorage?: ObjectStorage,
  ) {
    this.imageRepository = imageRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
    this.objectStorage = objectStorage;
  }

  public async saveImage(
    title: string,
    pathImage: string,
    description: string,
    userId: string,
    categoryIds: string[],
  ): Promise<Image> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException("Usuário não encontrado");

    const categories = await this.getOwnedCategories(categoryIds, userId);
    return this.persistImage(title, pathImage, description, user, categories);
  }

  public async createImageWithUpload(
    title: string,
    description: string,
    userId: string,
    categoryIds: string[],
    file: ImageFile,
  ): Promise<Image> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException("Usuário não encontrado");

    const categories = await this.getOwnedCategories(categoryIds, userId);
    if (!this.objectStorage) {
      throw new Error("O serviço de armazenamento não foi configurado.");
    }

    const storedObject = await this.objectStorage.upload(
      file,
      `${IMAGE_FOLDER}/${userId}`,
    );

    try {
      return await this.persistImage(
        title,
        storedObject.url,
        description,
        user,
        categories,
      );
    } catch (error) {
      try {
        await this.objectStorage.delete(storedObject.key);
      } catch (cleanupError) {
        logger.error("Failed to remove image after database error", {
          objectKey: storedObject.key,
          errorMessage:
            cleanupError instanceof Error
              ? cleanupError.message
              : String(cleanupError),
        });
      }

      throw error;
    }
  }

  public async getImages(
    pagination: PaginationParams,
    filters: ImageSearchFilters = {},
  ): Promise<PaginatedResult<Image>> {
    const [images, total] =
      filters.query || filters.target
        ? await this.imageRepository.searchWithRelationsPaginated(
            pagination,
            filters,
          )
        : await this.imageRepository.findAllWithRelationsPaginated(pagination);

    return createPaginatedResult(images, total, pagination);
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
    title: string,
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

    image.setTitle(title);
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

  private async persistImage(
    title: string,
    pathImage: string,
    description: string,
    user: User,
    categories: Category[],
  ): Promise<Image> {
    const image = new Image();
    image.setTitle(title);
    image.setPathImage(pathImage);
    image.setDescription(description);
    image.user = user;
    categories.forEach((category) => {
      image.addCategory(category);
    });

    return this.imageRepository.save(image);
  }
}
