import { User } from "../models/User";
import { BaseRepository } from "./BaseRepository";

export default class UserRepository extends BaseRepository<User>{
    constructor() {
        super(User);
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email } as any); 
    }

    public async getImagesByUserId(id : string) : Promise<User | null> {
        return this.repository.createQueryBuilder("user") .leftJoinAndSelect('user.images', 'image')
        .where('user.id = :id', { id })
        .getOne();
    }
    
}
