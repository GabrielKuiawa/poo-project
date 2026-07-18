export type Image = {
  id: string;
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