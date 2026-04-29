'use client';

import { motion } from 'motion/react';
import { projects } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ProjectsSection Component
 * 
 * Clean masonry layout showcasing portfolio projects.
 * Refined, elegant design with subtle animations - easy on the eyes.
 * 
 * Requirements: 4.1, 4.4, 4.5, 4.7
 */
export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  /**
   * Get grid row span based on aspect ratio
   */
  const getRowSpan = (aspectRatio: string) => {
    switch (aspectRatio) {
      case '16/9':
        return 'md:row-span-2';
      case '4/3':
        return 'md:row-span-3';
      case '1/1':
        return 'md:row-span-4';
      default:
        return 'md:row-span-2';
    }
  };

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center bg-neutral-50"
      aria-labelledby="projects-heading"
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        
        {/* Section header */}
        <motion.div 
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springPhysics, delay: 0.1 }}
        >
          {/* Section label */}
          <div className="space-y-3 mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
              プロジェクト
            </p>
            <motion.div 
              className="h-[1px] w-16 bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Heading */}
          <h2 
            id="projects-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[0.95] text-neutral-900"
          >
            Selected Work
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[120px]">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`${getRowSpan(project.aspectRatio)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                ...springPhysics, 
                delay: index * 0.08 
              }}
            >
              <div className="h-full bg-white border border-neutral-200 rounded-2xl p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 hover:border-accent/30 hover:shadow-sm">
                
                {/* Project header */}
                <div className="space-y-6">
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
                    {project.title}
                  </h3>

                  {/* Role */}
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-accent" />
                    <p className="text-sm uppercase tracking-[0.15em] text-neutral-500 font-light">
                      {project.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-base text-neutral-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project footer */}
                <div className="mt-8 space-y-4">
                  {/* Technologies */}
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
