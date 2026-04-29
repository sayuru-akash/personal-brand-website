/**
 * SkillsSection Component Tests
 * 
 * Tests for the SkillsSection component to verify:
 * - Skill categories data structure
 * - All required skill categories are present
 * - Grid sizing configuration is correct
 */

import { skillCategories } from '@/data/portfolio';

describe('SkillsSection', () => {
  it('has all skill categories defined', () => {
    expect(skillCategories).toBeDefined();
    expect(skillCategories.length).toBeGreaterThan(0);
  });

  it('has at least 5 skill categories', () => {
    expect(skillCategories.length).toBeGreaterThanOrEqual(5);
  });

  it('includes Development category', () => {
    const devCategory = skillCategories.find(cat => cat.id === 'development');
    expect(devCategory).toBeDefined();
    expect(devCategory?.title).toBe('Development');
  });

  it('includes Design category', () => {
    const designCategory = skillCategories.find(cat => cat.id === 'design');
    expect(designCategory).toBeDefined();
    expect(designCategory?.title).toBe('Design');
  });

  it('includes Music Production category', () => {
    const musicCategory = skillCategories.find(cat => cat.id === 'music-production');
    expect(musicCategory).toBeDefined();
    expect(musicCategory?.title).toBe('Music Production');
  });

  it('all categories have required properties', () => {
    skillCategories.forEach((category) => {
      expect(category.id).toBeDefined();
      expect(category.title).toBeDefined();
      expect(category.skills).toBeDefined();
      expect(category.gridSize).toBeDefined();
      expect(Array.isArray(category.skills)).toBe(true);
    });
  });

  it('all categories have valid gridSize values', () => {
    const validSizes = ['small', 'medium', 'large'];
    skillCategories.forEach((category) => {
      expect(validSizes).toContain(category.gridSize);
    });
  });

  it('all categories have at least one skill', () => {
    skillCategories.forEach((category) => {
      expect(category.skills.length).toBeGreaterThan(0);
    });
  });

  it('all skills are non-empty strings', () => {
    skillCategories.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(typeof skill).toBe('string');
        expect(skill.length).toBeGreaterThan(0);
      });
    });
  });

  it('Development category has expected skills', () => {
    const devCategory = skillCategories.find(cat => cat.id === 'development');
    expect(devCategory?.skills).toContain('Next.js');
    expect(devCategory?.skills).toContain('React');
    expect(devCategory?.skills).toContain('TypeScript');
  });

  it('has proper Bento grid sizing distribution', () => {
    const largeTiles = skillCategories.filter(cat => cat.gridSize === 'large');
    const mediumTiles = skillCategories.filter(cat => cat.gridSize === 'medium');
    const smallTiles = skillCategories.filter(cat => cat.gridSize === 'small');
    
    // Verify we have a mix of sizes for asymmetric layout
    expect(largeTiles.length).toBeGreaterThan(0);
    expect(mediumTiles.length + smallTiles.length).toBeGreaterThan(0);
  });
});
