export type ImageAuthor = {
  id: string;
  name: string;
  pathImageUser: string;
};

export type ImageCategory = {
  id: string;
  name: string;
};

export type Image = {
  id: string;
  title: string;
  pathImage: string;
  description: string;
  author: ImageAuthor;
  categories: ImageCategory[];
};

export type ImagePage = {
  data: Image[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    next: string | null;
    previous: string | null;
  };
};

export type CreateImageData = {
  title: string;
  description: string;
  image: File;
  categoryIds: string[];
};

export type CreateImageResponse = {
  message: string;
  data: Image;
};
