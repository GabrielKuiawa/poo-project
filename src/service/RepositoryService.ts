import { Repository, EntityTarget, DeepPartial } from 'typeorm';
import { AppDataSource } from '../data-source';


export class RepositoryService<T> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository<T>(entity);
    }
 
    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async save(entityData: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(entityData);
        return this.repository.save(entity);
    }

  
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
