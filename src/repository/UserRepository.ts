import { User } from "../models/User";
import { RepositoryService } from "../service/RepositoryService";

export default class UserRepository extends RepositoryService<User>{
    constructor() {
        super(User);
    }

    public async findOneByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({ email } as any); 
    }

    public async getImagesByUserId(id : string) : Promise<User> {
        return this.repository.createQueryBuilder("user") .leftJoinAndSelect('user.images', 'image')
        .where('user.id = :id', { id })
        .getOne();
    }
    
}