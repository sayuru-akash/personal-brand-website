'use client';

import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import BrandIcon from '@/app/components/BrandIcon';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';

const aspectClassByRatio: Record<string, string> = {
  '16/9': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
};

const tones = ['var(--aka)', 'var(--ai)', 'var(--murasaki)', 'var(--matcha)', 'var(--ink)'];

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[var(--paper)] py-24 sm:py-32 lg:py-40"
      aria-labelledby="work-heading"
    >
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--ink)] to-transparent opacity-[0.06]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="mb-16 grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-code text-xs uppercase text-[var(--aka)]">Work</p>
            <h2
              id="work-heading"
              className="font-display mt-6 max-w-[9ch] text-6xl leading-[0.9] text-[var(--ink)] sm:text-7xl md:text-8xl"
            >
              Things shipped and shaped.
            </h2>
          </motion.div>

          <motion.p
            className="self-end text-2xl font-semibold leading-snug text-[var(--muted)] lg:max-w-[42rem]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Product work, studio identity, music, interface studies, and writing. The point is not volume. The point is taste under shipping pressure.
          </motion.p>
        </div>

        <div className="space-y-24 lg:space-y-36">
          {projects.map((project, index) => (
            <ProjectStory key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectStory({ project, index }: { project: Project; index: number }) {
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start end', 'end start'],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [54, -54]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -28]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1.03, 0.99]);
  const tone = tones[index % tones.length] ?? 'var(--aka)';
  const isReversed = index % 2 === 1;
  const aspectClass = aspectClassByRatio[project.aspectRatio] ?? 'aspect-[16/10]';

  return (
    <article
      ref={articleRef}
      className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
      aria-labelledby={`${project.id}-title`}
    >
      <motion.div
        className={[
          'lg:col-span-8',
          isReversed ? 'lg:order-2 lg:col-start-5' : 'lg:order-1 lg:col-start-1',
        ].join(' ')}
        style={{ y: visualY }}
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.84, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="group relative overflow-hidden rounded-[2.4rem] border border-[var(--ink)] bg-[var(--paper)] p-2 paper-shadow">
          <motion.div
            className={`relative overflow-hidden rounded-[1.85rem] bg-[var(--paper-quiet)] ${aspectClass}`}
            style={{ scale: imageScale }}
          >
            <div className="absolute inset-0 z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_42%,rgba(255,255,255,0.22))]" />
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={`${project.title} visual`}
                width={1440}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                priority={index < 2}
                loading={index < 2 ? undefined : 'eager'}
              />
            )}
          </motion.div>
          <div className="absolute right-5 top-5 rounded-full bg-[var(--paper)] px-4 py-2 font-code text-xs text-[var(--ink)]">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </motion.div>

      <motion.div
        className={[
          'lg:col-span-4',
          isReversed ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-9',
        ].join(' ')}
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="border-t border-[var(--line)] pt-6">
          <p className="font-code text-xs uppercase" style={{ color: tone }}>
            {project.role}
          </p>
          <h3
            id={`${project.id}-title`}
            className="mt-5 text-5xl font-black leading-none text-[var(--ink)]"
          >
            {project.title}
          </h3>

          <p className="mt-7 text-lg leading-8 text-[var(--muted)]">{project.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-2">
            {project.technologies.slice(0, 6).map((technology) => (
              <span
                key={technology}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 text-sm font-bold text-[var(--ink)]"
              >
                <BrandIcon name={technology} className="h-4 w-4" />
                <span className="truncate">{technology}</span>
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              className="ink-button mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
            >
              Visit
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    </article>
  );
}
