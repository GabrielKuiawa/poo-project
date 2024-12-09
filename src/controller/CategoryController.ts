import Category from "../models/Category";
import CategoryRepository from '../repository/CategoryRepository';

export default class CategoryController {

    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public getNewCategory(): Category {
        return new Category();
    }
    
    public saveNewCategory(category:Category): void {
        this.categoryRepository.save(category)
    }
}