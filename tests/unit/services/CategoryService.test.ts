import Category from "../../../src/models/Category";
import CategoryRepository from "../../../src/repository/CategoryRepository";
import UserRepository from "../../../src/repository/UserRepository";
import { CategoryService } from "../../../src/service/CategoryService";

describe("CategoryService", () => {
  it("deve retornar uma categoria existente pelo ID", async () => {

    const category = new Category();
    category.setName("Tecnologia");

    const findOneMock = jest.fn().mockResolvedValue(category);

    const categoryRepositoryMock = {
      findOne: findOneMock,
    } as unknown as CategoryRepository;

    const userRepositoryMock =
      {} as unknown as UserRepository;

    const categoryService = new CategoryService(
      categoryRepositoryMock,
      userRepositoryMock,
    );

    const categoryId =
      "123e4567-e89b-42d3-a456-426614174000";

    const result =
      await categoryService.getCategoryById(categoryId);

    expect(result).toBe(category);

    expect(findOneMock).toHaveBeenCalledWith(categoryId);

    expect(findOneMock).toHaveBeenCalledTimes(1);
  });
});