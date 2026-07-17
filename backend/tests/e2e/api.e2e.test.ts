import * as bcrypt from "bcryptjs";
import request = require("supertest");
import App from "../../src/App";
import { AppDataSource } from "../../src/data-source";
import { UserRole } from "../../src/enum/UserRole";
import { User } from "../../src/models/User";
import {
  clearTestDatabase,
  closeTestDatabase,
} from "../helpers/database";

describe("API E2E", () => {
  let api: ReturnType<typeof request>;

  beforeAll(async () => {
    const application = new App();
    await application.initialize();
    api = request(application.getApp());
  });

  beforeEach(clearTestDatabase);
  afterAll(closeTestDatabase);

  it("runs the registration, login, category, and image flow over HTTP", async () => {
    const registration = await api
      .post("/api/user")
      .set("X-Request-Id", "e2e-registration")
      .send({
        name: "Gabriel",
        email: "gabriel@example.com",
        password: "password123",
        pathImageUser: "/users/gabriel.png",
        role: UserRole.ADMIN,
      });

    expect(registration.status).toBe(201);
    expect(registration.body.data).toMatchObject({
      name: "Gabriel",
      email: "gabriel@example.com",
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

    const createdCategory = await api
      .post("/api/category")
      .set("Authorization", authorization)
      .send({ name: "Architecture" });
    expect(createdCategory.status).toBe(201);

    const ownedCategories = await api
      .get("/api/category/mine")
      .set("Authorization", authorization);
    expect(ownedCategories.status).toBe(200);
    expect(ownedCategories.body).toEqual([
      {
        id: createdCategory.body.data.id,
        name: "Architecture",
      },
    ]);

    const createdImage = await api
      .post("/api/image")
      .set("Authorization", authorization)
      .send({
        pathImage: "/images/house.png",
        description: "Modern house",
        categoryIds: [createdCategory.body.data.id],
      });
    expect(createdImage.status).toBe(201);
    expect(createdImage.body.data).toMatchObject({
      pathImage: "/images/house.png",
      description: "Modern house",
      categories: [
        {
          id: createdCategory.body.data.id,
          name: "Architecture",
        },
      ],
    });

    const publicFeed = await api.get("/api/image");
    expect(publicFeed.status).toBe(200);
    expect(publicFeed.body).toHaveLength(1);
    expect(publicFeed.body[0].id).toBe(createdImage.body.data.id);
    expect(publicFeed.body[0].author).toEqual({
      id: registration.body.data.id,
      name: "Gabriel",
      pathImageUser: "/users/gabriel.png",
    });

    await api
      .delete(`/api/category/${createdCategory.body.data.id}`)
      .set("Authorization", authorization)
      .expect(204);

    const imageAfterCategoryDeletion = await api.get(
      `/api/image/${createdImage.body.data.id}`,
    );
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
    expect(ownerCategories.body.map((item: { id: string }) => item.id)).toEqual([
      category.body.data.id,
    ]);
    expect(ownerCategories.body).not.toContainEqual(
      expect.objectContaining({ id: otherCategory.body.data.id }),
    );

    const missingToken = await api
      .post("/api/category")
      .send({ name: "Without authentication" });
    expect(missingToken.status).toBe(401);

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

  it("returns consistent HTTP errors for invalid input and missing resources", async () => {
    const invalidId = await api
      .get("/api/image/not-a-uuid")
      .set("X-Request-Id", "e2e-invalid-id");

    expect(invalidId.status).toBe(400);
    expect(invalidId.body).toMatchObject({
      status: 400,
      requestId: "e2e-invalid-id",
    });

    const missingImage = await api.get(
      "/api/image/123e4567-e89b-42d3-a456-426614174000",
    );
    expect(missingImage.status).toBe(404);
    expect(missingImage.body.message).toBe("Imagem não encontrada.");
    expect(missingImage.body.requestId).toBe(
      missingImage.headers["x-request-id"],
    );
  });

  it("sets CORS headers only for configured browser origins", async () => {
    const allowedOrigin = "http://localhost:5173";
    const allowedResponse = await api
      .options("/api/category")
      .set("Origin", allowedOrigin)
      .set("Access-Control-Request-Method", "POST")
      .set(
        "Access-Control-Request-Headers",
        "Authorization, Content-Type",
      );

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

    expect(blockedResponse.status).toBe(200);
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
