import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import AnimationErrorBoundary from '@/app/components/AnimationErrorBoundary';
import ScrollProgress from '@/app/components/ScrollProgress';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <>
      <AnimationErrorBoundary fallbackLabel="Scroll Progress">
        <ScrollProgress />
      </AnimationErrorBoundary>
      
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <AnimationErrorBoundary fallbackLabel="Hero">
          <HeroSection />
        </AnimationErrorBoundary>
        
        <AnimationErrorBoundary fallbackLabel="About">
          <AboutSection />
        </AnimationErrorBoundary>
        
        <AnimationErrorBoundary fallbackLabel="Skills">
          <SkillsSection />
        </AnimationErrorBoundary>
        
        <AnimationErrorBoundary fallbackLabel="Projects">
          <ProjectsSection />
        </AnimationErrorBoundary>
        
        <AnimationErrorBoundary fallbackLabel="Contact">
          <ContactSection />
        </AnimationErrorBoundary>
      </div>
    </>
  );
}
