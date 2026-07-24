import { User } from "../models/User";
import { BaseRepository } from "./BaseRepository";
import Image from "../models/Image";
import { PaginationParams } from "../types/Pagination";

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email } as any);
  }

  public async findImagesByUserIdPaginated(
    id: string,
    pagination: PaginationParams,
  ): Promise<[Image[], number]> {
    return this.repository.manager.getRepository(Image).findAndCount({
      where: { user: { id } } as any,
      skip: pagination.skip,
      take: pagination.limit,
      order: { id: "ASC" } as any,
    });
  }

  public async findSuggestions(
    queryValue: string,
    limit: number,
  ): Promise<User[]> {
    const query = this.repository
      .createQueryBuilder("user")
      .orderBy("user.name", "ASC")
      .take(limit);

    if (queryValue) {
      query.where("LOWER(user.name) LIKE :term", {
        term: `%${queryValue.toLocaleLowerCase()}%`,
      });
    }

    return query.getMany();
  }
}
