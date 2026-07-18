import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../../src/data-source";
import { UserRole } from "../../src/enum/UserRole";
import ForbiddenException from "../../src/exception/ForbiddenException";
import CategoryRepository from "../../src/repository/CategoryRepository";
import ImageRepository from "../../src/repository/ImageRepository";
import UserRepository from "../../src/repository/UserRepository";
import { CategoryService } from "../../src/service/CategoryService";
import { ImageService } from "../../src/service/ImageService";
import { UserService } from "../../src/service/UserService";
import {
  clearTestDatabase,
  closeTestDatabase,
  initializeTestDatabase,
} from "../helpers/database";

describe("integration between services, repositories, and MySQL", () => {
  let userService: UserService;
  let categoryService: CategoryService;
  let imageService: ImageService;

  beforeAll(async () => {
    await initializeTestDatabase();

    const userRepository = new UserRepository();
    const categoryRepository = new CategoryRepository();
    const imageRepository = new ImageRepository();

    userService = new UserService(userRepository);
    categoryService = new CategoryService(categoryRepository, userRepository);
    imageService = new ImageService(
      imageRepository,
      userRepository,
      categoryRepository,
    );
  });

  beforeEach(clearTestDatabase);
  afterAll(closeTestDatabase);

  it("persists a user, protects the password, and authenticates with stored data", async () => {
    const user = await userService.saveUser(
      "Gabriel",
      "gabriel@example.com",
      "password123",
      "/users/gabriel.png",
    );

    const persistedUser = await new UserRepository().findOne(user.getId());
    expect(persistedUser).not.toBeNull();
    expect(persistedUser?.getEmail()).toBe("gabriel@example.com");
    expect(persistedUser?.getPassword()).not.toBe("password123");
    await expect(
      bcrypt.compare("password123", persistedUser!.getPassword()),
    ).resolves.toBe(true);

    const token = await userService.login("gabriel@example.com", "password123");
    expect(jwt.verify(token, process.env.JWT_SECRET!)).toMatchObject({
      userId: user.getId(),
      role: UserRole.USER,
    });
  });

  it("persists relationships and removes only the association when deleting a category", async () => {
    const user = await userService.saveUser(
      "Owner",
      "owner@example.com",
      "password123",
      "/users/owner.png",
    );
    const authenticatedUser = {
      userId: user.getId(),
      role: UserRole.USER,
    };
    const category = await categoryService.saveCategory(
      "Architecture",
      user.getId(),
    );
    const image = await imageService.saveImage(
      "Modern architecture",
      "/images/house.png",
      "Modern house",
      user.getId(),
      [category.getId()],
    );

    const persistedImage = await imageService.getImageById(image.getId());
    expect(persistedImage.getUser().getId()).toBe(user.getId());
    expect(persistedImage.getCategories()).toHaveLength(1);
    expect(persistedImage.getCategories()[0].getName()).toBe("Architecture");

    await categoryService.deleteCategory(category.getId(), authenticatedUser);

    const imageAfterCategoryDeletion = await imageService.getImageById(
      image.getId(),
    );
    expect(imageAfterCategoryDeletion.getCategories()).toEqual([]);
    expect(await AppDataSource.getRepository("image").count()).toBe(1);
  });

  it("rejects a category owned by another user at the service layer", async () => {
    const owner = await userService.saveUser(
      "Owner",
      "owner@example.com",
      "password123",
      "/users/owner.png",
    );
    const other = await userService.saveUser(
      "Other",
      "other@example.com",
      "password123",
      "/users/other.png",
    );
    const category = await categoryService.saveCategory(
      "Private",
      other.getId(),
    );

    await expect(
      imageService.saveImage(
        "Invalid image",
        "/images/invalid.png",
        "Invalid reference",
        owner.getId(),
        [category.getId()],
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(await AppDataSource.getRepository("image").count()).toBe(0);
  });
});
