import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./BaseRoute";
import { ImageController } from "../controller/ImageController";
import ImageRepository from "../repository/ImageRepository";


export default class ImageRoute extends BaseRoute {
    private imageController: ImageController;

    constructor() {
        super();
        const imageRepository = new ImageRepository();
        this.imageController = new ImageController(imageRepository);
    }

    protected initRoutes(): void {
        this.router.get('/', (req: Request, res: Response, next:NextFunction) => this.imageController.getImages(req, res, next));
        this.router.post('/', (req: Request, res: Response, next:NextFunction) => this.imageController.saveImage(req, res, next));
        this.router.get('/:id', (req: Request, res: Response, next:NextFunction) => this.imageController.getImageById(req, res, next));
        this.router.put('/:id', (req: Request, res: Response, next:NextFunction) => this.imageController.updateImage(req, res, next));
        this.router.delete('/:id', (req: Request, res: Response, next:NextFunction) => this.imageController.deleteImage(req, res, next));
    }
}
