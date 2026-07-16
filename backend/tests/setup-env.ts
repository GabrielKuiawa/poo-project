process.env.NODE_ENV = "test";
process.env.PORT = process.env.TEST_PORT ?? "3001";
process.env.DB_HOST = process.env.DB_TEST_HOST ?? "127.0.0.1";
process.env.DB_PORT = process.env.DB_TEST_PORT ?? "3307";
process.env.DB_USERNAME = process.env.DB_TEST_USERNAME ?? "test_user";
process.env.DB_PASSWORD = process.env.DB_TEST_PASSWORD ?? "test_password";
process.env.DB_DATABASE =
  process.env.DB_TEST_DATABASE ?? "image_management_test";
process.env.JWT_SECRET =
  process.env.JWT_TEST_SECRET ?? "integration-test-jwt-secret";
