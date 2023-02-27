/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'currant': {
          '50': '#f8f6f9',
          '100': '#efecf2',
          '200': '#ddd5e2',
          '300': '#bdb1c8',
          '400': '#9986aa',
          '500': '#7d6790',
          '600': '#675277',
          '700': '#554361',
          '800': '#483a52',
          '900': '#3b3142',
      },
      

      },
    },
  },
  plugins: [],
}