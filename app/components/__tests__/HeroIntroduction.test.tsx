import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HeroIntroduction from "@/app/components/HeroIntroduction";
import { heroContent } from "@/data/portfolio";

describe("introduction previews", () => {
  it("preserves the complete introduction while annotating its important terms", () => {
    const { container } = render(<HeroIntroduction />);
    expect(container.querySelector(".intro-copy p")?.textContent).toBe(
      heroContent.subtitle,
    );
    expect(screen.getAllByRole("button")).toHaveLength(7);
    expect(
      screen.getByRole("button", { name: "Colombo, Sri Lanka" }),
    ).toBeDefined();
  });

  it("opens by click and dismisses with Escape", async () => {
    render(<HeroIntroduction />);
    const trigger = screen.getByRole("button", {
      name: "Codezela Technologies",
    });
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", {
      name: "Codezela Technologies",
    });
    expect(dialog.textContent).toContain("London, United Kingdom");
    expect(
      screen.getByRole("link", { name: "Visit Codezela" }).getAttribute("href"),
    ).toBe("https://codezela.com/");
    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("shows the Sri Lanka outline and Colombo marker", async () => {
    render(<HeroIntroduction />);
    fireEvent.click(screen.getByRole("button", { name: "Colombo, Sri Lanka" }));
    await screen.findByRole("dialog", { name: "Colombo, Sri Lanka" });
    expect(
      screen.getByRole("img", {
        name: "Sri Lanka outline with Colombo marked on the western coast",
      }),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: "Find Colombo on the map" })
        .getAttribute("href"),
    ).toContain("6.934675");
    fireEvent.click(screen.getByRole("button", { name: "Close preview" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
