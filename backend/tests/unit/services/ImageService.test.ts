import ForbiddenException from "../../../src/exception/ForbiddenException";
import NotFoundException from "../../../src/exception/NotFoundException";
import { UserRole } from "../../../src/enum/UserRole";
import Category from "../../../src/models/Category";
import Image from "../../../src/models/Image";
import { User } from "../../../src/models/User";
import CategoryRepository from "../../../src/repository/CategoryRepository";
import ImageRepository from "../../../src/repository/ImageRepository";
import UserRepository from "../../../src/repository/UserRepository";
import { ImageService } from "../../../src/service/ImageService";
import { AuthenticatedUser } from "../../../src/types/AuthenticatedUser";

type ImageRepositoryMock = jest.Mocked<
  Pick<
    ImageRepository,
    | "findAllWithRelationsPaginated"
    | "searchWithRelationsPaginated"
    | "findOneWithRelations"
    | "save"
    | "delete"
  >
>;

type UserRepositoryMock = jest.Mocked<Pick<UserRepository, "findOne">>;

type CategoryRepositoryMock = jest.Mocked<
  Pick<CategoryRepository, "findByIds">
>;

const IMAGE_ID = "123e4567-e89b-42d3-a456-426614174000";
const OWNER_ID = "223e4567-e89b-42d3-a456-426614174000";
const OTHER_USER_ID = "323e4567-e89b-42d3-a456-426614174000";
const CATEGORY_ID = "423e4567-e89b-42d3-a456-426614174000";
const SECOND_CATEGORY_ID = "523e4567-e89b-42d3-a456-426614174000";
const PAGINATION = { page: 1, limit: 20, skip: 0 };

function setEntityId(entity: object, id: string): void {
  Object.defineProperty(entity, "id", { value: id });
}

function createUser(id: string): User {
  const user = new User();
  setEntityId(user, id);
  return user;
}

function createCategory(id: string, name: string, user: User): Category {
  const category = new Category();
  setEntityId(category, id);
  category.setName(name);
  category.setUser(user);
  return category;
}

function createImage(user: User, categories: Category[] = []): Image {
  const image = new Image();
  setEntityId(image, IMAGE_ID);
  image.setTitle("Old title");
  image.setPathImage("/images/old.png");
  image.setDescription("Old description");
  image.user = user;
  image.setCategories(categories);
  return image;
}

