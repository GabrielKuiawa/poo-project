import { User } from "../models/User";
import { RepositoryService } from "../service/RepositoryService";

export default class UserRepository extends RepositoryService<User>{
    constructor() {
        super(User);
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email } as any); 
    }
    
}