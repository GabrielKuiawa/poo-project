import Category from "../../../src/models/Category";
import Image from "../../../src/models/Image";
import { User } from "../../../src/models/User";
import CategoryRepository from "../../../src/repository/CategoryRepository";
import ImageRepository from "../../../src/repository/ImageRepository";
import UserRepository from "../../../src/repository/UserRepository";
import { SearchService } from "../../../src/service/SearchService";

const IMAGE_ID = "123e4567-e89b-42d3-a456-426614174000";
const CATEGORY_ID = "223e4567-e89b-42d3-a456-426614174000";
const USER_ID = "323e4567-e89b-42d3-a456-426614174000";

function setEntityId(entity: object, id: string): void {
  Object.defineProperty(entity, "id", { value: id });
}

describe("SearchService", () => {
  it("interleaves image, category, and user suggestions", async () => {
    const user = new User();
    setEntityId(user, USER_ID);
    user.setName("Ana");
    user.setPathImageUser("/users/ana.png");

    const image = new Image();
    setEntityId(image, IMAGE_ID);
    image.setTitle("Jardim moderno");
    image.setPathImage("/images/garden.png");
    image.user = user;

    const category = new Category();
    setEntityId(category, CATEGORY_ID);
    category.setName("Jardins");

    const imageRepository = {
      findSuggestions: jest.fn().mockResolvedValue([image]),
    };
    const categoryRepository = {
      findSuggestions: jest.fn().mockResolvedValue([category]),
    };
    const userRepository = {
      findSuggestions: jest.fn().mockResolvedValue([user]),
    };

    const service = new SearchService(
      imageRepository as unknown as ImageRepository,
      categoryRepository as unknown as CategoryRepository,
      userRepository as unknown as UserRepository,
    );

    const result = await service.getSuggestions("jar", 9);

    expect(result).toEqual([
      {
        type: "image",
        id: IMAGE_ID,
        label: "Jardim moderno",
        subtitle: "Imagem de Ana",
        imageUrl: "/images/garden.png",
      },
      {
        type: "category",
        id: CATEGORY_ID,
        label: "Jardins",
        subtitle: "Categoria",
      },
      {
        type: "user",
        id: USER_ID,
        label: "Ana",
        subtitle: "Criador",
        imageUrl: "/users/ana.png",
      },
    ]);
    expect(imageRepository.findSuggestions).toHaveBeenCalledWith("jar", 3);
  });

  it("respects the total suggestion limit", async () => {
    const images = Array.from({ length: 4 }, (_, index) => {
      const user = new User();
      setEntityId(user, `${index}23e4567-e89b-42d3-a456-426614174000`);
      user.setName(`User ${index}`);

      const image = new Image();
      setEntityId(image, `${index}23e4567-e89b-42d3-a456-426614174001`);
      image.setTitle(`Image ${index}`);
      image.setPathImage(`/images/${index}.png`);
      image.user = user;
      return image;
    });

    const service = new SearchService(
      {
        findSuggestions: jest.fn().mockResolvedValue(images),
      } as unknown as ImageRepository,
      {
        findSuggestions: jest.fn().mockResolvedValue([]),
      } as unknown as CategoryRepository,
      {
        findSuggestions: jest.fn().mockResolvedValue([]),
      } as unknown as UserRepository,
    );

    await expect(service.getSuggestions("", 2)).resolves.toHaveLength(2);
  });
});
