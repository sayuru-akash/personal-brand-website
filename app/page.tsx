import HeroSection from '@/app/components/HeroSection';
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
      </div>
    </>
  );
}
