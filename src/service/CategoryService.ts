import { UserNotFoundException } from "../exception/UserNotFoundException";
import Category from "../models/Category";
import CategoryRepository from "../repository/CategoryRepository";
import UserRepository from "../repository/UserRepository";

export class CategoryService {
    private categoryRepository: CategoryRepository;
    private userRepository: UserRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = new UserRepository();
    }


    public async saveCategory(name: string, userId: string): Promise<Category> {
        const user = await this.userRepository.findOne(userId);
        if (!user) 
            throw new UserNotFoundException("Você precisa inserir um usuário válido.");
        const newCategory = new Category();
        newCategory.setName(name);
        newCategory.setUser(user);
        return this.categoryRepository.save(newCategory);
    }

    
    
}
