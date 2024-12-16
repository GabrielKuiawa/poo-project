import { In } from "typeorm";
import Category from "../models/Category";
import { RepositoryService } from "../service/RepositoryService";

export default class CategoryRepository extends RepositoryService<Category>{
    constructor() {
        super(Category);
    }

    public async findByIds(ids: string[]): Promise<Category[]> {
        const categories: Category[] = [];
    
        for (const id of ids) {
            const category = await this.findOne(id);
    
            if (category) {
                categories.push(category);
            }
        }
    
        return categories;
    }
}
