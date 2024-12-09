import Category from "../models/Category";
import { RepositoryService } from "../service/RepositoryService";

export default class CategoryRepository extends RepositoryService<Category>{
    constructor() {
        super(Category);
    }
}
