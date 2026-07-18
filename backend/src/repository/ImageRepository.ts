import Image from "../models/Image";
import { BaseRepository } from "./BaseRepository";
import { PaginationParams } from "../types/Pagination";

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

  public async findOneWithRelations(id: string): Promise<Image | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: { categories: true, user: true },
    });
  }
}
