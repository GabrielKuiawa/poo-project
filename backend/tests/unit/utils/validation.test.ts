import BadRequestException from "../../../src/exception/BadRequestException";
import { validatePagination } from "../../../src/utils/validation";

describe("validatePagination", () => {
  it("should use the default pagination values", () => {
    expect(validatePagination(undefined, undefined)).toEqual({
      page: 1,
      limit: 20,
      skip: 0,
    });
  });

  it("should calculate the offset from page and limit", () => {
    expect(validatePagination("3", "10")).toEqual({
      page: 3,
      limit: 10,
      skip: 20,
    });
  });

  it.each([
    ["0", "20"],
    ["1.5", "20"],
    ["abc", "20"],
    ["1", "0"],
    ["1", "101"],
  ])("should reject invalid page or limit values", (page, limit) => {
    expect(() => validatePagination(page, limit)).toThrow(BadRequestException);
  });
});
