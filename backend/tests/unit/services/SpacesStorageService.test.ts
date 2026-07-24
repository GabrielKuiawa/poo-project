import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { SpacesStorageService } from "../../../src/service/SpacesStorageService";
import { ImageFile } from "../../../src/types/ObjectStorage";

describe("SpacesStorageService", () => {
  const send = jest.fn();
  const storage = new SpacesStorageService({
    send,
  } as unknown as S3Client);

  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({});
  });

  it("uploads an image with a unique public key", async () => {
    const file: ImageFile = {
      buffer: Buffer.from("image-content"),
      contentType: "image/webp",
      extension: "webp",
    };

    const result = await storage.upload(file, "images/user-id");

    expect(result.key).toMatch(/^test\/images\/user-id\/[0-9a-f-]{36}\.webp$/);
    expect(result.url).toBe(
      `https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/${result.key}`,
    );
    expect(send).toHaveBeenCalledTimes(1);

    const command = send.mock.calls[0][0];
    expect(command).toBeInstanceOf(PutObjectCommand);
    expect(command.input).toMatchObject({
      Bucket: "test-mood-board-media",
      Key: result.key,
      Body: file.buffer,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000, immutable",
      ACL: "public-read",
    });
  });

  it("deletes an object by key", async () => {
    await storage.delete("test/images/user-id/image.png");

    const command = send.mock.calls[0][0];
    expect(command).toBeInstanceOf(DeleteObjectCommand);
    expect(command.input).toEqual({
      Bucket: "test-mood-board-media",
      Key: "test/images/user-id/image.png",
    });
  });

  it("deletes an object referenced by its public URL", async () => {
    await expect(
      storage.deleteByUrl(
        "https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/test/images/user-id/image.png",
      ),
    ).resolves.toBe(true);

    const command = send.mock.calls[0][0];
    expect(command).toBeInstanceOf(DeleteObjectCommand);
    expect(command.input.Key).toBe("test/images/user-id/image.png");
  });

  it("ignores URLs that are not managed by the configured Space", async () => {
    await expect(
      storage.deleteByUrl("https://images.example.com/image.png"),
    ).resolves.toBe(false);

    expect(send).not.toHaveBeenCalled();
  });
});
