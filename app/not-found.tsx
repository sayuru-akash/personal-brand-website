import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import InteractiveSiteFooter from "@/app/components/InteractiveSiteFooter";
import SiteHeader from "@/app/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
        <div className="absolute inset-0 ink-grid opacity-24" />
        <div className="absolute right-0 top-0 h-full w-[38%] bg-[var(--paper-blue)]/55" />
        <div className="absolute left-0 top-0 h-full w-1 bg-[var(--aka)] sm:w-1.5" />

        <SiteHeader />

        <div className="relative grid min-h-[70dvh] place-items-center px-5 py-24 text-center">
          <div>
            <p className="font-code text-xs uppercase text-[var(--aka)]">
              404 / Not found
            </p>
            <h1 className="font-display mt-6 text-[clamp(4rem,14vw,10rem)] leading-[0.96]">
              Wrong turn.
            </h1>
            <p className="mx-auto mt-8 max-w-lg text-lg leading-8 text-[var(--muted)]">
              The page moved, never existed, or no longer belongs here.
            </p>
            <Link
              href="/"
              className="ink-button mt-10 inline-flex min-h-14 items-center gap-3 rounded-full px-7 text-sm font-bold"
            >
              <ArrowLeft className="h-5 w-5" />
              Back home
            </Link>
          </div>
        </div>
      </section>
      <InteractiveSiteFooter />
    </div>
  );
}
