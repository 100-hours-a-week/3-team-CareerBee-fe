/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        ria: ['"RiaSans"', 'sans-serif'],
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          muted: 'hsl(var(--background-muted))',
        },
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        error: 'hsl(var(--error))',
        success: 'hsl(var(--success))',
      },
      boxShadow: {
        sides: '4px 0 8px -4px rgba(0,0,0,0.1), -4px 0 8px -4px rgba(0,0,0,0.1)',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-5deg)' },
          '10%': { transform: 'rotate(5deg)' }, // 오른쪽으로 10도
          '25%': { transform: 'rotate(-10deg)' },
          '45%': { transform: 'rotate(10deg)' },
          '55%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }, // 멈춰 있는 상태
        },
        'toast-slide-out': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
        },
        'toast-slide-in': {
          from: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-25%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'toast-slide-out': 'toast-slide-out 200ms ease-in forwards',
        'toast-slide-in': 'toast-slide-in 200ms ease-out forwards',
        marquee: 'marquee 5s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
