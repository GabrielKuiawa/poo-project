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

  it("varies skeleton height and color by index", () => {
    const { container, rerender } = render(<ImageCardSkeleton index={0} />);
    const firstSkeleton = container.firstElementChild;

    expect(firstSkeleton).toHaveStyle({
      backgroundColor: "#124873",
      height: "224px",
    });

    rerender(<ImageCardSkeleton index={1} />);

    expect(container.firstElementChild).toHaveStyle({
      backgroundColor: "#8f433b",
      height: "307px",
    });
  });
});
