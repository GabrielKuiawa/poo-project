export type Image = {
  id: string;
  title: string;
  pathImage: string;
  description: string;
  author: {
    id: string;
    name: string;
    pathImageUser: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
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
