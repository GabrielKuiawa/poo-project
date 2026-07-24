import { In } from "typeorm";
import Category from "../models/Category";
import { BaseRepository } from "./BaseRepository";
import { PaginationParams } from "../types/Pagination";

export default class CategoryRepository extends BaseRepository<Category> {
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

  public async findByUserIdPaginated(
    userId: string,
    pagination: PaginationParams,
  ): Promise<[Category[], number]> {
    return this.repository.findAndCount({
      where: { user: { id: userId } } as any,
      skip: pagination.skip,
      take: pagination.limit,
      order: { id: "ASC" } as any,
    });
  }

  public async findOneWithUser(id: string): Promise<Category | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: { user: true },
    });
  }

  public async findSuggestions(
    queryValue: string,
    limit: number,
  ): Promise<Category[]> {
    const query = this.repository
      .createQueryBuilder("category")
      .orderBy("category.name", "ASC")
      .take(limit);

    if (queryValue) {
      query.where("LOWER(category.name) LIKE :term", {
        term: `%${queryValue.toLocaleLowerCase()}%`,
      });
    }

    return query.getMany();
  }
}
