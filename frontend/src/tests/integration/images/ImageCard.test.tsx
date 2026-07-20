import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ImageCard } from "@/features/images/components/ImageCard";
import { createImage } from "@/tests/fixtures/images";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    params,
    to,
    ...props
  }: {
    children: ReactNode;
    params: { imageId: string };
    to: string;
  }) => (
    <a href={to.replace("$imageId", params.imageId)} {...props}>
      {children}
    </a>
  ),
}));

describe("ImageCard", () => {
  it("links to the image details and reveals the image after loading", () => {
    const image = createImage({
      id: "reference-id",
      title: "Sala minimalista",
      description: "Sala clara com móveis minimalistas",
    });

    render(<ImageCard image={image} index={2} />);

    expect(
      screen.getByRole("link", { name: "Ver detalhes de Sala minimalista" }),
    ).toHaveAttribute("href", "/images/reference-id");

    const imageElement = screen.getByRole("img", {
      name: "Sala clara com móveis minimalistas",
    });
    expect(imageElement).toHaveClass("opacity-0");

    fireEvent.load(imageElement);

    expect(imageElement).toHaveClass("opacity-100");
    expect(imageElement).not.toHaveClass("opacity-0");
  });

  it("exposes the current card actions", () => {
    render(<ImageCard image={createImage()} index={0} />);

    expect(screen.getByRole("button", { name: /Perfil/ })).toBeVisible();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Compartilhar imagem" }),
    ).toBeVisible();
  });
});
