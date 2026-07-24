import { NextFunction, Request, Response } from "express";
import Image from "../models/Image";
import { ImageService } from "../service/ImageService";
import {
  getAuthenticatedUser,
  getAuthenticatedUserId,
} from "../utils/authorization";
import {
  validateId,
  validateIdArray,
  validatePagination,
  validateTextField,
} from "../utils/validation";
import { serializePaginationMeta } from "../utils/pagination";
import { validateImageSearchFilters } from "../utils/search";
import { validateUploadedImage } from "../utils/imageUpload";

export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  public async saveImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const title = validateTextField(req.body.title, "Título", 150);
      const description = validateTextField(
        req.body.description,
        "Descrição",
        500,
      );
      const categoryIdsValue =
        req.body.categoryIds === undefined
          ? []
          : Array.isArray(req.body.categoryIds)
            ? req.body.categoryIds
            : [req.body.categoryIds];
      const categoryIds = validateIdArray(categoryIdsValue, "categoryIds");
      const image = await this.imageService.createImageWithUpload(
        title,
        description,
        getAuthenticatedUserId(req),
        categoryIds,
        validateUploadedImage(req.file),
      );

      res.status(201).json({
        message: "Imagem criada com sucesso",
        data: this.serializeImage(image),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getImages(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.imageService.getImages(
        validatePagination(req.query.page, req.query.limit),
        validateImageSearchFilters(req.query.q, req.query.type, req.query.id),
      );
      res.json({
        data: result.data.map((image) => this.serializeImage(image)),
        meta: serializePaginationMeta(req, result.meta),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getImageById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);
      const image = await this.imageService.getImageById(id);

      res.json(this.serializeImage(image));
    } catch (error) {
      next(error);
    }
  }

  public async updateImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);
      const title = validateTextField(req.body.title, "Título", 150);
      const pathImage = validateTextField(
        req.body.pathImage,
        "Caminho da imagem",
        255,
      );
      const description = validateTextField(
        req.body.description,
        "Descrição",
        500,
      );
      const categoryIds = validateIdArray(req.body.categoryIds, "categoryIds");

      const image = await this.imageService.updateImage(
        id,
        title,
        pathImage,
        description,
        categoryIds,
        getAuthenticatedUser(req),
      );

      res.json({
        message: "Imagem atualizada",
        data: this.serializeImage(image),
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);

      await this.imageService.deleteImage(id, getAuthenticatedUser(req));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private serializeImage(image: Image) {
    return {
      id: image.getId(),
      title: image.getTitle(),
      pathImage: image.getPathImage(),
      description: image.getDescription(),
      author: {
        id: image.getUser().getId(),
        name: image.getUser().getName(),
        pathImageUser: image.getUser().getPathImageUser(),
      },
      categories: image.getCategories().map((category) => ({
        id: category.getId(),
        name: category.getName(),
      })),
    };
  }
}
