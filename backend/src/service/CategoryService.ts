import NotFoundException from "../exception/NotFoundException";
import { UserNotFoundException } from "../exception/UserNotFoundException";
import Category from "../models/Category";
import CategoryRepository from "../repository/CategoryRepository";
import UserRepository from "../repository/UserRepository";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import { assertOwnerOrAdmin } from "../utils/authorization";
import {
  createPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../types/Pagination";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  private userRepository: UserRepository;

  constructor(
    categoryRepository: CategoryRepository,
    userRepository: UserRepository,
  ) {
    this.categoryRepository = categoryRepository;
    this.userRepository = userRepository;
  }

  public async saveCategory(name: string, userId: string): Promise<Category> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new UserNotFoundException();

    const newCategory = new Category();
    newCategory.setName(name);
    newCategory.setUser(user);

    return this.categoryRepository.save(newCategory);
  }

  public async getCategories(
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Category>> {
    const [categories, total] =
      await this.categoryRepository.findPaginated(pagination);

    return createPaginatedResult(categories, total, pagination);
  }

  public async getCategoriesByUserId(
    userId: string,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Category>> {
    const [categories, total] =
      await this.categoryRepository.findByUserIdPaginated(userId, pagination);

    return createPaginatedResult(categories, total, pagination);
  }

  public async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException("Categoria não encontrada.");
    }

    return category;
  }

  public async updateCategory(
    id: string,
    name: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneWithUser(id);
    if (!category) throw new NotFoundException("Categoria não encontrada.");

    assertOwnerOrAdmin(authenticatedUser, category.getUser().getId());

    category.setName(name);
    return this.categoryRepository.save(category);
  }

  public async deleteCategory(
    id: string,
    authenticatedUser: AuthenticatedUser,
  ): Promise<void> {
    const category = await this.categoryRepository.findOneWithUser(id);
    if (!category) throw new NotFoundException("Categoria não encontrada.");

    assertOwnerOrAdmin(authenticatedUser, category.getUser().getId());

    await this.categoryRepository.delete(id);
  }
}
