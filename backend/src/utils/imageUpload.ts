import BadRequestException from "../exception/BadRequestException";
import { ImageFile } from "../types/ObjectStorage";

const JPEG_SIGNATURE = Buffer.from([0xff, 0xd8, 0xff]);
const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

export function validateUploadedImage(
  file: Express.Multer.File | undefined,
): ImageFile {
  if (!file) {
    throw new BadRequestException(
      'Envie a imagem no campo "image" do FormData.',
    );
  }

  if (file.buffer.subarray(0, JPEG_SIGNATURE.length).equals(JPEG_SIGNATURE)) {
    return {
      buffer: file.buffer,
      contentType: "image/jpeg",
      extension: "jpg",
    };
  }

  if (file.buffer.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
    return {
      buffer: file.buffer,
      contentType: "image/png",
      extension: "png",
    };
  }

  const isWebp =
    file.buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    file.buffer.subarray(8, 12).toString("ascii") === "WEBP";

  if (isWebp) {
    return {
      buffer: file.buffer,
      contentType: "image/webp",
      extension: "webp",
    };
  }

  throw new BadRequestException(
    "O arquivo precisa ser uma imagem JPEG, PNG ou WebP válida.",
  );
}
