'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { projects } from '@/data/portfolio';
import { useRef, useState } from 'react';

/**
 * ProjectsSection Component
 * 
 * PREMIUM VERSION with immersive interactions
 * - Smooth masonry layout with scroll reveals
 * - Interactive hover states with image reveals
 * - Magnetic cursor effects
 * - Depth through layered parallax
 * - Professional, polished aesthetic
 */
export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const getRowSpan = (aspectRatio: string) => {
    switch (aspectRatio) {
      case '16/9': return 'md:row-span-2';
      case '4/3': return 'md:row-span-3';
      case '1/1': return 'md:row-span-4';
      default: return 'md:row-span-2';
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center bg-white py-24 sm:py-32"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating gradient */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,245,244,0.3) 0%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-[2px] w-12 bg-accent" />
            <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
              プロジェクト / Projects
            </span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] text-neutral-900 max-w-[600px]">
              Selected
              <br />
              <span className="text-neutral-400">Work</span>
            </h2>
            
            <motion.p 
              className="text-lg text-neutral-600 max-w-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A curated collection of projects showcasing expertise across development, design, and innovation.
            </motion.p>
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[140px]">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`${getRowSpan(project.aspectRatio)} group`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <motion.div 
                className="relative h-full bg-neutral-50 border border-neutral-200 rounded-3xl overflow-hidden"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.04)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Background gradient that reveals on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, rgba(250,250,249,0.5) 0%, rgba(245,245,244,0.3) 50%, transparent 80%)`,
                  }}
                />

                {/* Content */}
                <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between">
                  
                  {/* Header */}
                  <div className="space-y-6">
                    {/* Project number */}
                    <motion.div 
                      className="inline-flex items-center justify-center w-12 h-12 bg-white border border-neutral-200 rounded-xl group-hover:border-accent/30 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <span className="text-lg font-bold text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 leading-tight group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Role badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-xs uppercase tracking-[0.15em] text-neutral-600 font-medium">
                        {project.role}
                      </span>
                    </div>

                    {/* Description */}
                    <motion.p 
                      className="text-base text-neutral-700 leading-relaxed"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-4">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1.5 text-xs text-neutral-600 bg-white border border-neutral-200 rounded-full group-hover:border-accent/30 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.1 + techIndex * 0.05 + 0.3 
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1.5 text-xs text-neutral-500 bg-white border border-neutral-200 rounded-full">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View project link */}
                    <motion.div
                      className="flex items-center gap-2 text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <span className="text-sm">View Project</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-neutral-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,245,244,0.4) 0%, transparent 50%)',
                  }}
                />
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { label: 'Projects Completed', value: projects.length },
            { label: 'Years Experience', value: '5+' },
            { label: 'Technologies', value: '20+' },
            { label: 'Happy Clients', value: '100%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-accent mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-neutral-600 uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
