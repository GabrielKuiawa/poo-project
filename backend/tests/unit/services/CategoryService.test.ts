import ForbiddenException from "../../../src/exception/ForbiddenException";
import NotFoundException from "../../../src/exception/NotFoundException";
import { UserNotFoundException } from "../../../src/exception/UserNotFoundException";
import { UserRole } from "../../../src/enum/UserRole";
import Category from "../../../src/models/Category";
import { User } from "../../../src/models/User";
import CategoryRepository from "../../../src/repository/CategoryRepository";
import UserRepository from "../../../src/repository/UserRepository";
import { CategoryService } from "../../../src/service/CategoryService";
import { AuthenticatedUser } from "../../../src/types/AuthenticatedUser";

type CategoryRepositoryMock = jest.Mocked<
  Pick<
    CategoryRepository,
    | "findAll"
    | "findByUserId"
    | "findOne"
    | "findOneWithUser"
    | "save"
    | "delete"
  >
>;

type UserRepositoryMock = jest.Mocked<Pick<UserRepository, "findOne">>;

const CATEGORY_ID = "123e4567-e89b-42d3-a456-426614174000";
const OWNER_ID = "223e4567-e89b-42d3-a456-426614174000";
const OTHER_USER_ID = "323e4567-e89b-42d3-a456-426614174000";

function createUser(id: string): User {
  const user = new User();
  Object.defineProperty(user, "id", { value: id });
  return user;
}

function createCategory(name: string, user: User): Category {
  const category = new Category();
  category.setName(name);
  category.setUser(user);
  return category;
}

describe("CategoryService", () => {
  let categoryRepository: CategoryRepositoryMock;
  let userRepository: UserRepositoryMock;
  let categoryService: CategoryService;

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
    categoryRepository = {
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      findOne: jest.fn(),
      findOneWithUser: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    userRepository = {
      findOne: jest.fn(),
    };

    categoryService = new CategoryService(
      categoryRepository as unknown as CategoryRepository,
      userRepository as unknown as UserRepository,
    );
  });

  describe("saveCategory", () => {
    it("should create and save a category for an existing user", async () => {
      const user = createUser(OWNER_ID);
      userRepository.findOne.mockResolvedValue(user);
      categoryRepository.save.mockImplementation(
        async (category) => category as Category,
      );

      const result = await categoryService.saveCategory(
        "Technology",
        OWNER_ID,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith(OWNER_ID);
      expect(categoryRepository.save).toHaveBeenCalledTimes(1);
      expect(result.getName()).toBe("Technology");
      expect(result.getUser()).toBe(user);
    });

    it("should throw when the user does not exist", async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        categoryService.saveCategory("Technology", OWNER_ID),
      ).rejects.toBeInstanceOf(UserNotFoundException);

      expect(categoryRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("getCategories", () => {
    it("should return all categories", async () => {
      const user = createUser(OWNER_ID);
      const categories = [
        createCategory("Technology", user),
        createCategory("Art", user),
      ];
      categoryRepository.findAll.mockResolvedValue(categories);

      const result = await categoryService.getCategories();

      expect(result).toBe(categories);
      expect(categoryRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCategoriesByUserId", () => {
    it("should return only categories owned by the user", async () => {
      const categories = [
        createCategory("Technology", createUser(OWNER_ID)),
      ];
      categoryRepository.findByUserId.mockResolvedValue(categories);

      const result = await categoryService.getCategoriesByUserId(OWNER_ID);

      expect(result).toBe(categories);
      expect(categoryRepository.findByUserId).toHaveBeenCalledWith(OWNER_ID);
    });
  });

  describe("getCategoryById", () => {
    it("should return an existing category by id", async () => {
      const category = createCategory("Technology", createUser(OWNER_ID));
      categoryRepository.findOne.mockResolvedValue(category);

      const result = await categoryService.getCategoryById(CATEGORY_ID);

      expect(result).toBe(category);
      expect(categoryRepository.findOne).toHaveBeenCalledWith(CATEGORY_ID);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should throw when the category does not exist", async () => {
      categoryRepository.findOne.mockResolvedValue(null);

      await expect(
        categoryService.getCategoryById(CATEGORY_ID),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe("updateCategory", () => {
    it("should allow the owner to update the category", async () => {
      const category = createCategory("Old name", createUser(OWNER_ID));
      categoryRepository.findOneWithUser.mockResolvedValue(category);
      categoryRepository.save.mockImplementation(
        async (categoryToSave) => categoryToSave as Category,
      );

      const result = await categoryService.updateCategory(
        CATEGORY_ID,
        "New name",
        owner,
      );

      expect(categoryRepository.findOneWithUser).toHaveBeenCalledWith(
        CATEGORY_ID,
      );
      expect(categoryRepository.save).toHaveBeenCalledWith(category);
      expect(result.getName()).toBe("New name");
    });

    it("should allow an administrator to update the category", async () => {
      const category = createCategory("Old name", createUser(OWNER_ID));
      categoryRepository.findOneWithUser.mockResolvedValue(category);
      categoryRepository.save.mockImplementation(
        async (categoryToSave) => categoryToSave as Category,
      );

      const result = await categoryService.updateCategory(
        CATEGORY_ID,
        "Admin update",
        admin,
      );

      expect(result.getName()).toBe("Admin update");
      expect(categoryRepository.save).toHaveBeenCalledWith(category);
    });

    it("should throw when the category does not exist", async () => {
      categoryRepository.findOneWithUser.mockResolvedValue(null);

      await expect(
        categoryService.updateCategory(CATEGORY_ID, "New name", owner),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(categoryRepository.save).not.toHaveBeenCalled();
    });

    it("should forbid a user who is not the owner", async () => {
      const category = createCategory("Old name", createUser(OWNER_ID));
      categoryRepository.findOneWithUser.mockResolvedValue(category);

      await expect(
        categoryService.updateCategory(CATEGORY_ID, "New name", otherUser),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(category.getName()).toBe("Old name");
      expect(categoryRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("deleteCategory", () => {
    it("should allow the owner to delete the category", async () => {
      const category = createCategory("Technology", createUser(OWNER_ID));
      categoryRepository.findOneWithUser.mockResolvedValue(category);
      categoryRepository.delete.mockResolvedValue(undefined);

      await categoryService.deleteCategory(CATEGORY_ID, owner);

      expect(categoryRepository.delete).toHaveBeenCalledWith(CATEGORY_ID);
      expect(categoryRepository.delete).toHaveBeenCalledTimes(1);
    });

    it("should allow an administrator to delete the category", async () => {
      const category = createCategory("Technology", createUser(OWNER_ID));
      categoryRepository.findOneWithUser.mockResolvedValue(category);
      categoryRepository.delete.mockResolvedValue(undefined);

      await categoryService.deleteCategory(CATEGORY_ID, admin);

      expect(categoryRepository.delete).toHaveBeenCalledWith(CATEGORY_ID);
    });

    it("should throw when the category does not exist", async () => {
      categoryRepository.findOneWithUser.mockResolvedValue(null);

      await expect(
        categoryService.deleteCategory(CATEGORY_ID, owner),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(categoryRepository.delete).not.toHaveBeenCalled();
    });

    it("should forbid a user who is not the owner", async () => {
      const category = createCategory("Technology", createUser(OWNER_ID));
      categoryRepository.findOneWithUser.mockResolvedValue(category);

      await expect(
        categoryService.deleteCategory(CATEGORY_ID, otherUser),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(categoryRepository.delete).not.toHaveBeenCalled();
    });
  });
});
