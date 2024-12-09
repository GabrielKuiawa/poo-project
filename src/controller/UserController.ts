import { AppDataSource } from '../data-source';
import { User } from '../models/User';

export default class UserController {

    private repository 
    constructor() {

    }

    public getNewUser(): User{
        return new User();
    }
    
    public async saveNewUser(user:User): Promise<void> {
        await AppDataSource.manager.save(user)
    }
}