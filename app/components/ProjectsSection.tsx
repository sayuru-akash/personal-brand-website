'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { projects } from '@/data/portfolio';
import { useRef, useState, useEffect } from 'react';

// Hook for counting animation
function useCountAnimation(end: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return { count, setIsInView };
}

/**
 * ProjectsSection Component
 * 
 * PREMIUM VERSION with magnetic cursor and ripple effects
 * - Magnetic cursor attraction to cards
 * - Beautiful ripple effect on hover
 * - Smooth spring physics throughout
 * - Professional, luxurious aesthetic
 */
export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center bg-white py-24 sm:py-32 overflow-hidden"
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

      {/* Floating preview image - appears at viewport top-right on hover */}
      <AnimatePresence mode="wait">
        {hoveredProject && (
          <motion.div
            key={hoveredProject}
            className="fixed top-24 right-12 z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85, y: -30, x: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.85, 
              y: -30,
              x: 30,
            }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 ring-1 ring-white/20 backdrop-blur-sm">
              {/* Project preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-neutral-800 to-neutral-900 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <div className="text-6xl font-bold mb-3 opacity-20">
                    {projects.find(p => p.id === hoveredProject)?.title.charAt(0)}
                  </div>
                  <div className="text-base font-semibold px-2">
                    {projects.find(p => p.id === hoveredProject)?.title}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* Horizontal cards with magnetic effect */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <MagneticProjectCard
              key={project.id}
              project={project}
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
              onHover={setHoveredProject}
            />
          ))}
        </div>

        {/* Bottom stats with counting animation */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StatCard value={200} label="Projects Completed" index={0} suffix="+" />
          <StatCard value={7} label="Years Experience" index={1} suffix="+" />
          <StatCard value={50} label="Technologies" index={2} suffix="+" />
          <StatCard value={99} label="Client Satisfaction" index={3} suffix="%+" />
        </motion.div>
      </div>
    </section>
  );
}

// Magnetic Project Card Component
function MagneticProjectCard({
  project,
  index,
  mouseX,
  mouseY,
  onHover,
}: {
  project: typeof projects[0];
  index: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  onHover: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [localRippleOrigin, setLocalRippleOrigin] = useState({ x: 0, y: 0 });

  // Magnetic effect - card position
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const smoothCardX = useSpring(cardX, { stiffness: 150, damping: 20, mass: 0.5 });
  const smoothCardY = useSpring(cardY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const unsubscribeX = mouseX.on('change', (x: number) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const distanceX = x - cardCenterX;
      const distanceY = mouseY.get() - cardCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic pull radius
      const magneticRadius = 300;
      
      if (distance < magneticRadius && !isHovered) {
        // Pull strength decreases with distance
        const strength = (1 - distance / magneticRadius) * 15;
        cardX.set(distanceX * strength * 0.01);
        cardY.set(distanceY * strength * 0.01);
      } else if (!isHovered) {
        cardX.set(0);
        cardY.set(0);
      }
    });

    const unsubscribeY = mouseY.on('change', () => {
      // Trigger recalculation
      mouseX.set(mouseX.get());
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, cardX, cardY, isHovered]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onHover(project.id);
    
    // Calculate ripple origin relative to card
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setLocalRippleOrigin({ x, y });
      setRippleActive(true);
      
      // Reset ripple after animation
      setTimeout(() => setRippleActive(false), 1000);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{
        x: smoothCardX,
        y: smoothCardY,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="relative bg-neutral-50 border border-neutral-200 rounded-3xl overflow-hidden"
        animate={isHovered ? {
          y: -8,
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        } : {
          y: 0,
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Ripple effect */}
        {rippleActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${localRippleOrigin.x}% ${localRippleOrigin.y}%, rgba(100,116,139,0.15) 0%, transparent 50%)`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, rgba(250,250,249,0.5) 0%, rgba(245,245,244,0.3) 50%, transparent 80%)`,
          }}
        />

        {/* Content */}
        <div className="relative p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Number & Title */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div 
                className="inline-flex items-center justify-center w-12 h-12 bg-white border border-neutral-200 rounded-xl group-hover:border-accent/30 transition-colors"
                animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span className="text-lg font-bold text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>

              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs uppercase tracking-[0.15em] text-neutral-600 font-medium">
                  {project.role}
                </span>
              </div>
            </div>

            {/* Middle: Description */}
            <div className="lg:col-span-4">
              <p className="text-base text-neutral-700 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Right: Tech & Links */}
            <div className="lg:col-span-3 space-y-6">
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs text-neutral-600 bg-white border border-neutral-200 rounded-full group-hover:border-accent/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-3 py-1.5 text-xs text-neutral-500 bg-white border border-neutral-200 rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-neutral-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </motion.div>
    </motion.article>
  );
}

// StatCard component with counting animation
function StatCard({ 
  value, 
  label, 
  index,
  suffix = ''
}: { 
  value: number; 
  label: string; 
  index: number;
  suffix?: string;
}) {
  const { count, setIsInView } = useCountAnimation(value, 1500);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="text-center group cursor-default"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      onViewportEnter={() => setIsInView(true)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative text-4xl md:text-5xl font-bold text-accent mb-2 inline-block"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 + index * 0.1 }}
        animate={isHovered ? {
          scale: 1.1,
          y: -5,
        } : {
          scale: 1,
          y: 0,
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 blur-xl rounded-full"
          initial={{ opacity: 0 }}
          animate={isHovered ? {
            opacity: 0.3,
            scale: 1.5,
          } : {
            opacity: 0,
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle, rgba(100,116,139,0.6) 0%, transparent 70%)',
          }}
        />
        
        {/* Number with counting animation */}
        <span className="relative">
          {count}{suffix}
        </span>

        {/* Sparkle effect on hover */}
        {isHovered && (
          <>
            <motion.span
              className="absolute -top-2 -right-2 text-xl"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], rotate: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -bottom-2 -left-2 text-xl"
              initial={{ opacity: 0, scale: 0, rotate: 180 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              ✨
            </motion.span>
          </>
        )}
      </motion.div>
      
      <motion.div 
        className="text-sm text-neutral-600 uppercase tracking-[0.15em] group-hover:text-accent transition-colors"
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
