import { NextFunction, Request, Response } from 'express';
import ImageRepository from '../repository/ImageRepository';
import Image from '../models/Image';
import { ImageService } from '../service/ImageService';
import NotFoundException from '../exception/NotFoundException';

export class ImageController {
    private imageService: ImageService;
    private imageRepository: ImageRepository;

    constructor(imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
        this.imageService = new ImageService(this.imageRepository);
    }

    public async saveImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { pathImage, description, userId, categoryIds } = req.body;
            const savedImage = await this.imageService.saveImage(pathImage, description, userId, categoryIds);
    
            res.status(201).json({
                message: "Imagem criada com sucesso",
                data: {
                    id: savedImage.getId(),
                    pathImage: savedImage.getPathImage(),
                    description: savedImage.getDescription(),
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async getImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const images: Image[] = await this.imageRepository.findAll();

            const imageData = images.map((image: Image) => ({
                id: image.getId(),
                pathImage: image.getPathImage(),
                description: image.getDescription(),
                categories: image.getCategories(),
            }));

            res.json(imageData);
        } catch (error) {
            next(error);
        }
    }

    public async getImageById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const image: Image | null = await this.imageRepository.findOne(id);

            if (!image) {
                throw new NotFoundException("Imagem não encontrada");
            } else {
                res.json({
                    id: image.getId(),
                    pathImage: image.getPathImage(),
                    description: image.getDescription(),
                    categories: image.getCategories(),
                });
            }
        } catch (error) {
            next(error);
        }
    }

    public async updateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const { pathImage, description, categoryIds } = req.body;

            const imageToUpdate: Image | null = await this.imageRepository.findOne(id);
            if (!imageToUpdate) {
                throw new NotFoundException("Imagem não encontrada");
            }

            imageToUpdate.setPathImage(pathImage);
            imageToUpdate.setDescription(description);

            const updatedImage: Image = await this.imageRepository.save(imageToUpdate);

            res.json({
                message: "Imagem atualizada",
                data: {
                    id: updatedImage.getId(),
                    pathImage: updatedImage.getPathImage(),
                    description: updatedImage.getDescription(),
                    categories: updatedImage.getCategories(),
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const imageToDelete: Image | null = await this.imageRepository.findOne(id);

            if (!imageToDelete) {
                throw new NotFoundException("Imagem não encontrada");
            } else {
                await this.imageRepository.delete(id);
                res.json({ message: "Imagem deletada" });
            }
        } catch (error) {
            next(error);
        }
    }
}
