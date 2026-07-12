import { In } from "typeorm";
import Category from "../models/Category";
import { RepositoryService } from "../service/RepositoryService";

export default class CategoryRepository extends RepositoryService<Category>{
    constructor() {
        super(Category);
    }

    public async findByIds(ids: string[]): Promise<Category[]> {
        if (ids.length === 0) {
            return [];
        }

        return this.repository.find({
            where: { id: In(ids) } as any,
            relations: { user: true },
        });
    }

    public async findOneWithUser(id: string): Promise<Category | null> {
        return this.repository.findOne({
            where: { id } as any,
            relations: { user: true },
        });
    }
}
