import { AppDataSource } from '../data-source';
import Image from '../models/Image';

export default class ImageController {


    public getNewImage(): Image {
        return new Image();
    }
    
    public async saveNewUser(image:Image): Promise<void> {
        await AppDataSource.manager.save(image)
    }
}