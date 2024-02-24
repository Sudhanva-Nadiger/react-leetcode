/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.ts",
    "./node_modules/react-leetcode/**/*.{html,js,jsx,ts,tsx}",
    './src/components/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': {
            width: "0%",
          },

          '100%': {
            width: '100%',
          },
        },
      },
      animation: {
        slide: 'slide 2s ease',
      },
    },
  },
  plugins: [],
}

