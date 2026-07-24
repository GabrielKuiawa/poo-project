import { describe, expect, it } from "vitest";
import { getImageValidationError } from "@/hooks/useImageFileInput";

describe("getImageValidationError", () => {
  it("aceita JPEG, PNG e WebP com até 10 MB", () => {
    for (const type of ["image/jpeg", "image/png", "image/webp"]) {
      expect(
        getImageValidationError({ type, size: 10 * 1024 * 1024 }),
      ).toBeNull();
    }
  });

  it("rejeita formatos não suportados", () => {
    expect(getImageValidationError({ type: "image/svg+xml", size: 1024 })).toBe(
      "Escolha uma imagem JPEG, PNG ou WebP.",
    );
  });

  it("rejeita imagens maiores que 10 MB", () => {
    expect(
      getImageValidationError({
        type: "image/png",
        size: 10 * 1024 * 1024 + 1,
      }),
    ).toBe("A imagem não pode exceder 10 MB.");
  });
});