describe("ImageService", () => {
  let imageRepository: ImageRepositoryMock;
  let userRepository: UserRepositoryMock;
  let categoryRepository: CategoryRepositoryMock;
  let imageService: ImageService;

  const owner: AuthenticatedUser = {
    userId: OWNER_ID,
    role: UserRole.USER,
  };

  const admin: AuthenticatedUser = {
    userId: OTHER_USER_ID,
    role: UserRole.ADMIN,
  };

  const otherUser: AuthenticatedUser = {
    userId: OTHER_USER_ID,
    role: UserRole.USER,
  };

  beforeEach(() => {
    imageRepository = {
      findAllWithRelationsPaginated: jest.fn(),
      searchWithRelationsPaginated: jest.fn(),
      findOneWithRelations: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    userRepository = {
      findOne: jest.fn(),
    };

    categoryRepository = {
      findByIds: jest.fn(),
    };

    imageService = new ImageService(
      imageRepository as unknown as ImageRepository,
      userRepository as unknown as UserRepository,
      categoryRepository as unknown as CategoryRepository,
    );
  });

  describe("saveImage", () => {
    it("should create and save an image for an existing user", async () => {
      const user = createUser(OWNER_ID);
      const category = createCategory(CATEGORY_ID, "Technology", user);
      userRepository.findOne.mockResolvedValue(user);
      categoryRepository.findByIds.mockResolvedValue([category]);
      imageRepository.save.mockImplementation(async (image) => image as Image);

      const result = await imageService.saveImage(
        "New image",
        "/images/new.png",
        "New description",
        OWNER_ID,
        [CATEGORY_ID],
      );

      expect(userRepository.findOne).toHaveBeenCalledWith(OWNER_ID);
      expect(categoryRepository.findByIds).toHaveBeenCalledWith([CATEGORY_ID]);
      expect(imageRepository.save).toHaveBeenCalledTimes(1);
      expect(result.getTitle()).toBe("New image");
      expect(result.getPathImage()).toBe("/images/new.png");
      expect(result.getDescription()).toBe("New description");
      expect(result.getUser()).toBe(user);
      expect(result.getCategories()).toEqual([category]);
    });

    it("should throw when the user does not exist", async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        imageService.saveImage(
          "New image",
          "/images/new.png",
          "New description",
          OWNER_ID,
          [CATEGORY_ID],
        ),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(categoryRepository.findByIds).not.toHaveBeenCalled();
      expect(imageRepository.save).not.toHaveBeenCalled();
    });

    it("should save an image without categories", async () => {
      const user = createUser(OWNER_ID);
      userRepository.findOne.mockResolvedValue(user);
      categoryRepository.findByIds.mockResolvedValue([]);
      imageRepository.save.mockImplementation(async (image) => image as Image);

      const result = await imageService.saveImage(
        "New image",
        "/images/new.png",
        "New description",
        OWNER_ID,
        [],
      );

      expect(result.getCategories()).toEqual([]);
      expect(imageRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("getImages", () => {
    it("should return all images with their relations", async () => {
      const images = [createImage(createUser(OWNER_ID))];
      imageRepository.findAllWithRelationsPaginated.mockResolvedValue([
        images,
        1,
      ]);

      const result = await imageService.getImages(PAGINATION);

      expect(result.data).toBe(images);
      expect(result.meta).toMatchObject({ total: 1, totalPages: 1 });
      expect(
        imageRepository.findAllWithRelationsPaginated,
      ).toHaveBeenCalledWith(PAGINATION);
    });

    it("should search images by title, category, or user", async () => {
      const images = [createImage(createUser(OWNER_ID))];
      const filters = { query: "architecture" };
      imageRepository.searchWithRelationsPaginated.mockResolvedValue([
        images,
        1,
      ]);

      const result = await imageService.getImages(PAGINATION, filters);

      expect(result.data).toBe(images);
      expect(imageRepository.searchWithRelationsPaginated).toHaveBeenCalledWith(
        PAGINATION,
        filters,
      );
      expect(
        imageRepository.findAllWithRelationsPaginated,
      ).not.toHaveBeenCalled();
    });
  });

  describe("getImageById", () => {
    it("should return an existing image by id", async () => {
      const image = createImage(createUser(OWNER_ID));
      imageRepository.findOneWithRelations.mockResolvedValue(image);

      const result = await imageService.getImageById(IMAGE_ID);

      expect(result).toBe(image);
      expect(imageRepository.findOneWithRelations).toHaveBeenCalledWith(
        IMAGE_ID,
      );
    });

    it("should throw when the image does not exist", async () => {
      imageRepository.findOneWithRelations.mockResolvedValue(null);

      await expect(imageService.getImageById(IMAGE_ID)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe("updateImage", () => {
    it("should allow the owner to update the image", async () => {
      const user = createUser(OWNER_ID);
      const category = createCategory(CATEGORY_ID, "Technology", user);
      const image = createImage(user);
      imageRepository.findOneWithRelations.mockResolvedValue(image);
      categoryRepository.findByIds.mockResolvedValue([category]);
      imageRepository.save.mockImplementation(
        async (imageToSave) => imageToSave as Image,
      );

      const result = await imageService.updateImage(
        IMAGE_ID,
        "Updated image",
        "/images/updated.png",
        "Updated description",
        [CATEGORY_ID],
        owner,
      );

      expect(result.getTitle()).toBe("Updated image");
      expect(result.getPathImage()).toBe("/images/updated.png");
      expect(result.getDescription()).toBe("Updated description");
      expect(result.getCategories()).toEqual([category]);
      expect(imageRepository.save).toHaveBeenCalledWith(image);
    });

    it("should allow an administrator to update the image", async () => {
      const user = createUser(OWNER_ID);
      const image = createImage(user);
      imageRepository.findOneWithRelations.mockResolvedValue(image);
      categoryRepository.findByIds.mockResolvedValue([]);
      imageRepository.save.mockImplementation(
        async (imageToSave) => imageToSave as Image,
      );

      const result = await imageService.updateImage(
        IMAGE_ID,
        "Admin image",
        "/images/admin-update.png",
        "Admin update",
        [],
        admin,
      );

      expect(result.getDescription()).toBe("Admin update");
      expect(imageRepository.save).toHaveBeenCalledWith(image);
    });

    it("should throw when the image does not exist", async () => {
      imageRepository.findOneWithRelations.mockResolvedValue(null);

      await expect(
        imageService.updateImage(
          IMAGE_ID,
          "Updated image",
          "/images/updated.png",
          "Updated description",
          [],
          owner,
        ),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(categoryRepository.findByIds).not.toHaveBeenCalled();
      expect(imageRepository.save).not.toHaveBeenCalled();
    });

    it("should forbid a user who is not the owner", async () => {
      const image = createImage(createUser(OWNER_ID));
      imageRepository.findOneWithRelations.mockResolvedValue(image);

      await expect(
        imageService.updateImage(
          IMAGE_ID,
          "Updated image",
          "/images/updated.png",
          "Updated description",
          [],
          otherUser,
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(categoryRepository.findByIds).not.toHaveBeenCalled();
      expect(imageRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("deleteImage", () => {
    it("should allow the owner to delete the image", async () => {
      const image = createImage(createUser(OWNER_ID));
      imageRepository.findOneWithRelations.mockResolvedValue(image);
      imageRepository.delete.mockResolvedValue(undefined);

      await imageService.deleteImage(IMAGE_ID, owner);

      expect(imageRepository.delete).toHaveBeenCalledWith(IMAGE_ID);
      expect(imageRepository.delete).toHaveBeenCalledTimes(1);
    });

    it("should allow an administrator to delete the image", async () => {
      const image = createImage(createUser(OWNER_ID));
      imageRepository.findOneWithRelations.mockResolvedValue(image);
      imageRepository.delete.mockResolvedValue(undefined);

      await imageService.deleteImage(IMAGE_ID, admin);

      expect(imageRepository.delete).toHaveBeenCalledWith(IMAGE_ID);
    });

    it("should throw when the image does not exist", async () => {
      imageRepository.findOneWithRelations.mockResolvedValue(null);

      await expect(
        imageService.deleteImage(IMAGE_ID, owner),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(imageRepository.delete).not.toHaveBeenCalled();
    });

    it("should forbid a user who is not the owner", async () => {
      const image = createImage(createUser(OWNER_ID));
      imageRepository.findOneWithRelations.mockResolvedValue(image);

      await expect(
        imageService.deleteImage(IMAGE_ID, otherUser),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(imageRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe("getOwnedCategories", () => {
    it("should return categories owned by the user", async () => {
      const user = createUser(OWNER_ID);
      const categories = [
        createCategory(CATEGORY_ID, "Technology", user),
        createCategory(SECOND_CATEGORY_ID, "Art", user),
      ];
      categoryRepository.findByIds.mockResolvedValue(categories);

      const result = await imageService.getOwnedCategories(
        [CATEGORY_ID, SECOND_CATEGORY_ID],
        OWNER_ID,
      );

      expect(result).toBe(categories);
      expect(categoryRepository.findByIds).toHaveBeenCalledWith([
        CATEGORY_ID,
        SECOND_CATEGORY_ID,
      ]);
    });

    it("should throw when one or more categories do not exist", async () => {
      const user = createUser(OWNER_ID);
      const category = createCategory(CATEGORY_ID, "Technology", user);
      categoryRepository.findByIds.mockResolvedValue([category]);

      await expect(
        imageService.getOwnedCategories(
          [CATEGORY_ID, SECOND_CATEGORY_ID],
          OWNER_ID,
        ),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("should forbid categories owned by another user", async () => {
      const category = createCategory(
        CATEGORY_ID,
        "Technology",
        createUser(OTHER_USER_ID),
      );
      categoryRepository.findByIds.mockResolvedValue([category]);

      await expect(
        imageService.getOwnedCategories([CATEGORY_ID], OWNER_ID),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
