import { NextFunction, Request, Response } from 'express';
import ImageRepository from '../repository/ImageRepository';
import Image from '../models/Image';
import { ImageService } from '../service/ImageService';
import NotFoundException from '../exception/NotFoundException';
import { assertOwnerOrAdmin, getAuthenticatedUserId } from '../utils/authorization';
import { validateId, validateIdArray, validateTextField } from '../utils/validation';

export class ImageController {
    private readonly imageService: ImageService;

    constructor(private readonly imageRepository: ImageRepository) {
        this.imageService = new ImageService(imageRepository);
    }

    public async saveImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pathImage = validateTextField(req.body.pathImage, 'Caminho da imagem', 255);
            const description = validateTextField(req.body.description, 'Descrição', 500);
            const categoryIds = validateIdArray(req.body.categoryIds, 'categoryIds');
            const image = await this.imageService.saveImage(
                pathImage,
                description,
                getAuthenticatedUserId(req),
                categoryIds,
            );

            res.status(201).json({ message: 'Imagem criada com sucesso', data: this.serializeImage(image) });
        } catch (error) {
            next(error);
        }
    }

    public async getImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const images = await this.imageRepository.findAllWithRelations();
            res.json(images.map((image) => this.serializeImage(image)));
        } catch (error) {
            next(error);
        }
    }

    public async getImageById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const image = await this.imageRepository.findOneWithRelations(validateId(req.params.id));
            if (!image) throw new NotFoundException('Imagem não encontrada.');
            res.json(this.serializeImage(image));
        } catch (error) {
            next(error);
        }
    }

    public async updateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            const image = await this.imageRepository.findOneWithRelations(id);
            if (!image) throw new NotFoundException('Imagem não encontrada.');

            assertOwnerOrAdmin(req, image.getUser().getId());
            image.setPathImage(validateTextField(req.body.pathImage, 'Caminho da imagem', 255));
            image.setDescription(validateTextField(req.body.description, 'Descrição', 500));
            image.setCategories(await this.imageService.getOwnedCategories(
                validateIdArray(req.body.categoryIds, 'categoryIds'),
                image.getUser().getId(),
            ));

            const updated = await this.imageRepository.save(image);
            res.json({ message: 'Imagem atualizada', data: this.serializeImage(updated) });
        } catch (error) {
            next(error);
        }
    }

    public async deleteImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = validateId(req.params.id);
            const image = await this.imageRepository.findOneWithRelations(id);
            if (!image) throw new NotFoundException('Imagem não encontrada.');

            assertOwnerOrAdmin(req, image.getUser().getId());
            await this.imageRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    private serializeImage(image: Image) {
        return {
            id: image.getId(),
            pathImage: image.getPathImage(),
            description: image.getDescription(),
            categories: image.getCategories().map((category) => ({
                id: category.getId(),
                name: category.getName(),
            })),
        };
    }
}
