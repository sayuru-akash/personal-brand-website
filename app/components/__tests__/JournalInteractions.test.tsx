import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import SkillsSection from "@/app/components/SkillsSection";

jest.mock("@/app/components/Reveal", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/app/components/BrandIcon", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/app/components/SkillPlayground", () => ({
  __esModule: true,
  default: () => null,
}));

describe("skills index", () => {
  it("opens and closes groups independently for keyboard and pointer users", () => {
    render(<SkillsSection />);
    const development = screen.getByRole("button", { name: /Development/ });
    const design = screen.getByRole("button", { name: /Design/ });
    expect(development.getAttribute("aria-expanded")).toBe("true");
    expect(design.getAttribute("aria-expanded")).toBe("false");
    const designPanel = document.getElementById(
      design.getAttribute("aria-controls")!,
    );
    expect(designPanel?.hasAttribute("inert")).toBe(true);

    fireEvent.click(design);
    expect(design.getAttribute("aria-expanded")).toBe("true");
    expect(designPanel?.hasAttribute("inert")).toBe(false);
    expect(development.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("UI/UX Design")).toBeDefined();

    fireEvent.click(design);
    expect(design.getAttribute("aria-expanded")).toBe("false");
    expect(designPanel?.hasAttribute("inert")).toBe(true);
  });
});
