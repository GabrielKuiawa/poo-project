import { NextFunction, Request, Response } from "express";
import multer = require("multer");
import BadRequestException from "../exception/BadRequestException";
import PayloadTooLargeException from "../exception/PayloadTooLargeException";

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const imageParser = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE_BYTES,
    files: 1,
    fields: 102,
    fieldSize: 10 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        new BadRequestException(
          "O arquivo precisa ser uma imagem JPEG, PNG ou WebP.",
        ),
      );
      return;
    }

    callback(null, true);
  },
}).single("image");

export function parseImageUpload(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  imageParser(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        next(new PayloadTooLargeException("A imagem não pode exceder 10 MB."));
        return;
      }

      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        next(
          new BadRequestException(
            'Envie somente uma imagem no campo "image" do FormData.',
          ),
        );
        return;
      }

      next(new BadRequestException("FormData da imagem inválido."));
      return;
    }

    next(error);
  });
}
