import { Repository, EntityTarget, DeepPartial } from "typeorm";
import { AppDataSource } from "../data-source";

export class RepositoryService<T> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository<T>(entity);
    }

    async findById(id: string): Promise<T | null> {
        return this.repository.findOneById(id);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async save(entityData: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(entityData);
        return this.repository.save(entity);
    }

    async update(id: string, entityData: DeepPartial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (entity) {
            this.repository.merge(entity, entityData);
            return this.repository.save(entity);
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}