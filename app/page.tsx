import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import AnimationErrorBoundary from '@/app/components/AnimationErrorBoundary';
import ScrollProgress from '@/app/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <AnimationErrorBoundary fallbackLabel="Hero">
          <HeroSection />
        </AnimationErrorBoundary>
        <AnimationErrorBoundary fallbackLabel="About">
          <AboutSection />
        </AnimationErrorBoundary>
      </div>
    </>
  );
}
