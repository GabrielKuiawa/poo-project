import Image from "../models/Image";
import { BaseRepository } from "./BaseRepository";
import { PaginationParams } from "../types/Pagination";
import { ImageSearchFilters } from "../types/Search";

export default class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image);
  }

  public async findAllWithRelationsPaginated(
    pagination: PaginationParams,
  ): Promise<[Image[], number]> {
    return this.repository.findAndCount({
      relations: { categories: true, user: true },
      skip: pagination.skip,
      take: pagination.limit,
      order: { id: "ASC" } as any,
    });
  }

  public async searchWithRelationsPaginated(
    pagination: PaginationParams,
    filters: ImageSearchFilters,
  ): Promise<[Image[], number]> {
    const query = this.repository
      .createQueryBuilder("image")
      .leftJoinAndSelect("image.user", "user")
      .leftJoinAndSelect("image.categories", "category")
      .distinct(true)
      .orderBy("image.id", "ASC")
      .skip(pagination.skip)
      .take(pagination.limit);

    if (filters.target) {
      const { id, type } = filters.target;

      if (type === "image") query.where("image.id = :id", { id });
      if (type === "user") query.where("user.id = :id", { id });
      if (type === "category") query.where("category.id = :id", { id });
    } else if (filters.query) {
      const term = `%${filters.query.toLocaleLowerCase()}%`;
      query.where(
        "(LOWER(image.title) LIKE :term OR LOWER(user.name) LIKE :term OR LOWER(category.name) LIKE :term)",
        { term },
      );
    }

    return query.getManyAndCount();
  }

  public async findSuggestions(
    queryValue: string,
    limit: number,
  ): Promise<Image[]> {
    const query = this.repository
      .createQueryBuilder("image")
      .leftJoinAndSelect("image.user", "user")
      .orderBy("image.title", "ASC")
      .take(limit);

    if (queryValue) {
      query.where("LOWER(image.title) LIKE :term", {
        term: `%${queryValue.toLocaleLowerCase()}%`,
      });
    }

    return query.getMany();
  }

  public async findOneWithRelations(id: string): Promise<Image | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: { categories: true, user: true },
    });
  }
}
