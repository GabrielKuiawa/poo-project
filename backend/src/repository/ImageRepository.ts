import Image from "../models/Image";
import { BaseRepository } from "./BaseRepository";

export default class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image);
  }

  public async findAllWithRelations(): Promise<Image[]> {
    return this.repository.find({
      relations: { categories: true, user: true },
    });
  }

  public async findOneWithRelations(id: string): Promise<Image | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: { categories: true, user: true },
    });
  }
}
