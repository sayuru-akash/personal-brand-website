import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geologica)', 'system-ui', 'sans-serif'],
        display: ['var(--font-unbounded)', 'var(--font-geologica)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-sono)', 'monospace'],
      },
      maxWidth: {
        content: '1500px',
      },
    },
  },
  plugins: [],
};

export default config;
