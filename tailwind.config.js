/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#e7eafd',
        // 'background': '#1A0132',
        'background': '#031430',
        'primary': '#0066ff',
        'secondary': '#FEDC01',
        'accent': '#FE7273',
       },
       
        
    },
  },
  plugins: [],
}

