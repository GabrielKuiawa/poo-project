import HttpException from "../exception/HttpException";
import Image from "../models/Image";
import CategoryRepository from "../repository/CategoryRepository";
import ImageRepository from "../repository/ImageRepository";
import UserRepository from "../repository/UserRepository";

export class ImageService {
    private imageRepository: ImageRepository;
    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;

    constructor(imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = new UserRepository();
        this.categoryRepository = new CategoryRepository();  
    }

    public async saveImage(pathImage: string, description: string, userId: string, categoryIds: string[]): Promise<Image> {

        const user = await this.userRepository.findOne(userId);
        if (!user) 
            throw new HttpException(404, 'Usuário não encontrado');

        const categories = await this.categoryRepository.findByIds(categoryIds);

        if (categories.length !== categoryIds.length) 
            throw new HttpException(404, 'Uma ou mais categorias não foram encontradas');
        
        const image = new Image();
        image.setPathImage(pathImage);
        image.setDescription(description);
        image.user = user; 
        categories.forEach(category => {
            image.addCategory(category);  
        });

        return this.imageRepository.save(image);
    }
}