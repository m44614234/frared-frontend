import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ShabnamMedium: ['ShabnamMedium' , 'sans-serif'],
        ShabnamLight: ['ShabnamLight' , 'sans-serif'],
        ShabnamThin: ['ShabnamThin' , 'sans-serif'],
        VazirBlack: ['VazirBlack' , 'sans-serif'],
        VazirBold: ['VazirBold' , 'sans-serif'],
        VazirLight: ['VazirLight' , 'sans-serif'],
        VazirMedium: ['VazirMedium' , 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
