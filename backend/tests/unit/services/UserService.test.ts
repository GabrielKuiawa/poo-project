jest.mock("../../../src/config", () => ({
  config: { jwtSecret: "test-jwt-secret" },
}));

import bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import { UserRole } from "../../../src/enum/UserRole";
import ConflictException from "../../../src/exception/ConflictException";
import ForbiddenException from "../../../src/exception/ForbiddenException";
import UnauthorizedException from "../../../src/exception/UnauthorizedException";
import { UserNotFoundException } from "../../../src/exception/UserNotFoundException";
import { User } from "../../../src/models/User";
import UserRepository from "../../../src/repository/UserRepository";
import { UserService } from "../../../src/service/UserService";
import { AuthenticatedUser } from "../../../src/types/AuthenticatedUser";

type UserRepositoryMock = jest.Mocked<
  Pick<
    UserRepository,
    | "findOne"
    | "findPaginated"
    | "findOneByEmail"
    | "findImagesByUserIdPaginated"
    | "save"
    | "delete"
  >
>;

const USER_ID = "123e4567-e89b-42d3-a456-426614174000";
const OTHER_USER_ID = "223e4567-e89b-42d3-a456-426614174000";
const PAGINATION = { page: 1, limit: 20, skip: 0 };

function createUser(
  id = USER_ID,
  email = "user@example.com",
  password = "stored-password",
): User {
  const user = new User();
  Object.defineProperty(user, "id", { value: id });
  user.setName("User");
  user.setEmail(email);
  user.setPassword(password);
  user.setAdmin(UserRole.USER);
  user.setPathImageUser("/users/user.png");
  return user;
}

describe("UserService", () => {
  let userRepository: UserRepositoryMock;
  let userService: UserService;

  const owner: AuthenticatedUser = {
    userId: USER_ID,
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
    userRepository = {
      findOne: jest.fn(),
      findPaginated: jest.fn(),
      findOneByEmail: jest.fn(),
      findImagesByUserIdPaginated: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    userService = new UserService(userRepository as unknown as UserRepository);
  });

  describe("saveUser", () => {
    it("should create a regular user with a hashed password", async () => {
      userRepository.findOneByEmail.mockResolvedValue(null);
      userRepository.save.mockImplementation(async (user) => user as User);

      const result = await userService.saveUser(
        "New User",
        "new@example.com",
        "password123",
        "/users/new.png",
      );

      expect(result.getName()).toBe("New User");
      expect(result.getAdmin()).toBe(UserRole.USER);
      expect(result.getPassword()).not.toBe("password123");
      await expect(
        bcrypt.compare("password123", result.getPassword()),
      ).resolves.toBe(true);
      expect(userRepository.save).toHaveBeenCalledWith(result);
    });

    it("should reject an email that is already in use", async () => {
      userRepository.findOneByEmail.mockResolvedValue(createUser());

      await expect(
        userService.saveUser(
          "New User",
          "user@example.com",
          "password123",
          "/users/new.png",
        ),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  it("should return all users", async () => {
    const users = [createUser()];
    userRepository.findPaginated.mockResolvedValue([users, 1]);

    await expect(userService.getUsers(PAGINATION)).resolves.toMatchObject({
      data: users,
      meta: { total: 1, totalPages: 1 },
    });
  });

  describe("getUserById", () => {
    it("should return the user to its owner", async () => {
      const user = createUser();
      userRepository.findOne.mockResolvedValue(user);

      await expect(userService.getUserById(USER_ID, owner)).resolves.toBe(user);
    });

    it("should reject a user who is not the owner", async () => {
      await expect(
        userService.getUserById(USER_ID, otherUser),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(userRepository.findOne).not.toHaveBeenCalled();
    });

    it("should throw when the user does not exist", async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        userService.getUserById(USER_ID, admin),
      ).rejects.toBeInstanceOf(UserNotFoundException);
    });
  });

  it("should return a user with images to an administrator", async () => {
    const user = createUser();
    userRepository.findOne.mockResolvedValue(user);
    userRepository.findImagesByUserIdPaginated.mockResolvedValue([[], 0]);

    await expect(
      userService.getUserWithImages(USER_ID, admin, PAGINATION),
    ).resolves.toMatchObject({
      user,
      images: { data: [], meta: { total: 0 } },
    });
    expect(userRepository.findImagesByUserIdPaginated).toHaveBeenCalledWith(
      USER_ID,
      PAGINATION,
    );
  });

  describe("updateUser", () => {
    it("should update and save the owner with a new password hash", async () => {
      const user = createUser();
      userRepository.findOne.mockResolvedValue(user);
      userRepository.findOneByEmail.mockResolvedValue(user);
      userRepository.save.mockImplementation(async (value) => value as User);

      const result = await userService.updateUser(
        USER_ID,
        "Updated User",
        "user@example.com",
        "new-password",
        "/users/updated.png",
        owner,
      );

      expect(result.getName()).toBe("Updated User");
      expect(result.getPathImageUser()).toBe("/users/updated.png");
      await expect(
        bcrypt.compare("new-password", result.getPassword()),
      ).resolves.toBe(true);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    it("should reject an email owned by another user", async () => {
      userRepository.findOne.mockResolvedValue(createUser());
      userRepository.findOneByEmail.mockResolvedValue(
        createUser(OTHER_USER_ID, "taken@example.com"),
      );

      await expect(
        userService.updateUser(
          USER_ID,
          "Updated User",
          "taken@example.com",
          "new-password",
          "/users/updated.png",
          owner,
        ),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  it("should delete an existing user as an administrator", async () => {
    userRepository.findOne.mockResolvedValue(createUser());
    userRepository.delete.mockResolvedValue(undefined);

    await userService.deleteUser(USER_ID, admin);

    expect(userRepository.delete).toHaveBeenCalledWith(USER_ID);
  });

  describe("login", () => {
    it("should return a signed token for valid credentials", async () => {
      const passwordHash = await bcrypt.hash("password123", 10);
      userRepository.findOneByEmail.mockResolvedValue(
        createUser(USER_ID, "user@example.com", passwordHash),
      );

      const token = await userService.login("user@example.com", "password123");
      const payload = jwt.verify(token, "test-jwt-secret") as jwt.JwtPayload;

      expect(payload.userId).toBe(USER_ID);
      expect(payload.role).toBe(UserRole.USER);
    });

    it("should reject invalid credentials", async () => {
      const compareSpy = jest.spyOn(bcrypt, "compare");
      userRepository.findOneByEmail.mockResolvedValue(null);

      await expect(
        userService.login("unknown@example.com", "password123"),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(compareSpy).toHaveBeenCalledWith(
        "password123",
        expect.stringMatching(/^\$2[aby]\$10\$/),
      );
      compareSpy.mockRestore();
    });
  });
});
