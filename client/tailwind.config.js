/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0B1C24',
        'secondary': '#22BEDD',
        'gray': '#20404D',
        'warning': '#A18F34',
        'light': '#93B5C3',
        'dark': '#102832',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
    fontFamily: {
      'content': ["Hind Vadodara", 'sans-serif'],
    }
  },
  plugins: [],
}

