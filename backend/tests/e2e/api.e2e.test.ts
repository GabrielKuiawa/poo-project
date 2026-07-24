import * as bcrypt from "bcryptjs";
import request = require("supertest");
import App from "../../src/App";
import { AppDataSource } from "../../src/data-source";
import { UserRole } from "../../src/enum/UserRole";
import { User } from "../../src/models/User";
import { SpacesStorageService } from "../../src/service/SpacesStorageService";
import { clearTestDatabase, closeTestDatabase } from "../helpers/database";

const TEST_PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

describe("API E2E", () => {
  let api: ReturnType<typeof request>;
  let uploadNumber = 0;

  beforeAll(async () => {
    jest
      .spyOn(SpacesStorageService.prototype, "upload")
      .mockImplementation(async (file, folder) => {
        const key = `test/${folder}/test-${++uploadNumber}.${file.extension}`;
        return {
          key,
          url: `https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/${key}`,
        };
      });
    jest
      .spyOn(SpacesStorageService.prototype, "delete")
      .mockResolvedValue(undefined);

    const application = new App();
    await application.initialize();
    api = request(application.getApp());
  });

  beforeEach(async () => {
    uploadNumber = 0;
    await clearTestDatabase();
  });
  afterAll(async () => {
    await closeTestDatabase();
    jest.restoreAllMocks();
  });

  it("runs the registration, login, category, and image flow over HTTP", async () => {
    const registration = await api
      .post("/api/user")
      .set("X-Request-Id", "e2e-registration")
      .field("name", "Gabriel")
      .field("email", "gabriel@example.com")
      .field("password", "password123")
      .attach("image", TEST_PNG, {
        filename: "gabriel.png",
        contentType: "image/png",
      });

    expect(registration.status).toBe(201);
    expect(registration.body.data).toMatchObject({
      name: "Gabriel",
      email: "gabriel@example.com",
      pathImageUser:
        "https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/test/users/test-1.png",
      role: UserRole.USER,
    });
    expect(registration.body.data).not.toHaveProperty("password");
    expect(registration.headers["x-request-id"]).toBe("e2e-registration");

    const login = await api.post("/api/user/login").send({
      email: "gabriel@example.com",
      password: "password123",
    });
    expect(login.status).toBe(200);
    expect(login.body.token).toEqual(expect.any(String));
    const authorization = `Bearer ${login.body.token}`;

    const currentUser = await api
      .get("/api/user/me")
      .set("Authorization", authorization);
    expect(currentUser.status).toBe(200);
    expect(currentUser.body).toMatchObject({
      id: registration.body.data.id,
      email: "gabriel@example.com",
      pathImageUser:
        "https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/test/users/test-1.png",
      role: UserRole.USER,
    });

    const createdCategory = await api
      .post("/api/category")
      .set("Authorization", authorization)
      .send({ name: "Architecture" });
    expect(createdCategory.status).toBe(201);

    const ownedCategories = await api
      .get("/api/category/mine")
      .set("Authorization", authorization);
    expect(ownedCategories.status).toBe(200);
    expect(ownedCategories.body).toMatchObject({
      data: [
        {
          id: createdCategory.body.data.id,
          name: "Architecture",
        },
      ],
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });

    const createdImage = await api
      .post("/api/image")
      .set("Authorization", authorization)
      .field("title", "Modern architecture")
      .field("description", "Modern house")
      .field("categoryIds", createdCategory.body.data.id)
      .attach("image", TEST_PNG, {
        filename: "house.png",
        contentType: "image/png",
      });
    expect(createdImage.status).toBe(201);
    expect(createdImage.body.data).toMatchObject({
      title: "Modern architecture",
      pathImage: `https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/test/images/${registration.body.data.id}/test-2.png`,
      description: "Modern house",
      categories: [
        {
          id: createdCategory.body.data.id,
          name: "Architecture",
        },
      ],
    });

    const authenticatedFeed = await api
      .get("/api/image?page=1&limit=10")
      .set("Authorization", authorization);
    expect(authenticatedFeed.status).toBe(200);
    expect(authenticatedFeed.body.meta).toMatchObject({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
      next: null,
      previous: null,
    });
    expect(authenticatedFeed.body.data).toHaveLength(1);
    expect(authenticatedFeed.body.data[0].id).toBe(createdImage.body.data.id);
    expect(authenticatedFeed.body.data[0].author).toEqual({
      id: registration.body.data.id,
      name: "Gabriel",
      pathImageUser:
        "https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/test/users/test-1.png",
    });

    for (const imageNumber of [2, 3]) {
      await api
        .post("/api/image")
        .set("Authorization", authorization)
        .field("title", `Architecture ${imageNumber}`)
        .field("description", `Modern house ${imageNumber}`)
        .field("categoryIds", createdCategory.body.data.id)
        .attach("image", TEST_PNG, {
          filename: `house-${imageNumber}.png`,
          contentType: "image/png",
        })
        .expect(201);
    }

    const suggestions = await api
      .get("/api/search/suggestions?q=arch&limit=9")
      .set("Authorization", authorization);
    expect(suggestions.status).toBe(200);
    expect(suggestions.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "image",
          id: createdImage.body.data.id,
          label: "Modern architecture",
        }),
        expect.objectContaining({
          type: "category",
          id: createdCategory.body.data.id,
          label: "Architecture",
        }),
      ]),
    );

    const categoryResults = await api
      .get(
        `/api/image?page=1&limit=10&type=category&id=${createdCategory.body.data.id}`,
      )
      .set("Authorization", authorization);
    expect(categoryResults.status).toBe(200);
    expect(categoryResults.body.data).toHaveLength(3);

    const creatorResults = await api
      .get("/api/image?page=1&limit=10&q=gabriel")
      .set("Authorization", authorization);
    expect(creatorResults.status).toBe(200);
    expect(creatorResults.body.data).toHaveLength(3);

    const deployedOrigin = "https://api.mood-board.gabizin.me";
    const firstFeedPage = await api
      .get("/api/image?page=1&limit=2")
      .set("Authorization", authorization)
      .set("X-Forwarded-Host", "api.mood-board.gabizin.me")
      .set("X-Forwarded-Proto", "https");
    expect(firstFeedPage.body.meta).toMatchObject({
      next: `${deployedOrigin}/api/image?page=2&limit=2`,
      previous: null,
    });

    const secondFeedPage = await api
      .get("/api/image?page=2&limit=2")
      .set("Authorization", authorization)
      .set("X-Forwarded-Host", "api.mood-board.gabizin.me")
      .set("X-Forwarded-Proto", "https");
    expect(secondFeedPage.status).toBe(200);
    expect(secondFeedPage.body.data).toHaveLength(1);
    expect(secondFeedPage.body.meta).toMatchObject({
      page: 2,
      limit: 2,
      total: 3,
      totalPages: 2,
      next: null,
      previous: `${deployedOrigin}/api/image?page=1&limit=2`,
    });

    await api
      .delete(`/api/category/${createdCategory.body.data.id}`)
      .set("Authorization", authorization)
      .expect(204);

    const imageAfterCategoryDeletion = await api
      .get(`/api/image/${createdImage.body.data.id}`)
      .set("Authorization", authorization);
    expect(imageAfterCategoryDeletion.status).toBe(200);
    expect(imageAfterCategoryDeletion.body.categories).toEqual([]);
  });

  it("enforces authentication, ownership, and user roles", async () => {
    const owner = await seedUser("owner@example.com", UserRole.USER);
    const other = await seedUser("other@example.com", UserRole.USER);
    const ownerToken = await login("owner@example.com");
    const otherToken = await login("other@example.com");

    const category = await api
      .post("/api/category")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ name: "Design" })
      .expect(201);

    const otherCategory = await api
      .post("/api/category")
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ name: "Other user category" })
      .expect(201);

    const ownerCategories = await api
      .get("/api/category/mine")
      .set("Authorization", `Bearer ${ownerToken}`)
      .expect(200);
    expect(
      ownerCategories.body.data.map((item: { id: string }) => item.id),
    ).toEqual([category.body.data.id]);
    expect(ownerCategories.body.data).not.toContainEqual(
      expect.objectContaining({ id: otherCategory.body.data.id }),
    );

    const missingToken = await api
      .post("/api/category")
      .send({ name: "Without authentication" });
    expect(missingToken.status).toBe(401);

    const privateFeedWithoutToken = await api.get("/api/image");
    expect(privateFeedWithoutToken.status).toBe(401);

    const forbiddenUpdate = await api
      .put(`/api/category/${category.body.data.id}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ name: "Unauthorized category update" });
    expect(forbiddenUpdate.status).toBe(403);

    const forbiddenUserList = await api
      .get("/api/user")
      .set("Authorization", `Bearer ${ownerToken}`);
    expect(forbiddenUserList.status).toBe(403);

    const persistedCategory = await api.get(
      `/api/category/${category.body.data.id}`,
    );
    expect(persistedCategory.body.name).toBe("Design");
    expect(owner.getId()).not.toBe(other.getId());
  });

  it("updates a user avatar through FormData", async () => {
    const user = await seedUser("avatar@example.com", UserRole.USER);
    const token = await login("avatar@example.com");

    const updatedUser = await api
      .put(`/api/user/${user.getId()}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Avatar Updated")
      .field("email", "avatar@example.com")
      .field("password", "new-password")
      .attach("image", TEST_PNG, {
        filename: "new-avatar.png",
        contentType: "image/png",
      });

    expect(updatedUser.status).toBe(200);
    expect(updatedUser.body.data).toMatchObject({
      id: user.getId(),
      name: "Avatar Updated",
      pathImageUser:
        "https://test-mood-board-media.nyc3.cdn.digitaloceanspaces.com/test/users/test-1.png",
    });
  });

  it("returns consistent HTTP errors for invalid input and missing resources", async () => {
    await seedUser("reader@example.com", UserRole.USER);
    const readerToken = await login("reader@example.com");
    const authorization = `Bearer ${readerToken}`;

    const invalidId = await api
      .get("/api/image/not-a-uuid")
      .set("Authorization", authorization)
      .set("X-Request-Id", "e2e-invalid-id");

    expect(invalidId.status).toBe(400);
    expect(invalidId.body).toMatchObject({
      status: 400,
      requestId: "e2e-invalid-id",
    });

    const missingImage = await api
      .get("/api/image/123e4567-e89b-42d3-a456-426614174000")
      .set("Authorization", authorization);
    expect(missingImage.status).toBe(404);
    expect(missingImage.body.message).toBe("Imagem não encontrada.");
    expect(missingImage.body.requestId).toBe(
      missingImage.headers["x-request-id"],
    );

    const invalidPagination = await api
      .get("/api/image?page=0&limit=101")
      .set("Authorization", authorization);
    expect(invalidPagination.status).toBe(400);
  });

  it("sets CORS headers only for configured browser origins", async () => {
    const allowedOrigin = "http://localhost:5173";
    const allowedResponse = await api
      .options("/api/category")
      .set("Origin", allowedOrigin)
      .set("Access-Control-Request-Method", "POST")
      .set("Access-Control-Request-Headers", "Authorization, Content-Type");

    expect(allowedResponse.status).toBe(204);
    expect(allowedResponse.headers["access-control-allow-origin"]).toBe(
      allowedOrigin,
    );
    expect(allowedResponse.headers["access-control-expose-headers"]).toBe(
      "X-Request-Id",
    );
    expect(allowedResponse.headers["access-control-allow-headers"]).toContain(
      "Authorization",
    );

    const blockedResponse = await api
      .get("/api/image")
      .set("Origin", "https://example.com");

    expect(blockedResponse.status).toBe(401);
    expect(blockedResponse.headers).not.toHaveProperty(
      "access-control-allow-origin",
    );
  });

  async function seedUser(email: string, role: UserRole): Promise<User> {
    const user = new User();
    user.setName(email.split("@")[0]);
    user.setEmail(email);
    user.setPassword(await bcrypt.hash("password123", 10));
    user.setPathImageUser(`/users/${email}.png`);
    user.setAdmin(role);
    return AppDataSource.getRepository(User).save(user);
  }

  async function login(email: string): Promise<string> {
    const response = await api.post("/api/user/login").send({
      email,
      password: "password123",
    });
    expect(response.status).toBe(200);
    return response.body.token;
  }
});
