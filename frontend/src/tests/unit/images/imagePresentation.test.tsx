import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImageCardSkeleton } from "@/features/images/components/ImageCardSkeleton";
import { getPlaceholderColor } from "@/features/images/placeholderColors";

describe("image presentation helpers", () => {
  it("cycles placeholder colors deterministically", () => {
    expect(getPlaceholderColor(0)).toBe("#124873");
    expect(getPlaceholderColor(9)).toBe("#124873");
    expect(getPlaceholderColor(10)).toBe("#8f433b");
  });

  it("uses a stable skeleton size", () => {
    const { container } = render(<ImageCardSkeleton />);

    expect(container.firstElementChild).toHaveClass("h-80", "w-full");
  });
});
