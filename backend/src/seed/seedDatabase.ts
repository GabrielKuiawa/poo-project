import * as bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
import { UserRole } from "../enum/UserRole";
import Category from "../models/Category";
import Image from "../models/Image";
import { User } from "../models/User";
import { seedCategoryNames, seedImages, seedUsers } from "./seedData";

const CATEGORIES_PER_USER = 6;

export type SeedResult = {
  users: number;
  categories: number;
  images: number;
};

export async function seedDatabase(
  dataSource: DataSource,
  userPassword: string,
): Promise<SeedResult> {
  if (userPassword.length < 8) {
    throw new Error("SEED_USER_PASSWORD deve ter pelo menos 8 caracteres.");
  }

  const passwordHash = await bcrypt.hash(userPassword, 10);

  return dataSource.transaction(async (manager) => {
    const seedEmails = seedUsers.map((user) => user.email);

    await manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("email IN (:...emails)", { emails: seedEmails })
      .execute();

    const users = seedUsers.map((userData) => {
      const user = new User();

      user.setName(userData.name);
      user.setEmail(userData.email);
      user.setPathImageUser(userData.pathImageUser);
      user.setPassword(passwordHash);
      user.setAdmin(UserRole.USER);

      return user;
    });

    await manager.getRepository(User).save(users);

    const categoriesByUser = new Map<string, Category[]>();
    const categories = users.flatMap((user, userIndex) => {
      const userCategories = Array.from(
        { length: CATEGORIES_PER_USER },
        (_, categoryIndex) => {
          const category = new Category();
          const nameIndex =
            (userIndex * CATEGORIES_PER_USER + categoryIndex) %
            seedCategoryNames.length;

          category.setName(seedCategoryNames[nameIndex]);
          category.setUser(user);
          return category;
        },
      );

      categoriesByUser.set(user.getId(), userCategories);
      return userCategories;
    });

    await manager.getRepository(Category).save(categories);

    const images = seedImages.map((imageData, imageIndex) => {
      const image = new Image();
      const owner = users[imageIndex % users.length];
      const ownerCategories = categoriesByUser.get(owner.getId())!;
      const numberOfCategories = 1 + (imageIndex % 3);
      const categoryOffset = imageIndex % ownerCategories.length;
      const imageCategories = Array.from(
        { length: numberOfCategories },
        (_, categoryIndex) =>
          ownerCategories[
            (categoryOffset + categoryIndex) % ownerCategories.length
          ],
      );

      image.setTitle(imageData.title);
      image.setPathImage(imageData.pathImage);
      image.setDescription(imageData.description);
      image.user = owner;
      image.setCategories(imageCategories);

      return image;
    });

    await manager.getRepository(Image).save(images, { chunk: 50 });

    return {
      users: users.length,
      categories: categories.length,
      images: images.length,
    };
  });
}
