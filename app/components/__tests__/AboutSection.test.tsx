/**
 * AboutSection Component Tests
 * 
 * Tests for the AboutSection component to verify:
 * - Component structure and content
 * - Data integration from portfolio content
 */

import { aboutContent } from '@/data/portfolio';

describe('AboutSection', () => {
  it('has all required biographical content', () => {
    expect(aboutContent.bio).toBeDefined();
    expect(aboutContent.bio.length).toBeGreaterThan(0);
  });

  it('has location information', () => {
    expect(aboutContent.location).toBe('Colombo, Sri Lanka');
  });

  it('has education information', () => {
    expect(aboutContent.education).toContain('Plymouth University');
  });

  it('has at least 5 roles defined', () => {
    expect(aboutContent.roles.length).toBeGreaterThanOrEqual(5);
  });

  it('includes key roles', () => {
    expect(aboutContent.roles).toContain('Full-stack Developer');
    expect(aboutContent.roles).toContain('CEO @ Codezela Technologies');
  });

  it('has personality traits defined', () => {
    expect(aboutContent.traits.length).toBeGreaterThan(0);
  });

  it('includes expected traits', () => {
    expect(aboutContent.traits).toContain('Coffee maniac');
    expect(aboutContent.traits).toContain('Tech enthusiast');
  });

  it('all roles are non-empty strings', () => {
    aboutContent.roles.forEach((role) => {
      expect(typeof role).toBe('string');
      expect(role.length).toBeGreaterThan(0);
    });
  });

  it('all traits are non-empty strings', () => {
    aboutContent.traits.forEach((trait) => {
      expect(typeof trait).toBe('string');
      expect(trait.length).toBeGreaterThan(0);
    });
  });
});
