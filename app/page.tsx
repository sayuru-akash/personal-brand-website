import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import AnimationErrorBoundary from '@/app/components/AnimationErrorBoundary';
import ScrollProgress from '@/app/components/ScrollProgress';
import FloatingNav from '@/app/components/FloatingNav';
import SectionDivider from '@/app/components/SectionDivider';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

const dividerItemsOne = [
  'Full-stack Development',
  'Web Design',
  'Music Production',
  'Content Writing',
  'Codezela Technologies',
  'Colombo, Sri Lanka',
];

const dividerItemsTwo = [
  'Next.js',
  'React',
  'TypeScript',
  'Figma',
  'FL Studio',
  'Sound Design',
  'Technical Writing',
  'Market Analysis',
];

export default function Home() {
  return (
    <>
      <AnimationErrorBoundary fallbackLabel="Scroll Progress">
        <ScrollProgress />
      </AnimationErrorBoundary>

      <AnimationErrorBoundary fallbackLabel="Floating Navigation">
        <FloatingNav />
      </AnimationErrorBoundary>

      <div className="min-h-[100dvh] bg-[var(--paper)] text-[var(--ink)]">
        <AnimationErrorBoundary fallbackLabel="Hero">
          <HeroSection />
        </AnimationErrorBoundary>

        <AnimationErrorBoundary fallbackLabel="Divider">
          <SectionDivider items={dividerItemsOne} accent="var(--aka)" />
        </AnimationErrorBoundary>

        <AnimationErrorBoundary fallbackLabel="About">
          <AboutSection />
        </AnimationErrorBoundary>

        <AnimationErrorBoundary fallbackLabel="Divider">
          <SectionDivider items={dividerItemsTwo} accent="var(--ai)" />
        </AnimationErrorBoundary>

        <AnimationErrorBoundary fallbackLabel="Skills">
          <SkillsSection />
        </AnimationErrorBoundary>

        <AnimationErrorBoundary fallbackLabel="Contact">
          <ContactSection />
        </AnimationErrorBoundary>
      </div>
    </>
  );
}

