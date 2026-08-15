import { aboutContent, contactContent, heroContent, skillCategories } from '@/data/portfolio';

export default function StaticFallback() {
  return (
    <div className="bg-[#fbfaf7] text-[#2c2b28]">
      <section className="min-h-[100dvh] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-[1400px] flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2f6f5e]">
            {heroContent.nameJapanese}
          </p>
          <h1 className="mt-6 max-w-[12ch] text-6xl font-semibold leading-[1.02] sm:text-7xl md:text-8xl">
            {heroContent.name}
          </h1>
          <p className="mt-8 max-w-[42rem] text-2xl leading-snug text-[#4c4943]">
            {heroContent.subtitle}
          </p>
          <p className="mt-6 max-w-[44rem] text-lg font-semibold leading-8 text-[#4c4943]">
            {heroContent.roles.join(' / ')}
          </p>
          <p className="mt-6 max-w-[44rem] text-base leading-7 text-[#6e6a61]">
            {aboutContent.bio}
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 border-t border-[#d8d2c6] pt-12 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="text-5xl font-semibold leading-tight sm:text-6xl">Profile</h2>
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <p className="border-t border-[#d8d2c6] pt-4 text-sm text-[#6e6a61]">
                Location<br />
                <span className="text-lg font-semibold text-[#2c2b28]">{aboutContent.location}</span>
              </p>
              <p className="border-t border-[#d8d2c6] pt-4 text-sm text-[#6e6a61]">
                Education<br />
                <span className="text-lg font-semibold text-[#2c2b28]">{aboutContent.education}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {aboutContent.roles.map((role) => (
                <p key={role} className="border-t border-[#d8d2c6] pt-4 text-lg font-medium">
                  {role}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1ea] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="text-5xl font-semibold leading-tight sm:text-6xl">Stack</h2>
          <div className="divide-y divide-[#d8d2c6] border-y border-[#d8d2c6]">
            {skillCategories.map((category) => (
              <div key={category.id} className="grid grid-cols-1 gap-4 py-6 md:grid-cols-[16rem_1fr]">
                <h3 className="text-2xl font-semibold">{category.title}</h3>
                <p className="leading-7 text-[#5f5b53]">{category.skills.join(' / ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e6eee6] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2f6f5e]">
              Contact
            </p>
            <h2 className="mt-6 max-w-[11ch] text-5xl font-semibold leading-tight sm:text-6xl">
              {contactContent.ctaText}
            </h2>
          </div>
          <div className="self-end border-t border-[#c8d6cc] pt-6">
            <a href={`mailto:${contactContent.email}`} className="text-3xl font-semibold text-[#2c2b28]">
              {contactContent.email}
            </a>
            <div className="mt-8 space-y-4">
              {contactContent.socialLinks.map((link) => (
                <a key={link.platform} href={link.url} className="block text-[#5f5b53]">
                  {link.platform} / {link.handle}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
