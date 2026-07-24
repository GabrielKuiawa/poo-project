export interface ImageFile {
  buffer: Buffer;
  contentType: "image/jpeg" | "image/png" | "image/webp";
  extension: "jpg" | "png" | "webp";
}

export interface StoredObject {
  key: string;
  url: string;
}

export interface ObjectStorage {
  upload(file: ImageFile, folder: string): Promise<StoredObject>;
  delete(key: string): Promise<void>;
  deleteByUrl(url: string): Promise<boolean>;
}
