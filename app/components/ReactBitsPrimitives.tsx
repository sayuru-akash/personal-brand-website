'use client';

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ShinyTextProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  spread?: number;
  delay?: number;
};

export function ShinyText({
  children,
  className = '',
  color = 'var(--aka)',
  shineColor = 'var(--ai)',
  speed = 3.2,
  spread = 118,
  delay = 0.4,
}: ShinyTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (prefersReducedMotion || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const animationDuration = speed * 1000;
    const cycleDuration = animationDuration + delay * 1000;
    const cycleTime = elapsedRef.current % cycleDuration;
    progress.set(cycleTime < animationDuration ? (cycleTime / animationDuration) * 100 : 100);
  });

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);
  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {children}
    </motion.span>
  );
}

type RoleTickerProps = {
  roles: string[];
  className?: string;
};

export function RoleTicker({ roles, className = '' }: RoleTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const activeRole = roles[index % roles.length] ?? '';

  useEffect(() => {
    if (prefersReducedMotion || roles.length < 2) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, roles.length]);

  if (!activeRole) return null;

  return (
    <div className={`relative overflow-hidden ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeRole}
          className="block"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -22, filter: 'blur(8px)' }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeRole}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

type MagnetLinesProps = {
  rows?: number;
  columns?: number;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
};

export function MagnetLines({
  rows = 7,
  columns = 7,
  lineColor = 'var(--ink)',
  lineWidth = '2px',
  lineHeight = '32px',
  baseAngle = -16,
  className = '',
  style,
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const items = container.querySelectorAll<HTMLSpanElement>('span');

    const pointLines = (pointer: { x: number; y: number }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const rotation = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);
        item.style.setProperty('--rotate', `${rotation}deg`);
      });
    };

    const handlePointerMove = (event: PointerEvent) => pointLines({ x: event.x, y: event.y });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    if (items.length) {
      const middle = items[Math.floor(items.length / 2)];
      const rect = middle.getBoundingClientRect();
      pointLines({ x: rect.x, y: rect.y });
    }

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [rows, columns, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        ...style,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * columns }, (_, index) => (
        <span
          key={index}
          className="block origin-center rounded-full transition-transform duration-150"
          style={
            {
              backgroundColor: lineColor,
              width: lineWidth,
              height: lineHeight,
              '--rotate': `${baseAngle}deg`,
              transform: 'rotate(var(--rotate))',
              willChange: 'transform',
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

type Dot = {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
};

type CursorDotFieldProps = {
  className?: string;
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  pushStrength?: number;
  from?: string;
  to?: string;
};

export const CursorDotField = memo(function CursorDotField({
  className = '',
  dotRadius = 1.6,
  dotSpacing = 18,
  cursorRadius = 180,
  pushStrength = 48,
  from = 'rgba(214,58,47,0.38)',
  to = 'rgba(35,79,213,0.34)',
}: CursorDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const buildDots = useCallback((w: number, h: number) => {
    const step = dotRadius + dotSpacing;
    const cols = Math.floor(w / step);
    const rows = Math.floor(h / step);
    const padX = (w % step) / 2;
    const padY = (h % step) / 2;
    const dots: Dot[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        dots.push({ ax, ay, sx: ax, sy: ay });
      }
    }

    dotsRef.current = dots;
  }, [dotRadius, dotSpacing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = {
        w: rect.width,
        h: rect.height,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };
      buildDots(rect.width, rect.height);
    };

    const handlePointerMove = (event: MouseEvent) => {
      const size = sizeRef.current;
      mouseRef.current.x = event.pageX - size.offsetX;
      mouseRef.current.y = event.pageY - size.offsetY;
    };

    const tick = () => {
      const { w, h } = sizeRef.current;
      const mouse = mouseRef.current;
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, from);
      gradient.addColorStop(1, to);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = gradient;
      ctx.beginPath();

      for (const dot of dotsRef.current) {
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (!prefersReducedMotion && distance < cursorRadius) {
          const force = (1 - distance / cursorRadius) ** 2 * pushStrength;
          const angle = Math.atan2(dy, dx);
          dot.sx += (dot.ax - Math.cos(angle) * force - dot.sx) * 0.16;
          dot.sy += (dot.ay - Math.sin(angle) * force - dot.sy) * 0.16;
        } else {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        ctx.moveTo(dot.sx + dotRadius, dot.sy);
        ctx.arc(dot.sx, dot.sy, dotRadius, 0, Math.PI * 2);
      }

      ctx.fill();
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [buildDots, cursorRadius, dotRadius, from, prefersReducedMotion, pushStrength, to]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
});

/* ------------------------------------------------------------------ */
/* Marquee — kinetic infinite horizontal band, scroll-velocity aware    */
/* ------------------------------------------------------------------ */

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  const wrapped = ((((value - min) % range) + range) % range) + min;
  return wrapped;
}

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** base pixels per second */
  baseVelocity?: number;
  direction?: 1 | -1;
  /** how strongly scroll velocity multiplies base speed */
  scrollSensitivity?: number;
};

/**
 * Infinite kinetic marquee. Runs off `useAnimationFrame` translating a
 * duplicated track via a MotionValue (never re-renders React). Speeds up
 * and reverses direction based on scroll velocity for a premium, alive feel.
 * Honors reduced motion by rendering a static centered track.
 */
export function Marquee({
  children,
  className = '',
  baseVelocity = 4,
  direction = 1,
  scrollSensitivity = 0.8,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackWidthRef = useRef(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, scrollSensitivity], {
    clamp: false,
  });

  useEffect(() => {
    const measure = () => {
      const node = trackRef.current?.firstElementChild as HTMLElement | null;
      trackWidthRef.current = node ? node.offsetWidth : 0;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    const width = trackWidthRef.current || trackRef.current?.offsetWidth || 0;
    if (!width) return;

    let moveBy = direction * baseVelocity * (delta / 1000);
    if (typeof velocityFactor.get() === 'number') {
      moveBy += direction * moveBy * velocityFactor.get();
    }
    baseX.set(wrap(-width, 0, baseX.get() - moveBy));
  });

  const x = useTransform(baseX, (value) => `${value}px`);

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`} aria-hidden="true">
        <div ref={trackRef} className="flex w-max">
          <div className="flex shrink-0">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div ref={trackRef} className="flex w-max" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SplitWords — choreographed word-by-word reveal for headings          */
/* ------------------------------------------------------------------ */

const splitWordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const splitWordChild: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

type SplitWordsProps = {
  text: string;
  className?: string;
  /** render each word in its own mask line so descenders never clip */
  as?: 'span' | 'div';
};

/**
 * Splits `text` into words, each lifted into view from behind a clip mask
 * with a stagger. Use it for the large display headings to add motion
 * choreography without extra layout work.
 */
export function SplitWords({ text, className = '', as = 'span' }: SplitWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => text.split(' ').filter(Boolean), [text]);

  if (prefersReducedMotion) {
    const Tag = as as 'span';
    return <Tag className={className}>{text}</Tag>;
  }

  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={splitWordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-flex overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
          <motion.span className="inline-block" variants={splitWordChild}>
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* SpotlightCard — cursor-tracked radial spotlight + tilt               */
/* ------------------------------------------------------------------ */

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** rgba() string for the spotlight glow */
  glowColor?: string;
  /** enable subtle 3D tilt toward the cursor */
  tilt?: boolean;
  /** passthrough for entrance / hover / tap Motion props */
  motionProps?: Record<string, unknown>;
  style?: CSSProperties;
};

/**
 * A premium card surface: a soft radial spotlight follows the cursor across
 * the border, with an optional spring-tilt. Spotlight + tilt are driven by
 * MotionValues outside the React render cycle.
 */
export function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(214, 58, 47, 0.16)',
  tilt = false,
  motionProps,
  style,
}: SpotlightCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXRaw = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateYRaw = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateX = tilt && !prefersReducedMotion ? rotateXRaw : undefined;
  const rotateY = tilt && !prefersReducedMotion ? rotateYRaw : undefined;

  const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 70%)`;

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
      if (tilt && !prefersReducedMotion) {
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        (rotateXRaw as unknown as { set: (v: number) => void }).set(-py * 6);
        (rotateYRaw as unknown as { set: (v: number) => void }).set(px * 6);
      }
    },
    [mouseX, mouseY, rotateXRaw, rotateYRaw, tilt, prefersReducedMotion]
  );

  const handleLeave = useCallback(() => {
    (rotateXRaw as unknown as { set: (v: number) => void }).set(0);
    (rotateYRaw as unknown as { set: (v: number) => void }).set(0);
  }, [rotateXRaw, rotateYRaw]);

  return (
    <motion.div
      className={`group relative isolate overflow-hidden rounded-3xl border border-[var(--line)] bg-white ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...motionProps}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-2 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
      <div className="relative z-3 h-full">{children}</div>
    </motion.div>
  );
}
