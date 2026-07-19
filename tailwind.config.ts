import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: 'var(--brand-orange)',
          blue: 'var(--brand-blue)',
          green: 'var(--brand-green)',
          magenta: 'var(--brand-magenta)',
          purple: 'var(--brand-purple)'
        },
        ink: 'var(--ink)',
        bg: 'var(--bg)',
        error: 'var(--error)',
        // shadcn/ui tokens (HSL CSS vars in globals.css)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        round: ['var(--font-round)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        tile: '0 6px 0 rgba(30,58,95,0.18), 0 10px 24px rgba(30,58,95,0.12)',
        card: '0 4px 14px rgba(30,58,95,0.10)'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-7px)' },
          '40%': { transform: 'translateX(7px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' }
        },
        pulsehint: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.85' }
        }
      },
      animation: {
        wiggle: 'wiggle 0.9s ease-in-out infinite',
        floaty: 'floaty 2.4s ease-in-out infinite',
        shake: 'shake 0.45s ease-in-out',
        pulsehint: 'pulsehint 1.1s ease-in-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
export default config;
