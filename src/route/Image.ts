import { Request, Response } from "express";
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
        this.router.get('/', (req: Request, res: Response) => this.imageController.getImages(req, res));
        this.router.post('/', (req: Request, res: Response) => this.imageController.saveImage(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.imageController.getImageById(req, res));
        this.router.put('/:id', (req: Request, res: Response) => this.imageController.updateImage(req, res));
        this.router.delete('/:id', (req: Request, res: Response) => this.imageController.deleteImage(req, res));
    }
}
