import {
  aboutPageContent,
  contactTopics,
  privacyPolicySections,
  siteNavigation,
  socialLinks,
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
    expect(aboutPageContent.biography[0]).toContain("Born on 14 June in Colombo");
    expect(aboutPageContent.facts[0]).toEqual({
      label: "Born",
      value: "14 June / Colombo, Sri Lanka",
    });
    expect(aboutPageContent.moments[0].marker).toBe("ORIGIN");
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
    expect(
      privacyPolicySections
        .find((section) => section.id === "cookies")
        ?.paragraphs.join(" "),
    ).toContain("Google Analytics 4");
  });

  it("uses the current X label and hyphenated public handles", () => {
    expect(socialLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ platform: "X", handle: "@sayuru-akash" }),
        expect.objectContaining({ platform: "GitHub", handle: "@sayuru-akash" }),
      ]),
    );
  });
});
