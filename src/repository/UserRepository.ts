import { User } from "../models/User";
import { RepositoryService } from "../service/RepositoryService";

export default class UserRepository extends RepositoryService<User>{
    constructor() {
        super(User);
    }
    
}