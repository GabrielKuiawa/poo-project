import { UserNotFoundException } from "../exception/UserNotFoundException";
import Category from "../models/Category";
import CategoryRepository from "../repository/CategoryRepository";
import UserRepository from "../repository/UserRepository";

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
}
