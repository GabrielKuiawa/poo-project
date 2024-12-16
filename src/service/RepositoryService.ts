import { Repository, EntityTarget, DeepPartial } from 'typeorm';
import { AppDataSource } from '../data-source';

export class RepositoryService<T>  {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository<T>(entity);
    }

    public async findOne(id: string): Promise<T | null> {
        return this.repository.findOneBy({ id } as any); 
    }

    public async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    public async save(entityData: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(entityData);
        return this.repository.save(entity);
    }

    public async update(id: string, data: DeepPartial<T>): Promise<T | null> {
        const entity = await this.findOne(id);
        if (!entity) return null;

        const updatedEntity = this.repository.merge(entity, data);
        return this.repository.save(updatedEntity);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}