/**
 * StaticFallback Component
 * 
 * Provides a static HTML structure for users with JavaScript disabled.
 * This component ensures the portfolio is accessible and readable without JavaScript,
 * following progressive enhancement principles.
 * 
 * Requirements: 15.6 (Progressive Enhancement)
 */

import { heroContent, aboutContent, skillCategories, projects, contactContent } from '@/data/portfolio';

export default function StaticFallback() {
  return (
    <div className="static-fallback">
      {/* Hero Section - Static */}
      <section className="min-h-[100dvh] flex items-center bg-neutral-50 px-6 py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-neutral-900">
              {heroContent.name}
            </h1>
            <p className="text-sm font-light text-neutral-600 tracking-wide">
              {heroContent.nameJapanese}
            </p>
            <p className="text-xl md:text-2xl font-medium text-neutral-700 tracking-tight leading-relaxed max-w-[65ch]">
              {heroContent.role}
            </p>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-[65ch]">
              {heroContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Static */}
      <section className="min-h-[100dvh] flex items-center bg-neutral-50 px-6 py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                  について
                </p>
                <div className="h-[1px] w-16 bg-accent" />
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[0.95] text-neutral-900">
                Multi-disciplinary
                <br />
                Creator
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed max-w-[45ch]">
                {aboutContent.bio}
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-neutral-600">
                  <span className="text-base">{aboutContent.location}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <span className="text-base">{aboutContent.education}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-accent" />
                  <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Roles
                  </h3>
                </div>
                <ul className="space-y-4">
                  {aboutContent.roles.map((role) => (
                    <li key={role} className="text-lg text-neutral-700 flex items-start gap-4">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-accent" />
                  <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Interests
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {aboutContent.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-5 py-2.5 text-base text-neutral-700 bg-white border border-neutral-200 rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Static */}
      <section className="min-h-[100dvh] flex items-center bg-white px-6 py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="mb-12 lg:mb-16">
            <div className="space-y-3 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                スキル
              </p>
              <div className="h-[1px] w-16 bg-accent" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[0.95] text-neutral-900">
              Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className={`${category.gridSize === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'} no-js-hover-card`}
              >
                <div className="h-full bg-neutral-50 border border-neutral-200 rounded-2xl p-8 lg:p-10">
                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900">
                      {category.title}
                    </h3>
                    <div className="mt-4 h-[1px] w-12 bg-accent" />
                  </div>
                  <ul className="space-y-3">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-base lg:text-lg text-neutral-700 flex items-start gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        <span className="leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Static */}
      <section className="min-h-[100dvh] flex items-center bg-neutral-50 px-6 py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="mb-12 lg:mb-16">
            <div className="space-y-3 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                プロジェクト
              </p>
              <div className="h-[1px] w-16 bg-accent" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[0.95] text-neutral-900">
              Selected Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <article key={project.id} className="no-js-hover-card">
                <div className="h-full bg-white border border-neutral-200 rounded-2xl p-8 lg:p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-accent" />
                      <p className="text-sm uppercase tracking-[0.15em] text-neutral-500 font-light">
                        {project.role}
                      </p>
                    </div>
                    <p className="text-base text-neutral-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Static */}
      <section className="min-h-[100dvh] flex items-center justify-center bg-neutral-50 px-6 py-16">
        <div className="w-full max-w-[900px] mx-auto">
          <div className="text-center space-y-12">
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                連絡 / Contact
              </p>
              <div className="h-[1px] w-16 bg-accent" />
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1] text-neutral-900 max-w-[20ch] mx-auto">
                {contactContent.ctaText}
              </h2>
              <a
                href={`mailto:${contactContent.email}`}
                className="inline-block text-xl sm:text-2xl lg:text-3xl font-medium text-accent hover:text-accent-dark no-js-hover-link"
              >
                {contactContent.email}
              </a>
            </div>

            <div className="pt-8">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                {contactContent.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 text-neutral-600 hover:text-accent no-js-hover-link"
                    aria-label={`${link.platform}: ${link.handle}`}
                  >
                    <span className="text-sm font-medium tracking-wide">
                      {link.platform}
                    </span>
                    <span className="text-xs text-neutral-500 group-hover:text-accent">
                      {link.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
            {new Date().getFullYear()} — Sayuru Akash
          </p>
        </div>
      </section>
    </div>
  );
}
