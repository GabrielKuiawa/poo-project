import * as bcrypt from "bcryptjs";
import { publicDemoAccount } from "../../src/constants/publicDemoAccount";
import { AppDataSource } from "../../src/data-source";
import Category from "../../src/models/Category";
import Image from "../../src/models/Image";
import { User } from "../../src/models/User";
import UserRepository from "../../src/repository/UserRepository";
import { seedDatabase } from "../../src/seed/seedDatabase";
import { seedUsers } from "../../src/seed/seedData";
import {
  clearTestDatabase,
  closeTestDatabase,
  initializeTestDatabase,
} from "../helpers/database";

describe("database seed", () => {
  beforeAll(initializeTestDatabase);
  beforeEach(clearTestDatabase);
  afterEach(clearTestDatabase);
  afterAll(closeTestDatabase);

  it("creates the demo dataset and replaces it without duplicating records", async () => {
    const password = "seed-password-123";

    await expect(seedDatabase(AppDataSource, password)).resolves.toEqual({
      users: 8,
      categories: 48,
      images: 200,
    });

    await expect(seedDatabase(AppDataSource, password)).resolves.toEqual({
      users: 8,
      categories: 48,
      images: 200,
    });

    await expect(AppDataSource.getRepository(User).count()).resolves.toBe(8);
    await expect(AppDataSource.getRepository(Category).count()).resolves.toBe(
      48,
    );
    await expect(AppDataSource.getRepository(Image).count()).resolves.toBe(200);

    const userRepository = new UserRepository();
    const demoUser = await userRepository.findOneByEmail(
      publicDemoAccount.email,
    );
    expect(demoUser).not.toBeNull();
    await expect(
      bcrypt.compare(publicDemoAccount.password, demoUser!.getPassword()),
    ).resolves.toBe(true);

    const privateSeedUser = await userRepository.findOneByEmail(
      seedUsers[1].email,
    );
    expect(privateSeedUser).not.toBeNull();
    await expect(
      bcrypt.compare(password, privateSeedUser!.getPassword()),
    ).resolves.toBe(true);

    const seededImage = await AppDataSource.getRepository(Image).findOne({
      where: {},
      relations: { user: true, categories: true },
    });

    expect(seededImage?.getTitle()).toEqual(expect.any(String));
    expect(seededImage?.getUser()).toBeDefined();
    expect(seededImage?.getCategories().length).toBeGreaterThanOrEqual(1);
  });
});
