import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom color palette: 90% neutrals, 8% muted tones, 2% accent
      colors: {
        // Neutrals (90% usage) - off-white backgrounds and zinc/slate grays
        neutral: {
          50: '#fafafa',   // Off-white background
          100: '#f5f5f5',  // Light gray
          200: '#e5e5e5',  // Border gray
          300: '#d4d4d4',  // Subtle gray
          400: '#a3a3a3',  // Medium gray
          500: '#737373',  // Text gray
          600: '#525252',  // Dark text gray
          700: '#404040',  // Darker gray
          800: '#262626',  // Near black
          900: '#171717',  // Almost black
          950: '#0a0a0a',  // True black
        },
        // Muted tones (8% usage) - supporting elements
        muted: {
          stone: '#78716c',    // Warm gray
          slate: '#64748b',    // Cool gray
          zinc: '#71717a',     // Neutral gray
          warm: '#a8a29e',     // Warm light gray
          cool: '#94a3b8',     // Cool light gray
        },
        // Accent color (2% usage) - emerald for Japanese aesthetic
        accent: {
          DEFAULT: '#10b981', // Emerald 500
          light: '#34d399',   // Emerald 400
          dark: '#059669',    // Emerald 600
          subtle: '#d1fae5',  // Emerald 100
        },
      },
      
      // Typography scale with Sans-Serif font stack
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'Geist',
          'Satoshi',
          'Cabinet Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        // Japanese typography support
        japanese: [
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Yu Gothic',
          'Meiryo',
          'sans-serif',
        ],
      },
      
      // Typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],      // Body text with relaxed line-height
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],           // Large display headings
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Japanese subtitle sizing
        'japanese-sm': ['0.7rem', { lineHeight: '1.2rem', letterSpacing: '0.12em' }],
        'japanese-base': ['0.8rem', { lineHeight: '1.4rem', letterSpacing: '0.15em' }],
        'japanese-lg': ['0.9rem', { lineHeight: '1.6rem', letterSpacing: '0.18em' }],
      },
      
      // Letter spacing for Japanese design
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.025em',
        tight: '-0.0125em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        // Japanese-specific spacing
        'japanese': '0.12em',
        'japanese-wide': '0.18em',
      },
      
      // Responsive breakpoints
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      // Custom spacing for asymmetric offsets (Japanese design principle)
      spacing: {
        'offset-xs': '8px',    // Small asymmetric offset
        'offset-sm': '12px',   // Small-medium offset
        'offset-md': '16px',   // Medium offset
        'offset-lg': '24px',   // Large offset
        'offset-xl': '32px',   // Extra large offset
      },
      
      // Max width for content containers
      maxWidth: {
        'content': '1400px',   // Main content width
        'prose': '65ch',       // Body text max width
      },
      
      // Animation timing functions
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      // Custom backdrop blur for glass effects
      backdropBlur: {
        'glass': '12px',
      },
      
      // Custom box shadows with tinted shadows
      boxShadow: {
        'glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'spotlight': '0 0 0 1px rgba(16, 185, 129, 0.1), 0 10px 15px -3px rgba(16, 185, 129, 0.1)',
        'tinted': '0 4px 6px -1px rgba(115, 115, 115, 0.1), 0 2px 4px -1px rgba(115, 115, 115, 0.06)',
      },
      
      // Animation keyframes for perpetual animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      // Animation utilities
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
