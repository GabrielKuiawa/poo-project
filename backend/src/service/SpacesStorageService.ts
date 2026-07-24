import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { config } from "../config";
import { ImageFile, ObjectStorage, StoredObject } from "../types/ObjectStorage";

export class SpacesStorageService implements ObjectStorage {
  private readonly client: S3Client;

  constructor(client?: S3Client) {
    this.client =
      client ??
      new S3Client({
        endpoint: config.spaces.endpoint,
        forcePathStyle: false,
        region: config.spaces.region,
        credentials: {
          accessKeyId: config.spaces.accessKeyId,
          secretAccessKey: config.spaces.secretAccessKey,
        },
      });
  }

  public async upload(file: ImageFile, folder: string): Promise<StoredObject> {
    const key = `${config.spaces.prefix}/${folder}/${randomUUID()}.${file.extension}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: config.spaces.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.contentType,
        CacheControl: "public, max-age=31536000, immutable",
        ACL: "public-read",
      }),
    );

    return {
      key,
      url: `${config.spaces.publicUrl}/${key}`,
    };
  }

  public async delete(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: config.spaces.bucket,
        Key: key,
      }),
    );
  }
}
