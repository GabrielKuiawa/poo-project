import { Request, Response } from 'express';
import ImageRepository from '../repository/ImageRepository';
import Image from '../models/Image';

import HttpException from '../exception/HttpException';
import { ImageService } from '../service/ImageService';

export class ImageController {
    private imageService: ImageService;
    private imageRepository: ImageRepository;

    constructor(imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
        this.imageService = new ImageService(this.imageRepository);
    }

    public async saveImage(req: Request, res: Response): Promise<void> {
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
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Erro ao criar a imagem", error: error.message });
            }
        }
    }

    public async getImages(req: Request, res: Response): Promise<void> {
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
            res.status(500).json({ message: "Erro ao buscar imagens", error: error.message });
        }
    }

    public async getImageById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const image: Image | null = await this.imageRepository.findOne(id);

            if (!image) {
                res.status(404).json({ message: "Imagem não encontrada" });
            } else {
                res.json({
                    id: image.getId(),
                    pathImage: image.getPathImage(),
                    description: image.getDescription(),
                    categories: image.getCategories(),
                });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar imagem", error: error.message });
        }
    }

    public async updateImage(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const { pathImage, description, categoryIds } = req.body;

            const imageToUpdate: Image | null = await this.imageRepository.findOne(id);
            if (!imageToUpdate) {
                res.status(404).json({ message: "Imagem não encontrada" });
                return;
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
            res.status(500).json({ message: "Erro ao atualizar imagem", error: error.message });
        }
    }

    public async deleteImage(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const imageToDelete: Image | null = await this.imageRepository.findOne(id);

            if (!imageToDelete) {
                res.status(404).json({ message: "Imagem não encontrada" });
            } else {
                await this.imageRepository.delete(id);
                res.json({ message: "Imagem deletada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar imagem", error: error.message });
        }
    }
}
