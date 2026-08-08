import {
  aboutPageContent,
  contactTopics,
  privacyPolicySections,
  siteNavigation,
} from "@/data/portfolio";

describe("supporting page content", () => {
  it("keeps the primary navigation intentionally limited", () => {
    expect(siteNavigation).toEqual([
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ]);
  });

  it("does not publish a birth year", () => {
    expect(JSON.stringify(aboutPageContent)).not.toContain("2002");
  });

  it("provides optimized local archive images with dimensions", () => {
    expect(aboutPageContent.archive).toHaveLength(4);
    aboutPageContent.archive.forEach((image) => {
      expect(image.src).toMatch(/^\/images\/archive\/.*\.webp$/);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.alt.length).toBeGreaterThan(10);
    });
  });

  it("provides complete contact topics and privacy sections", () => {
    expect(contactTopics.length).toBeGreaterThanOrEqual(4);
    expect(privacyPolicySections.length).toBeGreaterThanOrEqual(10);
    expect(privacyPolicySections.every((section) => section.paragraphs.length > 0)).toBe(true);
  });
});
