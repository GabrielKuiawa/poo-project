import BadRequestException from "../../../src/exception/BadRequestException";
import { validateUploadedImage } from "../../../src/utils/imageUpload";

function createFile(buffer: Buffer): Express.Multer.File {
  return {
    fieldname: "image",
    originalname: "image",
    encoding: "7bit",
    mimetype: "application/octet-stream",
    size: buffer.length,
    destination: "",
    filename: "",
    path: "",
    buffer,
    stream: undefined as never,
  };
}

describe("validateUploadedImage", () => {
  it.each([
    {
      buffer: Buffer.from([0xff, 0xd8, 0xff, 0x00]),
      contentType: "image/jpeg",
      extension: "jpg",
    },
    {
      buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      contentType: "image/png",
      extension: "png",
    },
    {
      buffer: Buffer.from("RIFF0000WEBP", "ascii"),
      contentType: "image/webp",
      extension: "webp",
    },
  ])(
    "accepts a valid $contentType signature",
    ({ buffer, contentType, extension }) => {
      expect(validateUploadedImage(createFile(buffer))).toMatchObject({
        buffer,
        contentType,
        extension,
      });
    },
  );

  it("rejects a file whose content is not a supported image", () => {
    expect(() =>
      validateUploadedImage(createFile(Buffer.from("not-an-image"))),
    ).toThrow(BadRequestException);
  });

  it("requires the image field", () => {
    expect(() => validateUploadedImage(undefined)).toThrow(
      'Envie a imagem no campo "image" do FormData.',
    );
  });
});
